Additional Keyboard
=======

Node.js-script for Linux, that adds support of the second keyboard as a usual button panel.


### How to use ###

#### 1. Fill key_bindings.cfg file like so: ####
```
a_key_name: a command to execute
another_key_name: the second command to execute
...
```

Where possible key names are (it's only for numpad, but you can extend this list in the source):
  - 0
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
  - 9
  - .
  - enter
  - +
  - -
  - backspace
  - *
  - /
  - numlock

#### 1. Run the script: ####

> node path_to/additional_keyboard.js device [interface_type]

- device - your keyboard from /dev/input/; it's recommended to refer to device through /dev/input/by-path/ directory
- interface_type - type of a keyboard interface; can be "ps2" or "usb"; default is "ps2"

### Disabling duplication ###

Run:

> xinput set-prop id 'Device Enabled' 0

"id" of your device you can find by executing:

> xinput list

### Autostart ###

Add execution of the script to /etc/rc.local before "exit 0" to run it with root's privileges:

> nohup path_to/node path_to/additional_keyboard.js device [interface_type] &

Run disabling duplication command

> /usr/bin/xinput set-prop id 'Device Enabled' 0

when X server is running with its user priveleges. For example, in Ubuntu you can add it though Startup Applications program.