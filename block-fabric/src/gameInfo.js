export class GameInfo {
  constructor() {
    this.reset();
  }

  reset() {
    this.questions = this.getQuestionList();
    this.score = 0;
    this.questionIndex = 0;
    this.activeQuestion = null;
  }

  getQuestionList() {
    return [new TriviaQuestion(), new TriviaQuestion()];
  }

  getQuestion() {
    this.activeQuestion = this.questions[this.questionIndex];
    this.questionIndex++;
    return this.activeQuestion;
  }

  handleAnswer(answer) {
    const correct = this.activeQuestion.checkAnswer(answer);
    if (correct) {
      this.score++;
    }
  }

  endGame() {
    console.log('You played ' + this.questionIndex + ' rounds');
    console.log('Your score was ' + this.score);
  }
}

export class TriviaQuestion {
  constructor() {
    this.questionText = '';
    this.answerOptions = [];
    this.correctAnswer = '';
  }

  checkAnswer(answer) {
    return answer == this.correctAnswer;
  }
}
