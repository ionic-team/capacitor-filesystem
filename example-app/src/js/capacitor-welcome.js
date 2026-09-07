import { SplashScreen } from '@capacitor/splash-screen';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 16px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 1.1em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
      .check-card {
        border-left: 6px solid #999;
        background: #f7f7f7;
        padding: 10px 14px;
        margin: 10px 0;
        border-radius: 4px;
      }
      .check-escaped { border-left-color: #d63031; background: #fdecea; }
      .check-contained { border-left-color: #2e9e4a; background: #eafaf0; }
      .check-error { border-left-color: #e1a100; background: #fff8e1; }
      .check-card-title { font-weight: bold; margin-bottom: 4px; }
      .check-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: 0.8em;
        color: #fff;
        background: #999;
      }
      .check-escaped .check-badge { background: #d63031; }
      .check-contained .check-badge { background: #2e9e4a; }
      .check-error .check-badge { background: #e1a100; }
      .check-card-message { margin: 4px 0; }
      .check-card-details {
        background: #fff;
        padding: 8px;
        border-radius: 3px;
        overflow-x: auto;
        font-size: 0.85em;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor FileSystem Example App</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>Below are the several features for the capacitor filesystem plugin. </p>
        <button id="check-permission" class="button">Check permission</button>
        <br><br>
        <button id="request-permission" class="button">Request permission</button>
        <br><br>
        <button id="mkdir" class="button">mkdir</button>
        <br><br>
        <button id="rmdir" class="button">rmdir</button>
        <br><br>
        <button id="readdir" class="button">readdir</button>
        <br><br>
        <button id="fileWrite" class="button">fileWrite</button>
        <br><br>
        <button id="fileRead" class="button">fileRead</button>
        <button id="fileReadInSmallChunks" class="button">fileReadInSmallChunks</button>
        <button id="fileReadPartial" class="button">fileRead with offset and length</button>
        <button id="fileReadInSmallChunksPartial" class="button">fileReadInSmallChunks with offset</button>
        <br><br>
        <button id="fileAppend" class="button">fileAppend</button>
        <br><br>
        <button id="fileDelete" class="button">fileDelete</button>
        <br><br>
        <button id="stat" class="button">stat</button>
        <br><br>
        <button id="getUri" class="button">getUri</button>
        <br><br>
        <button id="directoryTest" class="button">directoryTest</button>
        <br><br>
        <button id="renameFileTest" class="button">renameFileTest</button>
        <br><br>
        <button id="copyFileTest" class="button">copyFileTest</button>
        <br><br>
        <button id="mkdirUrl" class="button">mkdirUrl</button>
        <br><br>
        <button id="rmdirUrl" class="button">rmdirUrl</button>
        <br><br>
        <button id="readdirUrl" class="button">readdirUrl</button>
        <br><br>
        <button id="fileWriteUrl" class="button">fileWriteUrl</button>
        <br><br>
        <button id="fileReadUrl" class="button">fileReadUrl</button>
        <br><br>
        <button id="fileAppendUrl" class="button">fileAppendUrl</button>
        <br><br>
        <button id="fileDeleteUrl" class="button">fileDeleteUrl</button>
        <br><br>
        <button id="statUrl" class="button">Url</button>
        <br><br>
        <button id="renameFileTestUrl" class="button">renameFileTestUrl</button>
        <br><br>
        <button id="copyFileTestUrl" class="button">copyFileTestUrl</button>
        <br><br>
        <button id="downloadSmallFile" class="button">deprecated downloadFile (small)</button>
        <br><br>
        <button id="downloadLargeFile" class="button">deprecated downloadFile (large)</button>
        <br><br>

        <hr>
        <h2>Directory containment checks</h2>
        <p>
          These checks confirm that a call scoped to one <code>Directory</code> only reads, writes,
          copies, moves, or deletes data within that same <code>Directory</code>, using relative
          <code>../</code> segments. Each check only touches canary files/folders it creates itself
          and cleans them up afterwards.
        </p>
        <button id="checkTraversalRead" class="button">Check: traversal read (Data &rarr; Cache)</button>
        <br><br>
        <button id="checkTraversalDelete" class="button">Check: traversal recursive delete (Cache &rarr; Data)</button>
        <br><br>
        <button id="checkTraversalWrite" class="button">Check: traversal write (Data &rarr; Cache)</button>
        <br><br>
        <button id="checkCopyOverwrite" class="button">Check: copy overwrite via traversal (Data &rarr; Cache)</button>
        <br><br>
        <button id="checkMoveOverwrite" class="button">Check: move overwrite via traversal (Data &rarr; Cache)</button>
        <br><br>
        <button id="checkDirScopedListing" class="button">Check: directory-scoped traversal listing (Data + "..")</button>
        <br><br>
        <button id="runAllChecks" class="button">Run all checks</button>
        <button id="clearResults" class="button">Clear results</button>
        <br><br>
        <div id="checkResults"></div>
        <br><br><br><br><br><br>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#check-permission').addEventListener('click', async function (e) {
        let permissionStatus = await Filesystem.checkPermissions();
        console.log(permissionStatus);
      });
      self.shadowRoot.querySelector('#request-permission').addEventListener('click', async function (e) {
        let permissionStatus = await Filesystem.requestPermissions();
        console.log(permissionStatus);
      });

      self.shadowRoot.querySelector('#mkdir').addEventListener('click', async function (e) {
        try {
          let ret = await Filesystem.mkdir({
            path: 'secrets',
            directory: Directory.Documents,
            recursive: false,
          });
          alert('Made dir', ret);
        } catch (e) {
          alert('Unable to make directory', e);
        }
      });
      self.shadowRoot.querySelector('#rmdir').addEventListener('click', async function (e) {
        try {
          let ret = await Filesystem.rmdir({
            path: 'secrets',
            directory: Directory.Documents,
          });
          alert('Removed dir', ret);
        } catch (e) {
          alert('Unable to remove directory', e);
        }
      });
      self.shadowRoot.querySelector('#readdir').addEventListener('click', async function (e) {
        try {
          let ret = await Filesystem.readdir({
            path: 'secrets',
            directory: Directory.Documents,
          });
          console.log('Read dir', ret);
        } catch (e) {
          console.error('Unable to read dir', e);
        }
      });
      self.shadowRoot.querySelector('#fileWrite').addEventListener('click', async function (e) {
        try {
          const result = await Filesystem.writeFile({
            path: 'secrets/text.txt',
            data: 'This is a test',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
          console.log('Wrote file', result);
        } catch (e) {
          console.error('Unable to write file (press mkdir first, silly)', e);
        }
      });
      self.shadowRoot.querySelector('#fileRead').addEventListener('click', async function (e) {
        let contents = await Filesystem.readFile({
          path: 'secrets/text.txt',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        console.log('file contents', contents.data);
      });
      self.shadowRoot.querySelector('#fileReadInSmallChunks').addEventListener('click', async function (e) {
        await Filesystem.readFileInChunks(
          {
            path: 'secrets/text.txt',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
            chunkSize: 3, // on Android the chunk size to be used will be much larger
          },
          (chunkResult, err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('chunk read', JSON.stringify(chunkResult));
          },
        );
      });
      self.shadowRoot.querySelector('#fileReadPartial').addEventListener('click', async function (e) {
        let contents = await Filesystem.readFile({
          path: 'secrets/text.txt',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
          offset: 4,
          length: 5,
        });
        console.log('file contents', contents.data);
      });
      self.shadowRoot.querySelector('#fileReadInSmallChunksPartial').addEventListener('click', async function (e) {
        await Filesystem.readFileInChunks(
          {
            path: 'secrets/text.txt',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
            chunkSize: 3, // on Android the chunk size to be used will be much larger
            offset: 14,
          },
          (chunkResult, err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('chunk read', JSON.stringify(chunkResult));
          },
        );
      });
      self.shadowRoot.querySelector('#fileAppend').addEventListener('click', async function (e) {
        await Filesystem.appendFile({
          path: 'secrets/text.txt',
          data: 'MORE TESTS',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        console.log('Appended');
      });
      self.shadowRoot.querySelector('#fileDelete').addEventListener('click', async function (e) {
        await Filesystem.deleteFile({
          path: 'secrets/text.txt',
          directory: Directory.Documents,
        });
        console.log('Deleted');
      });
      self.shadowRoot.querySelector('#stat').addEventListener('click', async function (e) {
        try {
          let ret = await Filesystem.stat({
            path: 'secrets/text.txt',
            directory: Directory.Documents,
          });
          console.log('STAT', ret);
        } catch (e) {
          console.error('Unable to stat file', e);
        }
      });
      self.shadowRoot.querySelector('#getUri').addEventListener('click', async function (e) {
        try {
          let ret = await Filesystem.getUri({
            path: 'text.txt',
            directory: Directory.Data,
          });
          alert(ret.uri);
        } catch (e) {
          console.error('Unable to stat file', e);
        }
      });

      self.shadowRoot.querySelector('#directoryTest').addEventListener('click', async function (e) {
        try {
          const result = await Filesystem.writeFile({
            path: 'text.txt',
            data: 'This is a test',
            directory: Directory.Data,
            encoding: Encoding.UTF8,
          });
          console.log('wrote file', result);
          let stat = await Filesystem.stat({
            path: 'text.txt',
            directory: Directory.Data,
          });
          let data = await Filesystem.readFile({
            path: stat.uri,
          });
          console.log('Stat 1', stat);
          console.log(data);
          console.log('Stat 3', stat);
        } catch (e) {
          console.error('Unable to write file (press mkdir first, silly)', e);
        }
        console.log('Wrote file');
      });
      self.shadowRoot.querySelector('#renameFileTest').addEventListener('click', async function (e) {
        console.log('Rename a file into a directory');
        await writeAll('fa');
        await mkdirAll('da');
        await Filesystem.rename({
          directory: Directory.Data,
          from: 'fa',
          to: 'da/fb',
        });
        await deleteAll('da/fb');
        await rmdirAll('da');
        console.log('rename finished');
      });
      self.shadowRoot.querySelector('#copyFileTest').addEventListener('click', async function (e) {
        console.log('Copy a file into a directory');
        await writeAll('fa');
        await mkdirAll('da');
        await Filesystem.copy({
          directory: Directory.Data,
          from: 'fa',
          to: 'da/fb',
        });
        await deleteAll(['fa', 'da/fb']);
        await rmdirAll('da');
        console.log('copy finished');
      });

      self.shadowRoot.querySelector('#mkdirUrl').addEventListener('click', async function (e) {
        try {
          let uriResult = await Filesystem.getUri({
            path: 'myfolder',
            directory: Directory.Cache,
          });
          let ret = await Filesystem.mkdir({
            path: uriResult.uri,
            recursive: false,
          });
          console.log('Made dir', ret);
        } catch (e) {
          console.error('Unable to make directory', e);
        }
      });
      self.shadowRoot.querySelector('#rmdirUrl').addEventListener('click', async function (e) {
        try {
          let uriResult = await Filesystem.getUri({
            path: 'myfolder',
            directory: Directory.Cache,
          });
          let ret = await Filesystem.rmdir({
            path: uriResult.uri,
          });
          console.log('Removed dir', ret);
        } catch (e) {
          console.error('Unable to remove directory', e);
        }
      });
      self.shadowRoot.querySelector('#readdirUrl').addEventListener('click', async function (e) {
        try {
          let uriResult = await Filesystem.getUri({
            path: 'myfolder',
            directory: Directory.Cache,
          });
          let ret = await Filesystem.readdir({
            path: uriResult.uri,
          });
          console.log('Read dir', ret);
        } catch (e) {
          console.error('Unable to read dir', e);
        }
      });
      self.shadowRoot.querySelector('#fileWriteUrl').addEventListener('click', async function (e) {
        try {
          let uriResult = await Filesystem.getUri({
            path: 'myfolder/myfile.txt',
            directory: Directory.Cache,
          });
          const result = await Filesystem.writeFile({
            path: uriResult.uri,
            data: 'This is a test',
            encoding: Encoding.UTF8,
          });
          console.log('Wrote file', result);
        } catch (e) {
          console.error('Unable to write file (press mkdir first, silly)', e);
        }
      });
      self.shadowRoot.querySelector('#fileReadUrl').addEventListener('click', async function (e) {
        let uriResult = await Filesystem.getUri({
          path: 'myfolder/myfile.txt',
          directory: Directory.Cache,
        });
        let contents = await Filesystem.readFile({
          path: uriResult.uri,
          encoding: Encoding.UTF8,
        });
        console.log('file contents', contents.data);
      });
      self.shadowRoot.querySelector('#fileAppendUrl').addEventListener('click', async function (e) {
        let uriResult = await Filesystem.getUri({
          path: 'myfolder/myfile.txt',
          directory: Directory.Cache,
        });
        await Filesystem.appendFile({
          path: uriResult.uri,
          data: 'MORE TESTS',
          encoding: Encoding.UTF8,
        });
        console.log('Appended');
      });
      self.shadowRoot.querySelector('#fileDeleteUrl').addEventListener('click', async function (e) {
        let uriResult = await Filesystem.getUri({
          path: 'myfolder/myfile.txt',
          directory: Directory.Cache,
        });
        await Filesystem.deleteFile({
          path: uriResult.uri,
        });
        console.log('Deleted');
      });
      self.shadowRoot.querySelector('#statUrl').addEventListener('click', async function (e) {
        try {
          let uriResult = await Filesystem.getUri({
            path: 'myfolder/myfile.txt',
            directory: Directory.Cache,
          });
          let ret = await Filesystem.stat({
            path: uriResult.uri,
          });
          console.log('STAT', ret);
        } catch (e) {
          console.error('Unable to stat file', e);
        }
      });
      self.shadowRoot.querySelector('#renameFileTestUrl').addEventListener('click', async function (e) {
        console.log('Rename a file into a directory');
        await writeAll('fa');
        await mkdirAll('da');
        let uriResult = await Filesystem.getUri({
          path: 'fa',
          directory: Directory.Data,
        });
        await Filesystem.rename({
          from: uriResult.uri,
          toDirectory: Directory.Data,
          to: 'da/fb',
        });
        await deleteAll('da/fb');
        await rmdirAll('da');
        console.log('rename finished');
      });
      self.shadowRoot.querySelector('#copyFileTestUrl').addEventListener('click', async function (e) {
        console.log('Copy a file into a directory');
        await writeAll('fa');
        await mkdirAll('da');
        let uriResult = await Filesystem.getUri({
          path: 'fa',
          directory: Directory.Data,
        });
        await Filesystem.copy({
          from: uriResult.uri,
          toDirectory: Directory.Data,
          to: 'da/fb',
        });
        await deleteAll(['fa', 'da/fb']);
        await rmdirAll('da');
        console.log('copy finished');
      });
      self.shadowRoot.querySelector('#downloadSmallFile').addEventListener('click', async function (e) {
        download('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf');
      });
      self.shadowRoot.querySelector('#downloadLargeFile').addEventListener('click', async function (e) {
        download(
          'https://raw.githubusercontent.com/kyokidG/large-pdf-viewer-poc/58a3df6adc4fe9bd5f02d2f583d6747e187d93ae/public/test2.pdf',
        );
      });

      // Render one check result card on screen (not just console output)
      function renderCheckResult(title, status, message, details) {
        const results = self.shadowRoot.querySelector('#checkResults');
        const card = document.createElement('div');
        card.className = 'check-card check-' + status;
        card.innerHTML = `
          <div class="check-card-title">${title} &mdash; <span class="check-badge">${status.toUpperCase()}</span></div>
          <div class="check-card-message">${message}</div>
          ${details ? `<pre class="check-card-details">${details}</pre>` : ''}
        `;
        results.prepend(card);
      }

      // Compute the relative "../.." path needed to walk from fromDirUri to toUri,
      // without hardcoding platform-specific folder names (Android/iOS differ).
      function relativeTraversalPath(fromDirUri, toUri) {
        const fromParts = fromDirUri
          .replace(/^file:\/\//, '')
          .replace(/\/+$/, '')
          .split('/')
          .filter(Boolean);
        const toParts = toUri
          .replace(/^file:\/\//, '')
          .split('/')
          .filter(Boolean);
        let common = 0;
        while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) {
          common++;
        }
        const upCount = fromParts.length - common;
        const downParts = toParts.slice(common);
        return '../'.repeat(upCount) + downParts.join('/');
      }

      // Check 1: a call scoped to Directory.Data reads a file that was written to Directory.Cache
      async function checkTraversalRead() {
        const canaryName = 'traversal-canary.txt';
        const marker = 'canary-' + Math.random().toString(36).slice(2);
        try {
          await Filesystem.writeFile({
            path: canaryName,
            directory: Directory.Cache,
            data: marker,
            encoding: Encoding.UTF8,
          });

          const dataDirUri = (await Filesystem.getUri({ path: '', directory: Directory.Data })).uri;
          const canaryFileUri = (await Filesystem.getUri({ path: canaryName, directory: Directory.Cache })).uri;
          const traversalPath = relativeTraversalPath(dataDirUri, canaryFileUri);

          let escapedContent = null;
          let readError = null;
          try {
            const read = await Filesystem.readFile({
              path: traversalPath,
              directory: Directory.Data,
              encoding: Encoding.UTF8,
            });
            escapedContent = read.data;
          } catch (err) {
            readError = err;
          }

          if (escapedContent === marker) {
            renderCheckResult(
              'Traversal read (Directory.Data escapes into Cache)',
              'escaped',
              'readFile({ path, directory: Directory.Data }) returned content that was written to Directory.Cache, not Directory.Data. The Directory boundary was not enforced.',
              `traversal path used: ${traversalPath}\nexpected marker: ${marker}\nactual content read: ${escapedContent}`,
            );
          } else {
            renderCheckResult(
              'Traversal read (Directory.Data escapes into Cache)',
              'contained',
              'The traversal read did not return the canary content, so the read stayed within Directory.Data on this build/platform.',
              `traversal path used: ${traversalPath}\nerror: ${readError ? readError.message || JSON.stringify(readError) : 'n/a'}`,
            );
          }
        } catch (e) {
          renderCheckResult(
            'Traversal read (Directory.Data escapes into Cache)',
            'error',
            'Setup failed before the check could run.',
            e.message || JSON.stringify(e),
          );
        } finally {
          try {
            await Filesystem.deleteFile({ path: canaryName, directory: Directory.Cache });
          } catch (_) {}
        }
      }

      // Check 2: a call scoped to Directory.Cache recursively deletes a folder tree that
      // lives entirely under Directory.Data. Uses a canary folder created by this check
      // so nothing pre-existing is ever at risk.
      async function checkTraversalDelete() {
        const canaryRoot = 'check-canary-root';
        try {
          await Filesystem.mkdir({ path: `${canaryRoot}/child`, directory: Directory.Data, recursive: true });
          await Filesystem.writeFile({
            path: `${canaryRoot}/child/file.txt`,
            directory: Directory.Data,
            data: 'canary',
            encoding: Encoding.UTF8,
          });

          const cacheDirUri = (await Filesystem.getUri({ path: '', directory: Directory.Cache })).uri;
          const canaryRootUri = (await Filesystem.getUri({ path: canaryRoot, directory: Directory.Data })).uri;
          const traversalPath = relativeTraversalPath(cacheDirUri, canaryRootUri);

          let deleteError = null;
          try {
            await Filesystem.rmdir({ path: traversalPath, directory: Directory.Cache, recursive: true });
          } catch (err) {
            deleteError = err;
          }

          let stillExists = true;
          try {
            await Filesystem.stat({ path: canaryRoot, directory: Directory.Data });
          } catch (_) {
            stillExists = false;
          }

          if (!stillExists) {
            renderCheckResult(
              'Traversal recursive delete (Directory.Cache escapes into Data)',
              'escaped',
              'rmdir({ path, directory: Directory.Cache, recursive: true }) deleted a folder tree that lives entirely under Directory.Data. A call scoped to Cache destroyed data outside Cache.',
              `traversal path used: ${traversalPath}`,
            );
          } else {
            renderCheckResult(
              'Traversal recursive delete (Directory.Cache escapes into Data)',
              'contained',
              'The canary folder still exists after the traversal delete attempt, so the delete stayed within Directory.Cache on this build/platform.',
              `traversal path used: ${traversalPath}\nerror: ${deleteError ? deleteError.message || JSON.stringify(deleteError) : 'n/a'}`,
            );
            try {
              await Filesystem.rmdir({ path: canaryRoot, directory: Directory.Data, recursive: true });
            } catch (_) {}
          }
        } catch (e) {
          renderCheckResult(
            'Traversal recursive delete (Directory.Cache escapes into Data)',
            'error',
            'Setup failed before the check could run.',
            e.message || JSON.stringify(e),
          );
          try {
            await Filesystem.rmdir({ path: canaryRoot, directory: Directory.Data, recursive: true });
          } catch (_) {}
        }
      }

      // Check 3: a call scoped to Directory.Data writes/creates a file that lands under
      // Directory.Cache. Mirrors the read check, but for writes - the same missing
      // containment shows up on both sides.
      async function checkTraversalWrite() {
        const canaryName = 'traversal-write-canary.txt';
        const marker = 'write-canary-' + Math.random().toString(36).slice(2);
        try {
          try {
            await Filesystem.deleteFile({ path: canaryName, directory: Directory.Cache });
          } catch (_) {}

          const dataDirUri = (await Filesystem.getUri({ path: '', directory: Directory.Data })).uri;
          const cacheDirUri = (await Filesystem.getUri({ path: '', directory: Directory.Cache })).uri;
          const traversalDirPath = relativeTraversalPath(dataDirUri, cacheDirUri);
          const traversalFilePath = `${traversalDirPath}/${canaryName}`;

          let writeError = null;
          try {
            await Filesystem.writeFile({
              path: traversalFilePath,
              directory: Directory.Data,
              data: marker,
              encoding: Encoding.UTF8,
            });
          } catch (err) {
            writeError = err;
          }

          let landedContent = null;
          let readError = null;
          try {
            const read = await Filesystem.readFile({ path: canaryName, directory: Directory.Cache, encoding: Encoding.UTF8 });
            landedContent = read.data;
          } catch (err) {
            readError = err;
          }

          if (landedContent === marker) {
            renderCheckResult(
              'Traversal write (Directory.Data escapes into Cache)',
              'escaped',
              'writeFile({ path, directory: Directory.Data }) created a file that landed under Directory.Cache instead. A call scoped to Data wrote data outside Data.',
              `traversal path used: ${traversalFilePath}\nmarker written: ${marker}\ncontent found in Cache: ${landedContent}`,
            );
          } else {
            renderCheckResult(
              'Traversal write (Directory.Data escapes into Cache)',
              'contained',
              'The traversal write did not land in Directory.Cache, so the write stayed within Directory.Data on this build/platform.',
              `traversal path used: ${traversalFilePath}\nwrite error: ${writeError ? writeError.message || JSON.stringify(writeError) : 'n/a'}\nread error: ${readError ? readError.message || JSON.stringify(readError) : 'n/a'}`,
            );
          }
        } catch (e) {
          renderCheckResult('Traversal write (Directory.Data escapes into Cache)', 'error', 'Setup failed before the check could run.', e.message || JSON.stringify(e));
        } finally {
          try {
            await Filesystem.deleteFile({ path: canaryName, directory: Directory.Cache });
          } catch (_) {}
        }
      }

      // Check 4: copy({ from, directory: Data, to, toDirectory: Data }) is asked to write
      // "within Data", but the "to" path traverses into Cache, landing on a pre-existing
      // file there. copyFile always overwrites (overwrite: true), so this checks whether
      // a copy scoped to one Directory can overwrite data that lives in a different Directory.
      async function checkCopyOverwrite() {
        const targetName = 'copy-overwrite-target.txt';
        const sourceName = 'copy-overwrite-source.txt';
        const originalContent = 'original-target-content';
        const marker = 'copy-overwrite-' + Math.random().toString(36).slice(2);
        try {
          await Filesystem.writeFile({ path: targetName, directory: Directory.Cache, data: originalContent, encoding: Encoding.UTF8 });
          await Filesystem.writeFile({ path: sourceName, directory: Directory.Data, data: marker, encoding: Encoding.UTF8 });

          const dataDirUri = (await Filesystem.getUri({ path: '', directory: Directory.Data })).uri;
          const targetUri = (await Filesystem.getUri({ path: targetName, directory: Directory.Cache })).uri;
          const traversalPath = relativeTraversalPath(dataDirUri, targetUri);

          let copyError = null;
          try {
            await Filesystem.copy({
              from: sourceName,
              directory: Directory.Data,
              to: traversalPath,
              toDirectory: Directory.Data,
            });
          } catch (err) {
            copyError = err;
          }

          let targetContent = null;
          try {
            const read = await Filesystem.readFile({ path: targetName, directory: Directory.Cache, encoding: Encoding.UTF8 });
            targetContent = read.data;
          } catch (_) {}

          if (targetContent === marker) {
            renderCheckResult(
              'Copy overwrite via traversal (Directory.Data escapes into Cache)',
              'escaped',
              'copy({ from, directory: Directory.Data, to, toDirectory: Directory.Data }) silently overwrote a pre-existing file that actually lives under Directory.Cache, replacing its content with the source file\'s content. No boundary check, no "destination already exists" check.',
              `traversal "to" path used: ${traversalPath}\noriginal target content: ${originalContent}\ncontent after copy: ${targetContent}`,
            );
          } else {
            renderCheckResult(
              'Copy overwrite via traversal (Directory.Data escapes into Cache)',
              'contained',
              'The target file content was not overwritten, so the copy stayed within Directory.Data on this build/platform.',
              `traversal "to" path used: ${traversalPath}\ncopy error: ${copyError ? copyError.message || JSON.stringify(copyError) : 'n/a'}\ntarget content: ${targetContent}`,
            );
          }
        } catch (e) {
          renderCheckResult('Copy overwrite via traversal (Directory.Data escapes into Cache)', 'error', 'Setup failed before the check could run.', e.message || JSON.stringify(e));
        } finally {
          try {
            await Filesystem.deleteFile({ path: targetName, directory: Directory.Cache });
          } catch (_) {}
          try {
            await Filesystem.deleteFile({ path: sourceName, directory: Directory.Data });
          } catch (_) {}
        }
      }

      // Check 5: same as the copy check, but via rename/move. renameFile deletes the
      // destination unconditionally before renaming, so this is a distinct code path
      // with the same outcome - worth checking separately since a fix may not treat
      // them alike.
      async function checkMoveOverwrite() {
        const targetName = 'move-overwrite-target.txt';
        const sourceName = 'move-overwrite-source.txt';
        const originalContent = 'original-target-content';
        const marker = 'move-overwrite-' + Math.random().toString(36).slice(2);
        try {
          await Filesystem.writeFile({ path: targetName, directory: Directory.Cache, data: originalContent, encoding: Encoding.UTF8 });
          await Filesystem.writeFile({ path: sourceName, directory: Directory.Data, data: marker, encoding: Encoding.UTF8 });

          const dataDirUri = (await Filesystem.getUri({ path: '', directory: Directory.Data })).uri;
          const targetUri = (await Filesystem.getUri({ path: targetName, directory: Directory.Cache })).uri;
          const traversalPath = relativeTraversalPath(dataDirUri, targetUri);

          let moveError = null;
          try {
            await Filesystem.rename({
              from: sourceName,
              directory: Directory.Data,
              to: traversalPath,
              toDirectory: Directory.Data,
            });
          } catch (err) {
            moveError = err;
          }

          let targetContent = null;
          try {
            const read = await Filesystem.readFile({ path: targetName, directory: Directory.Cache, encoding: Encoding.UTF8 });
            targetContent = read.data;
          } catch (_) {}

          if (targetContent === marker) {
            renderCheckResult(
              'Move overwrite via traversal (Directory.Data escapes into Cache)',
              'escaped',
              'rename({ from, directory: Directory.Data, to, toDirectory: Directory.Data }) deleted a pre-existing file that actually lives under Directory.Cache and replaced it with the moved source file. No boundary check, no "destination already exists" check.',
              `traversal "to" path used: ${traversalPath}\noriginal target content: ${originalContent}\ncontent after move: ${targetContent}`,
            );
          } else {
            renderCheckResult(
              'Move overwrite via traversal (Directory.Data escapes into Cache)',
              'contained',
              'The target file content was not overwritten, so the move stayed within Directory.Data on this build/platform.',
              `traversal "to" path used: ${traversalPath}\nmove error: ${moveError ? moveError.message || JSON.stringify(moveError) : 'n/a'}\ntarget content: ${targetContent}`,
            );
          }
        } catch (e) {
          renderCheckResult('Move overwrite via traversal (Directory.Data escapes into Cache)', 'error', 'Setup failed before the check could run.', e.message || JSON.stringify(e));
        } finally {
          try {
            await Filesystem.deleteFile({ path: targetName, directory: Directory.Cache });
          } catch (_) {}
          try {
            await Filesystem.deleteFile({ path: sourceName, directory: Directory.Data });
          } catch (_) {}
        }
      }

      // Check 6: a call scoped to Directory.Data lists the contents of a different
      // directory via a relative ".." path, checking that readdir stays contained the
      // same way the read/write/delete/copy/move checks above do.
      async function checkDirScopedListing() {
        try {
          let entries = null;
          let listError = null;
          try {
            const listed = await Filesystem.readdir({ path: '..', directory: Directory.Data });
            entries = listed.files.map((f) => (typeof f === 'string' ? f : f.name));
          } catch (err) {
            listError = err;
          }

          if (entries && entries.length) {
            renderCheckResult(
              'Directory-scoped traversal listing (Directory.Data + "..")',
              'escaped',
              'readdir({ path: "..", directory: Directory.Data }) listed the contents of the app\'s data root, one level above Directory.Data.',
              `entries: ${entries.join(', ')}`,
            );
          } else {
            renderCheckResult(
              'Directory-scoped traversal listing (Directory.Data + "..")',
              'contained',
              'The directory-scoped traversal listing did not succeed, so the listing stayed within Directory.Data on this build/platform.',
              `error: ${listError ? listError.message || JSON.stringify(listError) : 'n/a'}`,
            );
          }
        } catch (e) {
          renderCheckResult(
            'Directory-scoped traversal listing (Directory.Data + "..")',
            'error',
            'Setup failed before the check could run.',
            e.message || JSON.stringify(e),
          );
        }
      }

      self.shadowRoot.querySelector('#checkTraversalRead').addEventListener('click', checkTraversalRead);
      self.shadowRoot.querySelector('#checkTraversalDelete').addEventListener('click', checkTraversalDelete);
      self.shadowRoot.querySelector('#checkTraversalWrite').addEventListener('click', checkTraversalWrite);
      self.shadowRoot.querySelector('#checkCopyOverwrite').addEventListener('click', checkCopyOverwrite);
      self.shadowRoot.querySelector('#checkMoveOverwrite').addEventListener('click', checkMoveOverwrite);
      self.shadowRoot.querySelector('#checkDirScopedListing').addEventListener('click', checkDirScopedListing);
      self.shadowRoot.querySelector('#runAllChecks').addEventListener('click', async function () {
        await checkTraversalRead();
        await checkTraversalDelete();
        await checkTraversalWrite();
        await checkCopyOverwrite();
        await checkMoveOverwrite();
        await checkDirScopedListing();
      });
      self.shadowRoot.querySelector('#clearResults').addEventListener('click', function () {
        self.shadowRoot.querySelector('#checkResults').innerHTML = '';
      });

      // download a file from the provided url
      async function download(file) {
        try {
          const fileUrlSplit = file.split('/');
          const path = fileUrlSplit[fileUrlSplit.length - 1];

          Filesystem.addListener('progress', (status) => {
            const progress = status.bytes / status.contentLength;
            console.log('Download progress -> ' + progress);
          });

          const downloadFileResult = await Filesystem.downloadFile({
            url: file,
            directory: Directory.Cache,
            path,
            progress: true,
          });

          console.log('Downloaded file!', downloadFileResult);
          alert('Downloaded file successfully!');
        } catch (err) {
          console.error('Unable to download file', err);
        }
      }

      // Helper function to run the provided promise-returning function on a single item or array of items
      async function doAll(item, callback) {
        item = Array.isArray(item) ? item : [item];
        for (let i of item) {
          await callback(i);
        }
      }
      // Create many files
      async function writeAll(paths) {
        return doAll(paths, (path) =>
          Filesystem.writeFile({
            directory: Directory.Data,
            path: path,
            data: path,
            encoding: Encoding.UTF8,
          }),
        );
      }
      // Delete many files
      async function deleteAll(paths) {
        return doAll(paths, (path) =>
          Filesystem.deleteFile({
            directory: Directory.Data,
            path: path,
          }),
        );
      }
      // Create many directories
      async function mkdirAll(paths) {
        return doAll(paths, (path) =>
          Filesystem.mkdir({
            directory: Directory.Data,
            path: path,
            recursive: true,
          }),
        );
      }
      // Remove many directories
      async function rmdirAll(paths) {
        return doAll(paths, (path) =>
          Filesystem.rmdir({
            directory: Directory.Data,
            path: path,
          }),
        );
      }
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 60px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);
