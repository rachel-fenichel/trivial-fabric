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
]);

/**
 * Defines the JavaScript generation for place_holder_fabric_block.
 * @type {!Function}
 */
Blockly.JavaScript['place_holder_fabric_block'] = () => {
  return ['fabric block', Blockly.JavaScript.ORDER_ATOMIC];
};

