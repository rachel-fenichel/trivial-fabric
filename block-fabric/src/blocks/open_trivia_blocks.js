/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Fabric blocks.
 */

import Blockly from 'blockly/core';

Blockly.defineBlocksWithJsonArray([
  {
  "type": "create_game",
  "message0": "Create Game %1 Num Questions:  %2 %3 %4 %5 %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NUM_QUESTION",
      "text": "10"
    },
    {
      "type": "field_dropdown",
      "name": "CATEGORY_TYPE",
      "options": [
        [
          "Any Category",
          "any"
        ],
        [
          "General Knowledge",
          "9"
        ],
        [
          "Entertainment: Books",
          "10"
        ],
        [
          "Entertainment: Film",
          "11"
        ],
        [
          "Entertainment: Music",
          "12"
        ],
        [
          "Entertainment: Musicals & Theatres",
          "13"
        ],
        [
          "Entertainment: Television",
          "14"
        ],
        [
          "Entertainment: Video Games",
          "15"
        ],
        [
          "Entertainment: Board Games",
          "16"
        ],
        [
          "Science & Nature",
          "17"
        ],
        [
          "Science: Computers",
          "18"
        ],
        [
          "Science: Mathematics",
          "19"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "DIFFICULTY_LEVEL",
      "options": [
        [
          "Any Difficulty",
          "any"
        ],
        [
          "Easy",
          "easy"
        ],
        [
          "Medium",
          "medium"
        ],
        [
          "Hard",
          "hard"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "QUESTION_TYPE",
      "options": [
        [
          "Any Type",
          "any"
        ],
        [
          "Multiple Choice",
          "multipe"
        ],
        [
          "True/False",
          "boolean"
        ]
      ]
    },
    {
      "type": "input_dummy"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "start",
  "message0": "On Start",
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);

 Blockly.JavaScript['create_game'] = function(block) {
  const text_num_question = block.getFieldValue('NUM_QUESTION');
  const dropdown_category_type = block.getFieldValue('CATEGORY_TYPE');
  const dropdown_difficulty_level = block.getFieldValue('DIFFICULTY_LEVEL');
  const dropdown_question_type = block.getFieldValue('QUESTION_TYPE');

  const values = [dropdown_category_type, dropdown_difficulty_level, dropdown_question_type];

  let api_url = `https://opentdb.com/api.php?amount=${text_num_question}`;

  if (dropdown_category_type != 'any') {
    api_url += `&category=${dropdown_category_type}`;
  }

  if (dropdown_difficulty_level != 'any') {
    api_url += `&difficulty=${dropdown_difficulty_level}`;
  }

  if (dropdown_question_type != 'any') {
    api_url += `&type=${dropdown_question_type}`;
  }
  var code = `gameController.newGame("${api_url}")`;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.JavaScript['start'] = function(block) {
  return '';
};

