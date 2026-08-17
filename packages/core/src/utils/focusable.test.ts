import { beforeEach, describe, expect, it } from 'vitest';
import {
  focusFirst,
  getFocusable,
  getTabbable,
  getTabbableEdges,
  isFocusable,
  isTabbable,
} from './focusable.js';

function mount(html: string): HTMLElement {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  return host;
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('isFocusable', () => {
  it('accepts the natively focusable elements', () => {
    const host = mount(`
      <a href="#x" id="a">link</a>
      <button id="b">b</button>
      <input id="c" />
      <select id="d"></select>
      <textarea id="e"></textarea>
      <div id="f" tabindex="0">div</div>
      <div id="g" contenteditable="true">edit</div>
    `);

    for (const id of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
      expect(isFocusable(host.querySelector(`#${id}`) as HTMLElement), id).toBe(true);
    }
  });

  it('rejects plain elements and anchors with no href', () => {
    const host = mount('<div id="a">x</div><a id="b">no href</a><span id="c">y</span>');

    for (const id of ['a', 'b', 'c']) {
      expect(isFocusable(host.querySelector(`#${id}`) as HTMLElement), id).toBe(false);
    }
  });

  it('rejects disabled controls, including via a disabled fieldset', () => {
    const host = mount(`
      <button id="a" disabled>a</button>
      <button id="b" aria-disabled="true">b</button>
      <fieldset disabled>
        <legend><button id="c">still on</button></legend>
        <button id="d">off</button>
      </fieldset>
    `);

    expect(isFocusable(host.querySelector('#a') as HTMLElement)).toBe(false);
    expect(isFocusable(host.querySelector('#b') as HTMLElement)).toBe(false);
    // The first legend of a disabled fieldset stays interactive — the one
    // exception in the spec, and the one everyone's tabbable query forgets.
    expect(isFocusable(host.querySelector('#c') as HTMLElement)).toBe(true);
    expect(isFocusable(host.querySelector('#d') as HTMLElement)).toBe(false);
  });

  it('rejects hidden, inert and display:none subtrees', () => {
    const host = mount(`
      <button id="a" hidden>a</button>
      <div inert><button id="b">b</button></div>
      <div style="display:none"><button id="c">c</button></div>
      <div style="visibility:hidden"><button id="d">d</button></div>
      <div aria-hidden="true"><button id="e">e</button></div>
    `);

    for (const id of ['a', 'b', 'c', 'd', 'e']) {
      expect(isFocusable(host.querySelector(`#${id}`) as HTMLElement), id).toBe(false);
    }
  });
});

describe('isTabbable', () => {
  it('separates script-focusable from tab-reachable', () => {
    const host = mount('<div id="a" tabindex="-1">a</div><div id="b" tabindex="0">b</div>');

    expect(isFocusable(host.querySelector('#a') as HTMLElement)).toBe(true);
    expect(isTabbable(host.querySelector('#a') as HTMLElement)).toBe(false);
    expect(isTabbable(host.querySelector('#b') as HTMLElement)).toBe(true);
  });
});

describe('getTabbable / getTabbableEdges', () => {
  it('returns items in DOM order, ignoring positive tabindex', () => {
    const host = mount(`
      <button id="a">a</button>
      <button id="b" tabindex="5">b</button>
      <button id="c">c</button>
    `);

    // Sorting by positive tabindex would let one stray tabindex="1" in consumer
    // content reorder a trap's wrap points. Visual order is the useful order.
    expect(getTabbable(host).map((el) => el.id)).toEqual(['a', 'b', 'c']);

    const [first, last] = getTabbableEdges(host);
    expect(first?.id).toBe('a');
    expect(last?.id).toBe('c');
  });

  it('reports no edges when nothing inside is tabbable', () => {
    const host = mount('<div>text only</div><button disabled>x</button>');
    expect(getTabbableEdges(host)).toEqual([null, null]);
  });

  it('includes the container itself when it is focusable', () => {
    const host = mount('<button id="a">a</button>');
    host.tabIndex = -1;

    expect(getFocusable(host).map((el) => el.id || 'host')).toEqual(['host', 'a']);
    expect(getTabbable(host).map((el) => el.id)).toEqual(['a']);
  });
});

describe('focusFirst', () => {
  it('takes the first candidate that actually accepts focus', () => {
    const host = mount('<button id="a" disabled>a</button><button id="b">b</button>');
    const candidates = [host.querySelector('#a'), null, host.querySelector('#b')] as HTMLElement[];

    expect(focusFirst(candidates)).toBe(true);
    expect(document.activeElement?.id).toBe('b');
  });

  it('reports failure when nothing takes focus', () => {
    const host = mount('<button id="a" disabled>a</button>');
    expect(focusFirst([host.querySelector('#a') as HTMLElement])).toBe(false);
  });

  it('selects an input when asked', () => {
    const host = mount('<input id="a" value="hello" />');
    const input = host.querySelector('#a') as HTMLInputElement;

    focusFirst([input], { select: true });
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe('hello'.length);
  });
});
