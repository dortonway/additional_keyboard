/*
  Additional Keyboard
  https://github.com/dortonway/additional_keyboard
*/


// http://stackoverflow.com/questions/15287984/nodejs-serialport-data-tostring-failing-encoding
// http://stackoverflow.com/questions/15742172/would-it-be-possible-to-read-out-physical-keyboard-strokes-in-node-js

if (!process.argv[2]) return console.log('Error: You must specify a keyboard device as an argument (probably it\'s in /dev/input; it\'s recommended to ref through "by-path" dir)')

var SP = require('serialport').SerialPort
var fs = require('fs')
var exec = require('child_process').exec
var _ = require('underscore')

var port = process.argv[2]
var interface_type = process.argv[3] || 'ps2'
var sp = new SP(port)
var bindings_file = __dirname + '/key_bindings.cfg'
var key_codes_usb = {
  '0': 82,
  '1': 89,
  '2': 90,
  '3': 91,
  '4': 92,
  '5': 93,
  '6': 94,
  '7': 95,
  '8': 96,
  '9': 97,
  '.': 99,
  'enter': 88,
  '+': 87,
  '-': 86,
  'backspace': 42,
  '*': 85,
  '/': 84,
  'numlock': 83
}
var key_codes_ps2 = {
  '0': 82,
  '1': 79,
  '2': 80,
  '3': 81,
  '4': 75,
  '5': 76,
  '6': 77,
  '7': 71,
  '8': 72,
  '9': 73,
  '.': 83,
  'enter': 156,
  '+': 78,
  '-': 74,
  '*': 55,
  '/': 181,
  'numlock': 69
}
var key_codes = eval('key_codes_' + interface_type)
var bindings = {}

bind_from_file()

sp.on('data', function(data) {
  var code = data[20]
  var up_down = data[44]
  var down = up_down === 1 ? true : false
  if (!down) return

  console.log('\r\n', 'code:', code)
  exec(bindings[code])
})

function bind_from_file() {
  var data = fs.readFileSync(bindings_file).toString()
  var lines = data.split('\n')
  _.each(lines, function(line) {
    var split_line = line.split(':')
    var key_name = split_line[0]
    var to_exec = split_line[1]
    bind(key_name, to_exec)
  })
}

function bind(key_name, to_exec) {
  var numeric = key_codes[key_name]
  bindings[numeric] = to_exec
}