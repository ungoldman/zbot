# COMBOT

It's a bot! It's a bouncer! It's a client! It's COMBOT!

## Usage

```js
var mech = require('combot')()

mech.connect({
  type: 'slack',
  properties: {
    team: 'zhealth.slack.com',
    token: 'XXX'
  }
}, handler)

mech.connect({
  type: 'irc',
  properties: {
    server: 'freenode.irc.net',
    port: 6667,
    nick: 'bingo',
    channels: []
  }
}, handler)

function handler (err, cxn) {
  if (err) throw err

  // connection specific commands
  cxn.join(cb) // join channel
  cxn.msg({ user, message }) // direct messages
  cxn.send({ channel, message }) // channel messages
  cxn.on(event, function (data) {}) // event handlers
  cxn.channels(cb) // list channels
  cxn.users(cb) // list users
  cxn.quit(cb) // disconnect
}

mech.listen(3000) // expose a client interface
```
