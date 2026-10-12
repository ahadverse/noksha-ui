import * as React from 'react';

const INDENT = '  ';
const LINE_WIDTH = 80;

function nameOf(type: unknown): string {
  if (typeof type === 'string') return type;
  if (type && (typeof type === 'object' || typeof type === 'function')) {
    const named = type as { displayName?: string; name?: string };
    return named.displayName ?? named.name ?? 'Component';
  }
  return 'Component';
}

function literal(value: unknown, depth: number): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'function') return value.toString();
  if (React.isValidElement(value)) return element(value, depth);

  if (Array.isArray(value)) {
    const items = value.map((item) => literal(item, depth + 1));
    const inline = `[${items.join(', ')}]`;
    if (inline.length <= LINE_WIDTH && !inline.includes('\n')) return inline;
    const pad = INDENT.repeat(depth + 1);
    return `[\n${items.map((item) => `${pad}${item},`).join('\n')}\n${INDENT.repeat(depth)}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== undefined)
      .map(([key, entry]) => {
        const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key}'`;
        return `${safeKey}: ${literal(entry, depth + 1)}`;
      });
    const inline = `{ ${entries.join(', ')} }`;
    if (inline.length <= LINE_WIDTH && !inline.includes('\n')) return inline;
    const pad = INDENT.repeat(depth + 1);
    return `{\n${entries.map((entry) => `${pad}${entry},`).join('\n')}\n${INDENT.repeat(depth)}}`;
  }

  return String(value);
}

function attribute(key: string, value: unknown, depth: number): string | null {
  if (value === undefined || value === null) return null;
  if (value === true) return key;
  if (typeof value === 'string' && !value.includes('"')) return `${key}="${value}"`;
  return `${key}={${literal(value, depth)}}`;
}

function children(node: React.ReactNode, depth: number): string[] {
  const parts: string[] = [];

  React.Children.forEach(node, (child) => {
    if (child === null || child === undefined || typeof child === 'boolean') return;
    if (typeof child === 'string' || typeof child === 'number') {
      const text = String(child).trim();
      if (text) parts.push(text);
      return;
    }
    if (React.isValidElement(child)) parts.push(element(child, depth));
  });

  return parts;
}

function element(node: React.ReactElement, depth: number): string {
  const props = (node.props ?? {}) as Record<string, unknown>;
  const pad = INDENT.repeat(depth);

  if (node.type === React.Fragment) {
    return children(props.children as React.ReactNode, depth).join(`\n${pad}`);
  }

  const name = nameOf(node.type);
  const attributes = Object.entries(props)
    .filter(([key]) => key !== 'children')
    .map(([key, value]) => attribute(key, value, depth + 1))
    .filter((entry): entry is string => entry !== null);
  const inner = children(props.children as React.ReactNode, depth + 1);

  const inlineOpen = attributes.length > 0 ? `<${name} ${attributes.join(' ')}` : `<${name}`;
  const fitsInline =
    pad.length + inlineOpen.length + 2 <= LINE_WIDTH && !attributes.some((a) => a.includes('\n'));
  const open = fitsInline
    ? inlineOpen
    : `<${name}\n${attributes.map((entry) => `${pad}${INDENT}${entry}`).join('\n')}\n${pad}`;

  if (inner.length === 0) return `${open}${fitsInline ? ' ' : ''}/>`;

  const singleText = inner.length === 1 && !inner[0]?.includes('\n') && !inner[0]?.startsWith('<');
  if (
    singleText &&
    fitsInline &&
    open.length + (inner[0]?.length ?? 0) + name.length < LINE_WIDTH
  ) {
    return `${open}>${inner[0]}</${name}>`;
  }

  return `${open}>\n${inner.map((entry) => `${pad}${INDENT}${entry}`).join('\n')}\n${pad}</${name}>`;
}

export function toJsx(node: React.ReactNode): string {
  return children(node, 0).join('\n');
}
