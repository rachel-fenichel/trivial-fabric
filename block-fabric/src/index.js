/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: Edit block overview.
/**
 * @fileoverview Block overview.
 */

import './blocks/trivia.js';
import './blocks/fabric_blocks.js';

import Blockly from 'blockly/core';
import {FABRIC_SHAPE_TYPE} from './blocks/fabric_blocks';

// TODO: Update block definition.
Blockly.defineBlocksWithJsonArray([
  {
    'type': 'block_template',
    'message0': 'block template',
    'style': 'math_blocks',
  },
  {
    'type': 'place_holder_not_fabric_block',
    'message0': 'Not a FabricShape',
    'output': 'not' + FABRIC_SHAPE_TYPE,
    'colour': '#aaaaaa',
  },
]);

/**
 * Defines the JavaScript generation for place_holder_not_fabric_block.
 * @type {!Function}
 */
Blockly.JavaScript['place_holder_not_fabric_block'] = () => {
  return ['nor fabric block', Blockly.JavaScript.ORDER_ATOMIC];
};
