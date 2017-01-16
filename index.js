var assert = require('assert')
var Slackbot = require('slackbots')

assert(process.env.ZBOT_TOKEN, 'ZBOT DEMANDS A TOKEN')

var users = []
var params = { as_user: true }

var zbot = new Slackbot({
  name: 'zbot',
  token: process.env.ZBOT_TOKEN
})

zbot.on('start', function () {
  zbot.postMessageToUser('ungoldman', 'zbot reporting for duty', params)
  updateUserData()
})

zbot.on('message', function (data) {
  if (data.bot_id) return // ignore bots, self
  if (data.type === 'message') handler(data)
})

function handler (data) {
  var user = users.find(u => u.id === data.user)
  console.log(`${user.name || data.user}: ${data.text}`)
}

function updateUserData (data) {
  zbot.getUsers().then(function (data) {
    users = data.members
  })
}

function dm (user, message) {
  zbot.postMessageToUser(user, message, params)
}

// bot must be invited to channel first
function msg (channel, message) {
  zbot.postMessageToChannel(channel, message, params)
}
