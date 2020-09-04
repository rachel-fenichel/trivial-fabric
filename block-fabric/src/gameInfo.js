export class GameInfo {
  constructor(apiUrl) {
    this.apiUrl = "https://opentdb.com/api.php?amount=10";
  }

  setUrl(apiUrl) {
    if (apiUrl) {
      this.apiUrl = apiUrl;
    }
  }

  async reset() {
    this.questions = await this.getQuestionList();
    this.score = 0;
    this.questionIndex = 0;
    this.activeQuestion = null;
  }

  async getQuestionList(api_url) {
    const resp = await fetch(this.apiUrl);
    const jsonData = await resp.json();
    const questions = jsonData.results;
    const parsedQuestions = this.parseQuestions(questions);
    return parsedQuestions;
  }

  parseQuestions(questions) {
    var parsedQuestions = [];
    questions.forEach((element, index) => {
      parsedQuestions.push(new TriviaQuestion(element));
    });
    return parsedQuestions;
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
  constructor(questionData) {
    this.questionText = questionData.question;

    const answerOptions = [];
    questionData.incorrect_answers.forEach((incorrect_answer) => {
      answerOptions.push(new AnswerOption(incorrect_answer, false));
    });
    var correct_answer = new AnswerOption(questionData.correct_answer, true)
    answerOptions.push(correct_answer);

    this.answerOptions = answerOptions;
    this.correctAnswer = correct_answer;
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
