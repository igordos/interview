import React, { PureComponent } from 'react';
import Question from './Question';

import POLL_DATA from '../../../../etc/poll-data.json';

function findQuestionById(id) {
  return POLL_DATA.questions.filter(question => question.id === id)[0];
}

function getFirstQuestion() {
  const questions = POLL_DATA.questions || [];
  const firstQuestion = questions.filter(question => question.start === true)[0] || questions[0];
  return firstQuestion;
}

function getNextQuestion(currentQuestion, value) {
  if (currentQuestion.next) {
    return findQuestionById(currentQuestion.next);
  }
  if (currentQuestion.input === 'router') {
    const routerVariant = currentQuestion.variants.filter(variant => value.indexOf(variant.value) > -1)[0];
    if (routerVariant !== undefined) {
      return findQuestionById(routerVariant.next);
    }

  }
}

class Poll extends PureComponent {
  state = {
    currentQuestion: getFirstQuestion(),
    finish: false,
    answers: [],
  };

  isQuestionValid(value) {
    const validates = this.state.currentQuestion.validates;

    if (validates === undefined) {
      return true;
    }

    const presence = validates.presence;

    if (presence && !value.length ) {
      window.alert('Укажите вариант ответа');
      return false;
    }

    const numericality = validates.numericality;

    if (
      numericality &&
      (parseInt(value) < numericality.min || parseInt(value) > numericality.max)
    ) {
      window.alert(`Укажите диапазон от ${numericality.min} до ${numericality.max}`);
      return false;
    }

    return true;
  }

  handelNextQuestion = () => {
    const value = this.question.getValue();

    if (!this.isQuestionValid(value)) {
      return null;
    }

    const answers = this.state.answers;

    answers.push({
      id: this.state.currentQuestion.id,
      value,
    });

    const finish = this.state.currentQuestion.finish === true;

    const currentQuestion = getNextQuestion(this.state.currentQuestion, value);

    this.setState({ currentQuestion, answers, finish });
  };

  render() {
    return (
      <div className="poll">
        {
          this.state.finish ?
            this.renderResults()
            :
            this.renderQuestion()
        }
      </div>
    );
  }

  renderQuestion() {
    const question = this.state.currentQuestion;

    if (this.state.finish) {
      return <div key="notFound">Вопросов нет</div>
    }

    return (
      <div className="poll__question" key="question">
        <Question
          key={question.id}
          ref={(question) => this.question = question}
          id={question.id}
          input={question.input}
          title={question.title}
          description={question.description}
          value={question.value}
          datatype={question.datatype}
          variants={question.variants}
          min={question.min}
          max={question.max}
        />
        <button className="poll__next-btn" onClick={this.handelNextQuestion}>Следующий вопрос</button>
      </div>
    );
  }

  renderResults() {
    console.log(JSON.stringify({
      user: '',
      date: new Date(),
      answer: this.state.answers,
    }, null, "\t"));
    return (<div className="poll__results">
      Спасибо за ответы.
    </div>);
  }
}

export default Poll;
