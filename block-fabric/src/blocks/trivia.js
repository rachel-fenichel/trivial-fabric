/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Game blocks for trivia game.
 */


import Blockly from 'blockly/core';
import {FABRIC_SHAPE_TYPE} from './fabric_blocks';

/**
 * HSV hue for all trivia game blocks with function.
 */
const TRIVIA_FUNCTION_HUE = 360;

/**
 * Initializes an "event function" block given the name and arguments for the
 * block.
 * @param {string} name The name of the function.
 * @param {string} args A comma separated string of the argument variable names.
 * @param {string} returnType The return type of the function.
 * @return {!Function} An initialization function with arguments bound.
 * @this {Blockly.Block}
 * @private
 */
const drawShapeEventInitFactory__ =
    function(name, args, returnType) {
  return function() {
    this.jsonInit({
      "message0": "%1 (%2) %3 %4 return %5",
      "args0": [
        name,
        args,
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "STACK"
        },
        {
          "type": "input_value",
          "check": returnType,
          "align": "right",
          "name": "RETURN"
        }
      ],
      "inputsInline": true,
      "colour": TRIVIA_FUNCTION_HUE,
    });
  };
};

/**
 * Generates the JavaScript for a draw event function block.
 * @param {string} name The name of the function.
 * @param {string} args A comma separated string of the argument variable names.
 * @return {!Function} A generator function with arguments bound.
 * @private
 */
const drawShapeEventJavascriptFactory_ = (name, args) => {
  return function(block) {
    // Define a procedure with a return value.
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || '';
    returnValue = '  return ' + returnValue + ';\n';
    var code = 'function ' + name + '(' + args + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    Blockly.JavaScript.definitions_[name] = code;
    return null;
  };
};

/**
 * Block for drawQuestionShape shape event handler.
 * @type {{init: !Function}}
 */
Blockly.Blocks['trivia_draw_question_shape'] = {
  init: drawShapeEventInitFactory__('drawQuestionShape', 'question', FABRIC_SHAPE_TYPE)
};

/**
 * Defines the JavaScript generation for drawQuestionShape.
 * @type {!Function}
 */
Blockly.JavaScript['trivia_draw_question_shape'] =
    drawShapeEventJavascriptFactory_('drawQuestionShape', 'question');

/**
 * Block for defining drawAnswerShape event handler.
 * @type {{init: !Function}}
 */
Blockly.Blocks['trivia_draw_answer_shape'] = {
  init: drawShapeEventInitFactory__('drawAnswerShape', 'answer', FABRIC_SHAPE_TYPE)
};

/**
 * Defines the JavaScript generation for drawAnswerShape.
 * @type {!Function}
 */
Blockly.JavaScript['trivia_draw_answer_shape'] =
    drawShapeEventJavascriptFactory_('drawAnswerShape', 'answer');
