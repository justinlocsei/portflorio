import readline from 'node:readline';

/**
 * Request lines of input from the user
 *
 * Lines are fully assembled once a blank line is entered.
 */
export function requestLines({
  prompt,
  suggestions
}: {
  prompt?: string;
  suggestions?: string[];
}): Promise<string[]> {
  const lines: string[] = [];

  const completer: readline.Completer | undefined = suggestions
    && ((line: string) => [suggestions.filter(s => s.startsWith(line)), line]);

  const rl = readline.createInterface({
    completer,
    input: process.stdin,
    output: process.stdout,
    prompt
  });

  rl.prompt();

  return new Promise((resolve) => {
    rl.on('line', raw => {
      const line = raw.trim();

      if (!line) {
        rl.close();
      } else {
        rl.prompt();
        lines.push(line);
      }
    });

    rl.on('close', () => {
      resolve(lines);
    });
  });
}
