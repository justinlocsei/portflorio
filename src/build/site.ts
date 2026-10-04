import type { Manifest, ManifestChunk } from 'vite';
import { build } from 'vite';

import { ROOT_ELEMENT_ID } from '../core/site.ts';
import { getPaths } from './paths.ts';
import * as configs from './vite.ts';

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * A variable in the page template
 */
type TemplateVariable = 'content' | 'head' | 'root' | 'scripts';

/**
 * Values assigned to template variables
 */
type TemplateVariables = Partial<Record<TemplateVariable, string>>;

/**
 * Render the page template and write it to disk
 */
async function renderPage(
  variables: TemplateVariables,
  target: string
): Promise<void> {
  let text = await fs.readFile(
    path.join(getPaths().site, 'page.template.html'),
    'utf8'
  );

  const resolved: TemplateVariables = {
    root: ROOT_ELEMENT_ID,
    ...variables
  };

  for (const [key, value] of Object.entries(resolved)) {
    text = text.replace(`<!--${key}-->`, value ?? '');
  }

  await fs.writeFile(target, text);
}

/**
 * Build the entry point for the development server
 */
export async function buildDevelopmentIndex(): Promise<void> {
  const paths = getPaths();

  const script = path
    .relative(paths.site, paths.entry.client)
    .split(path.sep)
    .join('/');

  await renderPage(
    { scripts: `<script type="module" src="/${script}"></script>` },
    path.join(paths.site, 'index.html')
  );
}

/**
 * Extract the chunk for a named entry point from a manifest
 */
function extractEntryChunk(
  manifest: Manifest,
  root: string,
  file: string
): ManifestChunk {
  const key = path
    .relative(root, file)
    .split(path.sep)
    .join('/');

  const entry = manifest[key];

  if (!entry) {
    throw new Error(`No entry chunk for file: ${key}`);
  }

  return entry;
}

/**
 * Extract assets used by a chunk
 */
function extractAssets(entry: ManifestChunk): TemplateVariables {
  const { css = [] } = entry;

  const head = css
    .map((href) => `<link rel="stylesheet" crossorigin href="/${href}">`)
    .join('\n');

  return {
    head,
    scripts: `<script type="module" crossorigin src="/${entry.file}"></script>`
  };
}

/**
 * Build assets for the static site
 */
export async function buildStaticSite(): Promise<void> {
  const paths = getPaths();

  await fs.rm(
    paths.dist.root,
    { force: true, recursive: true }
  );

  await build(configs.client);
  await build(configs.server);

  const manifest = JSON.parse(
    await fs.readFile(
      path.join(paths.dist.site, '.vite', 'manifest.json'),
      'utf8'
    )
  ) as Manifest;

  const entry = extractEntryChunk(manifest, paths.site, paths.entry.client);
  const tags = extractAssets(entry);

  const renderApp = (await import(pathToFileURL(paths.dist.serverBundle).href))
    .default as unknown;

  if (typeof renderApp !== 'function') {
    throw new Error('Could not load the app rendered');
  }

  await renderPage(
    { ...tags, content: renderApp() },
    path.join(paths.dist.site, 'index.html')
  );

  console.log(`Site available: ${paths.dist.site}`);
}
