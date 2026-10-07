import fs from 'fs-extra';
import C from 'larkspur';

import paths from '../paths.ts';

import path from 'node:path';

export default C.group('Manage components', {
  generate: C(
    'Generate a new component',
    {
      name: C.flag('string', 'The PascalCase name of the component', {
        required: true
      })
    },
    async ({ name }) => {
      const files = await generateComponentFiles(name);

      for (const file of files.sort()) {
        console.log(`${file}`);
      }
    }
  )
});

/**
 * Generate component files
 */
async function generateComponentFiles(name: string): Promise<string[]> {
  const rootDir = paths.components;

  const tsx = `
import C from './${name}.module.css';

export default function ${name}() {
  return (
    <div className={C.root}>
      <h1>${name}</h1>
    </div>
  );
}
  `;

  const css = `
.root {
  font-weight: normal;
}
  `;

  const write = async (ext: string, content: string): Promise<string> => {
    const file = path.join(rootDir, `${name}.${ext}`);

    await fs.writeFile(file, `${content.trim()}\n`);

    return file;
  };

  return Promise.all([
    write('module.css', css),
    write('tsx', tsx)
  ]);
}
