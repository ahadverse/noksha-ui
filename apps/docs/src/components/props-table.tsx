import type { AliasDoc, InterfaceDoc } from '@/lib/registry';

/**
 * The props reference, rendered from what the registry parsed out of
 * `*.types.ts`. Nothing here is written by hand, so a renamed prop cannot leave
 * a stale row behind.
 */
export function PropsTable({
  interfaces,
  aliases,
}: {
  interfaces: InterfaceDoc[];
  aliases: AliasDoc[];
}) {
  const unions = aliases.filter((alias) => alias.options && alias.options.length > 1);
  const documented = interfaces.filter((entry) => entry.props.length > 0);

  if (documented.length === 0 && unions.length === 0) {
    return <p className="text-fg-muted text-sm">This component takes no props of its own.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {unions.length > 0 ? (
        <div>
          <h3 className="mb-3 font-semibold text-base text-fg">Accepted values</h3>
          <dl className="flex flex-col gap-2">
            {unions.map((alias) => (
              <div key={alias.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="font-mono text-fg text-sm">{alias.name}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {alias.options?.map((option) => (
                    <code
                      key={option}
                      className="rounded-(--noksha-radius-sm) bg-accent-subtle px-1.5 py-0.5 font-mono text-accent-fg text-xs"
                    >
                      {option}
                    </code>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {documented.map((entry) => (
        <div key={entry.name}>
          <h3 className="mb-1 font-semibold text-base text-fg">{entry.name}</h3>

          {entry.extends.length > 0 ? (
            <p className="mb-3 text-fg-subtle text-sm">
              Also accepts everything from{' '}
              {entry.extends.map((base, index) => (
                <span key={base}>
                  {index > 0 ? ', ' : ''}
                  <code className="font-mono text-xs">{base}</code>
                </span>
              ))}
              .
            </p>
          ) : null}

          {/* The table scrolls inside its own box; the page body never does. */}
          <div className="overflow-x-auto rounded-lg border border-line-subtle">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-subtle">
                <tr>
                  <th className="px-4 py-2.5 font-semibold text-fg">Prop</th>
                  <th className="px-4 py-2.5 font-semibold text-fg">Type</th>
                  <th className="px-4 py-2.5 font-semibold text-fg">Description</th>
                </tr>
              </thead>
              <tbody>
                {entry.props.map((prop) => (
                  <tr key={prop.name} className="border-line-subtle border-t align-top">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-fg text-xs">
                      {prop.name}
                      {prop.required ? (
                        <span className="ml-1 text-danger-fg" title="Required">
                          *
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-mono text-accent-fg text-xs">
                      <span className="block max-w-[22ch] break-words">{prop.type}</span>
                      {prop.default ? (
                        <span className="mt-1 block text-fg-subtle">= {prop.default}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-fg-muted">{prop.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
