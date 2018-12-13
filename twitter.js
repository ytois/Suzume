const twitter = require('twitter-lite');
const moment = require('moment');
const vscode = require('vscode');

module.exports = class Twitter {
  constructor() {
    const configuration = vscode.workspace.getConfiguration('twitter');
    const params = {
      consumer_key: configuration.get('consumerkey'),
      consumer_secret: configuration.get('consumersecret'),
      access_token_key: configuration.get('accesstokenkey'),
      access_token_secret: configuration.get('accesstokensecret')
    };
    this.client = new twitter(params);
  }

  timeline(callback) {
    return this.client
      .get('statuses/home_timeline')
      .then(response => {
        return response.map(tweet => {
          let time = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY');
          return {
            label: tweet.user.name,
            description: `${tweet.text} (${time.format('HH:MM')})`
          };
        });
      })
      .then(timelines => callback(timelines));
  }

  tweet(text) {
    return this.client.post('statuses/update', null, { status: text });
  }
};
