/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Block test.
 */

import * as Blockly from 'blockly';
// import {createPlayground} from '@blockly/dev-tools';
import '../src/index';
import {GameController} from '../src/gameController';
import {GameUi} from '../src/gameUi';
import {GameInfo} from '../src/gameInfo';

// TODO: Edit list of blocks.
const allBlocks = [
  'block_template', 'trivia_draw_question_shape',
  'trivia_draw_answer_shape', 'place_holder_fabric_block',
  'place_holder_not_fabric_block', 'trivia_on_answer_right',
  'trivia_on_answer_wrong', 'get_score', 'update_score', 'math_number',
  'fabric_text', 'answer_text_var', 'text', 'colour_picker'];

let gameController;
let workspace;

document.addEventListener('DOMContentLoaded', function() {
  const defaultOptions = {
    toolbox: `<xml xmlns="https://developers.google.com/blockly/xml">
      ${allBlocks.map((b) => `<block type="${b}"></block>`)}
    </xml>`,
    renderer: 'zelos',
  };
  workspace = Blockly.inject(document.getElementById('editor'),
      defaultOptions);
  gameController = new GameController('gameplayCanvas');
});

document.getElementById('start').addEventListener('click', function() {
  gameController.newGame();
});

document.getElementById('toXml').addEventListener('click', () => {
  var code = Blockly['JavaScript'].workspaceToCode(workspace);
  eval(code);
});

