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
  'fabric_text', 'fabric_ellipse', 'fabric_rect', 'answer_text_var', 'text', 'colour_picker', 
  'create_game', 'trivia_answer', 'draw_canvas_item'];

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
  var startBlock = workspace.newBlock('start');
  startBlock.initSvg();
  startBlock.render();
  startBlock.setMovable(false);
  var createGameBlock = workspace.newBlock('create_game');
  createGameBlock.initSvg();
  createGameBlock.render();
  startBlock.nextConnection.connect(createGameBlock.previousConnection);
  gameController = new GameController('gameplayCanvas');
});

document.getElementById('start').addEventListener('click', function() {
  var startBlock = workspace.getBlocksByType('start')[0];
  var startCode = Blockly['JavaScript'].blockToCode(startBlock);

  eval(startCode);
});

document.getElementById('toXml').addEventListener('click', () => {
  var code = Blockly['JavaScript'].workspaceToCode(workspace);
  var blockCode = Blockly['JavaScript'].blockToCode(workspace.getBlocksByType('start')[0]);
  console.log(code);
});

