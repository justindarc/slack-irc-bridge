const CONFIG = require('./config');

var http = require('http');

var IRCClient = require('irc').Client;
var SlackClient = require('slack-client').RtmClient;

var SlackMemoryDataStore = require('slack-client').MemoryDataStore;

var string = require('string');
var emoji = require('node-emoji');

var ircConfig = {
  port: CONFIG.IRC_PORT,
  secure: CONFIG.IRC_SECURE,
  password: CONFIG.IRC_PASSWORD,
  sasl: CONFIG.IRC_SASL,
  channels: [ CONFIG.IRC_CHANNEL ]
};

var ircClient = new IRCClient(CONFIG.IRC_SERVER, CONFIG.IRC_NICK, ircConfig);
var slackClient = new SlackClient(CONFIG.SLACK_TOKEN, {
  logLevel: 'error',
  dataStore: new SlackMemoryDataStore()
});

ircClient.once('raw', function(message) {
  console.log('IRC client connected!');

  slackClient.login();

  slackClient.on('open', function() {
    console.log('Slack client connected!');

    var slackChannel = slackClient.dataStore.getChannelByName(CONFIG.SLACK_CHANNEL);

    ircClient.on('message', function(user, channel, text) {
      if (user === CONFIG.IRC_NICK) {
        return;
      }

      slackClient.sendMessage('<' + user + '> ' + text, slackChannel.id);
    });

    slackClient.on('message', function(message) {
      var user = slackClient.dataStore.getUserById(message.user).name;
      var text = emoji.emojify(string(message.text).unescapeHTML().toString());

      text = text.replace(/<@(.+)>/g, function(match, p1, offset, string) {
        return '@' + slackClient.dataStore.getUserById(p1).name;
      });

      ircClient.say(CONFIG.IRC_CHANNEL, '<' + user + '> ' + text);
    });
  });
});

ircClient.on('error', function(error) {
  console.error(error);
});

slackClient.on('error', function(error) {
  console.error(error);
});

slackClient.login();

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bridging Slack to IRC');
});

server.listen(CONFIG.PORT);

if (CONFIG.NODE_ENV !== 'development') {
  setInterval(function() {
    http.get('http://' + CONFIG.HOST);
  }, 300000);
}
