var assert = require('assert')
var Slackbot = require('slackbots')

assert(process.env.ZBOT_TOKEN, 'ZBOT DEMANDS A TOKEN')

var db = {
  users: [],
  channels: []
}

var params = { as_user: true }

var zbot = new Slackbot({
  name: 'zbot',
  token: process.env.ZBOT_TOKEN
})

zbot.on('start', updateData)

zbot.on('message', function (data) {
  if (data.bot_id) return // ignore bots, self
  if (data.type === 'message') handler(data)
})

function handler (data) {
  // var user = db.users.find(u => u.id === data.user)
  // console.log(`${user.name || data.user}: ${data.text}`)
  console.log(data)
}

function updateData () {
  updateUserData()
  updateChannelData()
}

function updateUserData () {
  zbot.getUsers().then(function (data) {
    db.users = data.members
  })
}

function updateChannelData () {
  zbot.getChannels().then(function (data) {
    db.channels = data.channels
  })
}

function dm (user, message) {
  zbot.postMessageToUser(user, message, params)
}

// bot must be invited to channel first
function msg (channel, message) {
  zbot.postMessageToChannel(channel, message, params)
}
