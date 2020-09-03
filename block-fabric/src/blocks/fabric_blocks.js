/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Fabric blocks.
 */

import Blockly from 'blockly/core';

/**
 * The return type for a fabric shape block.
 * @type {string}
 */
export const FABRIC_SHAPE_TYPE = 'FabricShape';  // TBD, may change


Blockly.defineBlocksWithJsonArray([
  {
    'type': 'place_holder_fabric_block',
    'message0': 'FabricShape',
    'output': FABRIC_SHAPE_TYPE,
    'colour': '#aaaaaa',
  },
  {
    "type": "fabric_text",
    "message0": "display text %1 with color %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "COLOUR"
      }
    ],
    "output": FABRIC_SHAPE_TYPE,
    "colour": 285,
    "tooltip": "Create a Fabric text block",
    "helpUrl": ""
  },
  {
    "type": "answer_text_var",
    "message0": "current answer text",
    "output": "String",
    "colour": 105,
    "tooltip": "",
    "helpUrl": ""
  }
]);

/**
 * Defines the JavaScript generation for place_holder_fabric_block.
 * @type {!Function}
 */
Blockly.JavaScript['place_holder_fabric_block'] = () => {
  return ['fabric block', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['fabric_text'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  var code = `var text = new fabric.Text(${value_text}, { left: 100, top: top, fill: ${value_colour}, fontSize: 20 });
      this.canvas.add(text);`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['answer_text_var'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'optionText';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

