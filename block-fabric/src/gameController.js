import { GameUi } from './gameUi';
import { GameInfo } from './gameInfo';

export class GameController {
  constructor(id) {
    this.gameUi = new GameUi(id);
    this.gameInfo = new GameInfo();
    this.gameUi.renderQuestion(this.gameInfo.getQuestion());
  }
}
