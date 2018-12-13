const vscode = require('vscode');

module.exports = class StatusBar {
  constructor() {
    this.statusBar = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
    this.statusBar.text = '🐤';
    this.statusBar.command = 'extension.showTimeline';
    this.statusBar.show();
  }

  chun() {
    this.statusBar.text = '🐤chun!';
    setTimeout(() => {
      this.statusBar.text = '🐤';
    }, 3000);
  }

  piyo() {
    this.statusBar.text = '🐤piyo...';
    setTimeout(() => {
      this.statusBar.text = '🐤';
    }, 3000);
  }
};
