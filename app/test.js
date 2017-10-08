const { Application } = require('spectron');
const path = require('path');

let electronPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'electron',
);

if (process.platform === 'win32') {
  electronPath += '.cmd';
}

describe('application launch', () => {
  let app;

  beforeEach(() => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, './main.js')],
    });
    return app.start();
  });

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });
});
