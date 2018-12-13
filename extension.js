const vscode = require('vscode');
const Twitter = require('./twitter');

function activate(context) {
  console.log('"Suzume" is now active!');
  const client = new Twitter();

  let showTimeline = vscode.commands.registerCommand(
    'extension.showTimeline',
    function() {
      client.timeline(timelines => {
        vscode.window.showQuickPick(timelines).then(select => {
          vscode.window.showInformationMessage(select.description);
        });
      });
    }
  );

  let postTweet = vscode.commands.registerCommand(
    'extension.postTweet',
    function() {
      vscode.window.showInputBox().then(text => {
        client.tweet(text);
      });
    }
  );

  context.subscriptions.push(showTimeline);
  context.subscriptions.push(postTweet);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
