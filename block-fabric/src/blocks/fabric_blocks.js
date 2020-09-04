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
    "type": "fabric_ellipse",
    "message0": "ellipse with color %1",
    "args0": [
      {
        "type": "input_value",
        "name": "COLOUR"
      }
    ],
    "output": FABRIC_SHAPE_TYPE,
    "colour": 285,
    "tooltip": "Create a Fabric rectangle",
    "helpUrl": ""
},
{
  "type": "fabric_rect",
  "message0": "rectangle with color %1",
  "args0": [
    {
      "type": "input_value",
      "name": "COLOUR"
    }
  ],
  "output": FABRIC_SHAPE_TYPE,
  "colour": 285,
  "tooltip": "Create a Fabric ellipse",
  "helpUrl": ""
},
  {
    "type": "answer_text_var",
    "message0": "current answer text",
    "output": "String",
    "colour": 105,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "trivia_answer",
    "message0": "Draw Trivia Answer %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "DRAW_STEPS"
      }
    ],
    "colour": 230,
    "tooltip": "Configures how to draw an answer for a trivia question",
    "helpUrl": ""
  },
  {
    "type": "draw_canvas_item",
    "message0": "Draw canvas item %1",
    "args0": [
      {
        "type": "input_value",
        "name": "ITEM",
        "check": FABRIC_SHAPE_TYPE
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Add the given Canvas item to the workspace",
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

  var code = `new fabric.Text(${value_text}, { left: 100, top: top+10, fill: ${value_colour}, fontSize: 20 })`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['fabric_ellipse'] = function(block) {
  var value_colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_NEW);
  var code = `new fabric.Ellipse({top: top, left: 50, rx: 200, ry: 25, fill: ${value_colour}})`
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NEW];
};

Blockly.JavaScript['fabric_rect'] = function(block) {
  var value_colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `new fabric.Rect({top: top, left: 50, width: 400, height: 50, fill: ${value_colour}})`
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NEW];
};

Blockly.JavaScript['answer_text_var'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'optionText';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['draw_canvas_item'] = function(block) {
  var value_item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_FUNCTION_CALL);
  
  let code = `shapeToDraw = ${value_item};\nthis.canvas.add(shapeToDraw);\n`;
  return code;
};

Blockly.JavaScript['trivia_answer'] = function(block) {
  var statements_draw_steps = Blockly.JavaScript.statementToCode(block, 'DRAW_STEPS');
  // TODO: Assemble JavaScript into code variable.
  var code = `let shapeToDraw;\n${statements_draw_steps}`;
  return code;
};

