[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![npm](https://img.shields.io/npm/v/node-red-contrib-convert-kitchen.svg)](https://www.npmjs.com/package/node-red-contrib-convert-kitchen)
[![downloads](https://img.shields.io/npm/dt/node-red-contrib-convert-kitchen.svg)](https://www.npmjs.com/package/node-red-contrib-convert-kitchen)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/HaroldPetersInskipp/node-red-contrib-convert-kitchen/blob/main/LICENSE)

## node-red-contrib-convert-kitchen

A simple Node-RED node to convert between units of measurement for cooking.


### Quick Start

Install with the built in <b>Node-RED Palette manager</b> or using npm:
```
npm install node-red-contrib-convert-kitchen
```

### Examples

[<img src="exampleDialog.png">](https://github.com/HaroldPetersInskipp/node-red-contrib-convert-kitchen)
[<img src="example.png">](https://github.com/HaroldPetersInskipp/node-red-contrib-convert-kitchen/blob/main/examples/convert-kitchen.json)
This example can be imported from within Node-RED with:
IMPORT > EXAMPLES > node-red-contrib-convert-kitchen
[<img src="exampleDashboard.png">](https://github.com/HaroldPetersInskipp/node-red-contrib-convert-kitchen/blob/main/examples/convert-kitchen.json)

### Help

This documentation is also available in the help section of the node.

This node expects the following four inputs:<code>msg.sys</code> <code>msg.value</code> <code>msg.unit</code> <code>msg.finalUnit</code>
If they are recieved, they will overwrite the values selected in the node's menu.

<code>msg.sys</code> must be the string 'us' or 'imperial'.
<code>msg.value</code> must be a number.
Both <code>msg.unit</code> and <code>msg.finalUnit</code> must be strings, the following units are supported:
<b>gallon</b>, <b>liter</b>, <b>quart</b>, <b>pint</b>, <b>cup</b>, <b>ounce</b>, <b>tablespoon</b>, <b>teaspoon</b>, and <b>milliliter</b>.

### Bugs reports and feature requests

Please report any issues or feature requests at <a href="https://github.com/HaroldPetersInskipp/node-red-contrib-convert-kitchen/issues">GitHub</a>.