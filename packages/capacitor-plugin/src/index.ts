import { registerPlugin } from '@capacitor/core';
import { exposeSynapse } from '@capacitor/synapse';

import type { FilesystemPlugin } from './definitions';

const Filesystem = registerPlugin<FilesystemPlugin>('Filesystem', {
  web: () => import('./web').then((m) => new m.FilesystemWeb()),
});

exposeSynapse();

export * from './definitions';
export { Filesystem };
