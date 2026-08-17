/**
 * Reads the props tables out of a component's `*.types.ts`.
 *
 * The alternative is hand-maintaining a second copy of every prop in the docs
 * site, which goes stale the first time someone renames one. Parsing the real
 * declaration means a prop table can only ever describe props that exist, and
 * the JSDoc a contributor writes next to the prop is the text the docs show.
 *
 * The TypeScript compiler API is used purely as a parser — no type checker, no
 * program, no `tsconfig` resolution — so this stays fast and cannot fail on a
 * module resolution problem that `tsc` would report anyway.
 */
import ts from 'typescript';

/** `React.ReactNode` and friends print fine; long unions get room to wrap. */
function typeText(node, source) {
  return node ? source.text.slice(node.pos, node.end).trim() : 'unknown';
}

function docOf(node, source) {
  const ranges = ts.getLeadingCommentRanges(source.text, node.pos) ?? [];
  const jsdoc = ranges
    .map((range) => source.text.slice(range.pos, range.end))
    .filter((text) => text.startsWith('/**'));

  if (jsdoc.length === 0) return { description: '', defaultValue: null };

  const body = jsdoc[jsdoc.length - 1]
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\* ?/, ''))
    .join('\n')
    .trim();

  const defaultTag = body.match(/@default\s+(.+)/);

  return {
    description: body
      .replace(/@\w+[^\n]*/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
    defaultValue: defaultTag ? defaultTag[1].trim() : null,
  };
}

/** Turns `'solid' | 'soft'` into `['solid', 'soft']`; anything else stays null. */
function unionOptions(node, source) {
  if (!node || !ts.isUnionTypeNode(node)) return null;

  const options = node.types.map((member) => {
    if (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal)) {
      return member.literal.text;
    }
    return typeText(member, source);
  });

  return options;
}

/**
 * @returns {{ interfaces: Array<object>, aliases: Array<object> }}
 */
export function extractProps(filename, code) {
  const source = ts.createSourceFile(
    filename,
    code,
    ts.ScriptTarget.ES2022,
    true,
    ts.ScriptKind.TS,
  );

  const interfaces = [];
  const aliases = [];

  for (const statement of source.statements) {
    if (ts.isInterfaceDeclaration(statement)) {
      const props = statement.members.filter(ts.isPropertySignature).map((member) => {
        const { description, defaultValue } = docOf(member, source);
        return {
          name: member.name.getText(source).replace(/^'|'$/g, ''),
          type: typeText(member.type, source),
          required: !member.questionToken,
          description,
          default: defaultValue,
        };
      });

      interfaces.push({
        name: statement.name.text,
        // `extends React.ButtonHTMLAttributes<…>` is the honest answer to "can I
        // pass onClick" — worth surfacing rather than dropping.
        extends: (statement.heritageClauses ?? []).flatMap((clause) =>
          clause.types.map((type) => typeText(type, source)),
        ),
        description: docOf(statement, source).description,
        props,
      });
      continue;
    }

    if (ts.isTypeAliasDeclaration(statement)) {
      aliases.push({
        name: statement.name.text,
        type: typeText(statement.type, source),
        options: unionOptions(statement.type, source),
        description: docOf(statement, source).description,
      });
    }
  }

  return { interfaces, aliases };
}
