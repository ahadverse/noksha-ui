import type { AliasDoc, InterfaceDoc } from './registry';

/**
 * The same filtering `PropsTable` renders from, pulled out so the table of
 * contents can list the same headings without drifting out of sync with what
 * the page actually shows.
 */
export function getApiSections(interfaces: InterfaceDoc[], aliases: AliasDoc[]) {
  return {
    unions: aliases.filter((alias) => alias.options && alias.options.length > 1),
    documented: interfaces.filter((entry) => entry.props.length > 0),
  };
}
