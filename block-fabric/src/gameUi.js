import { fabric } from 'fabric';
import { TEXT_ISEMPTY_HELPURL } from 'blockly/msg/en';

export class GameUi {
  constructor(id) {
    this.canvas = new fabric.Canvas(id);
    this.addRectangle();
    this.renderQuestion('Hello world?');
    this.renderAnswerOption('A', 'Maybe');
  }

  addRectangle() {
    this.canvas.add(new fabric.Rect({
      top: 100, left: 100, width: 60, height: 70, fill: 'plum'
    }));
  }

  renderQuestion(questionText) {
    const text = new fabric.Text(questionText, { left: 100, top: 100 });
    this.canvas.add(text);
  }

  renderAnswerOption(optionId, optionText) {
    const text = new fabric.Text(optionId + ': ' +  optionText, { left: 100, top: 125 });
    this.canvas.add(text);
  }
}
