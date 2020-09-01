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
 * Default HSV hue for all trivia game blocks.
 */
const TRIVIA_BLOCK_HUE = 300;

// This MIGHT need to move
Blockly.JavaScript.addReservedWords(
    'drawQuestionShape,drawAnswerShape,getScore,updateScore');

/**
 * Initializes an 'event function' block given the name and arguments for
 * the block.
 * @param {string} name The name of the function.
 * @param {string} args A comma separated string of the argument variable names.
 * @param {string=} returnType The return type of the function.
 * @return {!Function} An initialization function with arguments bound.
 * @this Blockly.Block
 * @private
 */
const eventBlockInitFactory_ = (name, args, returnType) => {
  const message0 = returnType ? '%1 (%2) %3 %4 return %5' : '%1 (%2) %3 %4';
  const args0 = [
    name,
    args,
    {
      'type': 'input_dummy',
    },
    {
      'type': 'input_statement',
      'name': 'STACK',
    },
  ];
  if (returnType) {
    args0.push({
      'type': 'input_value',
      'check': returnType,
      'align': 'right',
      'name': 'RETURN',
    });
  }
  return function() {
    this.jsonInit({
      'message0': message0,
      'args0': args0,
      'inputsInline': true,
      'colour': TRIVIA_FUNCTION_HUE,
    });
  };
};

const eventFuncBlockFactory_ = (name, args, returnType = undefined) => {
  const argList = args.split(',');
  return {
    init: eventBlockInitFactory_(name, args, returnType),
    getVars: () => argList,
    customContextMenu: (options) => {
      // Add options to create getters for arg parameter.
      if (!this.isCollapsed()) {
        argList.forEach((argName) => {
          const option = {enabled: true};
          const name = argName;
          option.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1',
              name);
          const xmlBlock = Blockly.utils.xml.createElement('block');
          xmlBlock.setAttribute('type', 'variables_get');
          const xmlField = Blockly.utils.xml.createElement('field');
          xmlField.setAttribute('name', 'VAR');
          const argumentName = Blockly.utils.xml.createTextNode(name);
          xmlField.appendChild(argumentName);
          xmlBlock.appendChild(xmlField);

          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        });
      }
    },
  };
};

/**
 * Generates the JavaScript for event function block with return.
 * @param {string} name The name of the function.
 * @param {string} args A comma separated string of the argument variable names.
 * @param {boolean} hasReturn Whether there is a return value.
 * @return {!Function} A generator function with arguments bound.
 * @private
 */
const eventFuncJavascriptFactory_ = (name, args, hasReturn) => {
  return function(block) {
    // Define a procedure with/without a return value.
    let branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (hasReturn) {
      let returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
          Blockly.JavaScript.ORDER_NONE) || '';
      returnValue = '  return ' + returnValue + ';\n';
      branch += returnValue;
    }
    let code = 'function ' + name + '(' + args + ') {\n' + branch + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    Blockly.JavaScript.definitions_[name] = code;
    return null;
  };
};

/**
 * Block for drawQuestionShape shape event handler.
 * @type {{init: !Function}}
 */
Blockly.Blocks['trivia_draw_question_shape'] =
    eventFuncBlockFactory_('drawQuestionShape', 'question', FABRIC_SHAPE_TYPE);

/**
 * Defines the JavaScript generation for drawQuestionShape.
 * @type {!Function}
 */
Blockly.JavaScript['trivia_draw_question_shape'] =
    eventFuncJavascriptFactory_('drawQuestionShape', 'question', true);

/**
 * Block for defining drawAnswerShape event handler.
 * @type {{init: !Function}}
 */
Blockly.Blocks['trivia_draw_answer_shape'] =
    eventFuncBlockFactory_('drawAnswerShape', 'answer', FABRIC_SHAPE_TYPE);

/**
 * Defines the JavaScript generation for drawAnswerShape.
 * @type {!Function}
 */
Blockly.JavaScript['trivia_draw_answer_shape'] =
    eventFuncJavascriptFactory_('drawAnswerShape', 'answer', true);

/**
 * Block for defining onAnswerRight event handler.
 * @type {{init: !Function}}
 */
Blockly.Blocks['trivia_on_answer_right'] =
    eventFuncBlockFactory_('onAnswerRight', 'answer',);

/**
 * Defines the JavaScript generation for onAnswerRight.
 * @type {!Function}
 */
Blockly.JavaScript['trivia_on_answer_right'] =
    eventFuncJavascriptFactory_('onAnswerRight', 'answer', false);

/**
 * Block for defining onAnswerWrong event handler.
 * @type {{init: !Function}}
 */
Blockly.Blocks['trivia_on_answer_wrong'] =
    eventFuncBlockFactory_('onAnswerWrong', 'score',);

/**
 * Defines the JavaScript generation for onAnswerWrong.
 * @type {!Function}
 */
Blockly.JavaScript['trivia_on_answer_wrong'] =
    eventFuncJavascriptFactory_('onAnswerWrong', 'score', false);

/**
 * Block for getting score.
 * @this Blockly.Block
 */
Blockly.Blocks['get_score'] = {
  init: function() {
    this.jsonInit({
      'message0': '%1(%2)',
      'args0': ['getScore', ''],
      'output': 'Number',
      'colour': TRIVIA_BLOCK_HUE,
    });
  },
};

/**
 * Defines the JavaScript generation for getScore.
 * @param {Blockly.Block} block The block to generate code for.
 * @return {!Array.<string|number>} The generated code and order.
 */
Blockly.JavaScript['get_score'] = (block) => {
  return ['getScore()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/**
 * Block for updating score.
 * @this Blockly.Block
 */
Blockly.Blocks['update_score'] = {
  init: function() {
    this.jsonInit({
      'message0': '%1 %2',
      'args0': [
        {
          'type': 'field_dropdown',
          'name': 'OP',
          'options': [
            ['Add points to score', 'ADD'],
            ['Reduce points from score', 'MINUS'],
          ],
        },
        {
          'type': 'input_value',
          'name': 'DELTA',
          'check': 'Number',
        },
      ],
      'previousStatement': null,
      'nextStatement': null,
      'colour': TRIVIA_BLOCK_HUE,
    });
  },
};

/**
 * Defines the JavaScript generation for updating score.
 * @param {Blockly.Block} block The block to generate code for.
 * @return {string} The generated code.
 */
Blockly.JavaScript['update_score'] = (block) => {
  const operator = block.getFieldValue('OP');
  const order = operator == 'ADD' ? Blockly.JavaScript.ORDER_NONE :
      Blockly.JavaScript.ORDER_UNARY_NEGATION;
  const delta =
      Blockly.JavaScript.valueToCode(block, 'DELTA', order) || '0';
  let code = 'updateScore(';
  if (operator == 'MINUS') {
    code += '-';
  }
  code += delta + ');\n';
  return code;
};
