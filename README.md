# slack-irc-bridge

slack-irc-bridge is a solution for mirroring a Slack channel to an IRC channel and vice-versa.

### Install

```shell
$ npm install
```

### Copy `.env-example` to `.env`

```shell
$ cp .env-example .env
```

### Configure `.env`

```shell
IRC_SERVER=irc.testbot.org
IRC_PORT=6697
IRC_SECURE=1
IRC_NICK=SlackBot
IRC_PASSWORD=SlackBotPassword
IRC_CHANNEL=#ircchannel
SLACK_CHANNEL=#slackchannel
SLACK_TOKEN=xoxb...8WRqKWx
NODE_ENV=development
PORT=3000
```
### Run

```shell
$ npm start
```

### Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
