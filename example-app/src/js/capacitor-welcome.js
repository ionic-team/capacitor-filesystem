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
