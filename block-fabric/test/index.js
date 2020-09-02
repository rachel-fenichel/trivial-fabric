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
import {GameUi} from '../src/gameUi';

// TODO: Edit list of blocks.
const allBlocks = [
  'block_template', 'trivia_draw_question_shape',
  'trivia_draw_answer_shape', 'place_holder_fabric_block',
  'place_holder_not_fabric_block', 'trivia_on_answer_right',
  'trivia_on_answer_wrong', 'get_score', 'update_score', 'math_number'];


document.addEventListener('DOMContentLoaded', function() {
  const defaultOptions = {
    toolbox: `<xml xmlns="https://developers.google.com/blockly/xml">
      ${allBlocks.map((b) => `<block type="${b}"></block>`)}
    </xml>`,
    renderer: 'zelos',
  };
  Blockly.inject(document.getElementById('editor'),
      defaultOptions);
  new GameUi('gameplayCanvas');
});
