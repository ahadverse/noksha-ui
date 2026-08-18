/**
 * An error whose message is meant for the person at the terminal.
 *
 * Anything else that escapes to the top level is a bug, and `index.ts` prints
 * it with its stack. These print as one red line with no stack, because a user
 * who typed a component name wrong should not have to read a trace to find out.
 */
export class CliError extends Error {
  readonly hint: string | undefined;

  constructor(message: string, hint?: string) {
    super(message);
    this.name = 'CliError';
    this.hint = hint;
  }
}
