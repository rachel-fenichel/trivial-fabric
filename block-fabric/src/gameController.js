import { GameUi } from './gameUi';
import { GameInfo } from './gameInfo';

export class GameController {
  constructor(id, apiUrl) {
    this.gameUi = new GameUi(id, this.nextTurn.bind(this));
    this.gameInfo = new GameInfo(apiUrl);
  }
  newGame(url) {
    this.gameInfo.setUrl(url);
    this.gameInfo.reset();
    this.firstTurn();
  }
  async firstTurn() {
    await this.gameInfo.reset();
    this.gameUi.resetCanvas();
    this.gameUi.renderQuestion(this.gameInfo.getQuestion());
    this.gameUi.renderScore(this.gameInfo.score);
  }
  nextTurn() {
    this.gameInfo.handleAnswer(this.gameInfo.activeQuestion.answerOptions[1]);
    if (this.gameInfo.isGameOver()) {
      this.gameUi.renderGameOver();
    } else {
      this.gameUi.resetCanvas();
      this.gameUi.renderQuestion(this.gameInfo.getQuestion());
      this.gameUi.renderScore(this.gameInfo.score);
    }
  }
}
