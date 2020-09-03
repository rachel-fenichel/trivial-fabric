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

  isGameOver() {
    return this.questionIndex >= this.questions.length
  }
}

export class TriviaQuestion {
  constructor() {
    this.questionText = 'Is this a hello world?';
    this.answerOptions =
      [
        new AnswerOption('Maybe', false),
        new AnswerOption('Definitely', true),
        new AnswerOption('Probably', false),
        new AnswerOption('Nope', false),
      ];
    this.correctAnswer = this.answerOptions[1];
  }

  checkAnswer(answer) {
    return answer == this.correctAnswer;
  }
}

export class AnswerOption {
  constructor(text, correct) {
    this.text = text;
    this.correct = correct;
  }
}
