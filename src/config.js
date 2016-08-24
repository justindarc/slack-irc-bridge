if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

module.exports = {
  IRC_SERVER:     process.env.IRC_SERVER,
  IRC_PORT:       parseInt(process.env.IRC_PORT, 10),
  IRC_SECURE:     !!parseInt(process.env.IRC_SECURE, 10),
  IRC_NICK:       process.env.IRC_NICK,
  IRC_PASSWORD:   process.env.IRC_PASSWORD,
  IRC_CHANNEL:    process.env.IRC_CHANNEL,
  SLACK_CHANNEL:  process.env.SLACK_CHANNEL,
  SLACK_TOKEN:    process.env.SLACK_TOKEN,
  NODE_ENV:       process.env.NODE_ENV,
  PORT:           process.env.PORT,
  HOST:           process.env.HOST
};
