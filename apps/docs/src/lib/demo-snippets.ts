const DECLARATION =
  /^(?:export\s+)?(?:async\s+)?(?:function|const|let|interface|type|enum|class)\s+([A-Za-z_$][\w$]*)/;

function dedent(text: string): string {
  const lines = text.split(/\r?\n/);
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0);
  const indent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines
    .map((line) => line.slice(indent))
    .join('\n')
    .trim();
}

function topLevelDeclarations(source: string): Map<string, { order: number; text: string }> {
  const chunks: { name: string | null; lines: string[] }[] = [];

  for (const line of source.split(/\r?\n/)) {
    const current = chunks[chunks.length - 1];
    if (/^\S/.test(line) && !/^[)}\]]/.test(line)) {
      chunks.push({ name: line.match(DECLARATION)?.[1] ?? null, lines: [line] });
    } else if (current) {
      current.lines.push(line);
    }
  }

  const declarations = new Map<string, { order: number; text: string }>();
  chunks.forEach((chunk, order) => {
    if (chunk.name) declarations.set(chunk.name, { order, text: chunk.lines.join('\n').trim() });
  });
  return declarations;
}

function withDependencies(
  snippet: string,
  declarations: Map<string, { order: number; text: string }>,
): string {
  const included = new Set<string>();
  const queue = [snippet];

  while (queue.length > 0) {
    const text = queue.shift() ?? '';
    for (const identifier of new Set(text.match(/[A-Za-z_$][\w$]*/g) ?? [])) {
      const declaration = declarations.get(identifier);
      if (!declaration || included.has(identifier)) continue;
      included.add(identifier);
      queue.push(declaration.text);
    }
  }

  const helpers = [...included]
    .map((name) => declarations.get(name))
    .filter((entry): entry is { order: number; text: string } => entry !== undefined)
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.text);

  return [...helpers, snippet].join('\n\n');
}

export function extractTileSnippets(source: string): Record<string, string> {
  const pattern = /^([ \t]*)<DemoTile\b([^>]*)>\r?\n([\s\S]*?)\r?\n\1<\/DemoTile>/gm;
  const declarations = topLevelDeclarations(source);
  const found = new Map<string, string[]>();

  for (const match of source.matchAll(pattern)) {
    const label = match[2]?.match(/\blabel="([^"]*)"/)?.[1];
    if (!label) continue;
    found.set(label, [...(found.get(label) ?? []), dedent(match[3] ?? '')]);
  }

  return Object.fromEntries(
    [...found]
      .filter(([, snippets]) => snippets.length === 1)
      .map(([label, [snippet]]) => [label, withDependencies(snippet ?? '', declarations)]),
  );
}
