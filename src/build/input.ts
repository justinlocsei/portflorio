import { COLOR_IDS, parseColors } from '../core/colors.ts';
import type { ArrangedFlower } from '../core/types.ts';

import readline from 'node:readline';

/**
 * Interactively build a list of arranged flowers
 */
export function requestFlowers({
  flowerNames,
  input = process.stdin,
  output = process.stdout
}: {
  flowerNames: string[];
  input?: NodeJS.ReadableStream;
  output?: NodeJS.WritableStream;
}): Promise<ArrangedFlower[]> {
  const flowers: ArrangedFlower[] = [];

  let step: 'color' | 'flower' = 'flower';
  let flower = '';

  const rl = readline.createInterface({
    completer: (line: string) => {
      const prefix = line.trimStart();
      const sources = step === 'flower' ? flowerNames : COLOR_IDS;

      return [
        sources.filter(s => s.startsWith(prefix)),
        line
      ];
    },
    input,
    output
  });

  const showPrompt = () => {
    rl.setPrompt(`${step.substring(0, 1).toUpperCase()} > `);
    rl.prompt();
  };

  return new Promise((resolve) => {
    rl.on('line', raw => {
      const line = raw.trim();

      if (step === 'flower') {
        if (!line) {
          rl.close();

          return;
        }

        flower = line;
        step = 'color';

        showPrompt();

        return;
      }

      const colors = parseColors(line);

      if (colors.length === 0) {
        output.write(
          `Colors must be a comma-separated list of: ${COLOR_IDS.join(', ')}\n`
        );

        showPrompt();

        return;
      }

      flowers.push({
        color: colors,
        name: flower
      });

      flower = '';
      step = 'flower';

      showPrompt();
    });

    rl.on('close', () => {
      resolve(flowers);
    });

    showPrompt();
  });
}
