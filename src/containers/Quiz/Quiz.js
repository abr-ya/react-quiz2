import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

// проверяем импорт классов
//console.log(classes);

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета трава?',
                rightAnswerId: 3,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Зелёный', id: 3},
                    {text: 'Красный', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Зелёный', id: 3},
                    {text: 'Красный', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId, this.state.activeQuestion, this.isQuizFinished());

        // избегаем накручивания повторным кликом по правильному ответу во вреия таймаута
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        // текущий вопрос
        const question = this.state.quiz[this.state.activeQuestion];

        // если ответ правильный
        if(question.rightAnswerId === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })

            // ждём секунду, чтобы увидеть результат
            const timeout = window.setTimeout(() => {
                // последний вопрос?
                if (this.isQuizFinished()) {
                    console.log('Вопросы кончились!')

                    
                } else {
                    // переключение на следующий вопрос
                    console.log('Переключаем!')
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null // сбрасываем подсветку варианта
                    })                   
                   
                }

                window.clearTimeout(timeout);
            }, 1000)

        // неправильный ответ
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Заголовок теста!!!</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        );
    }
}

export default Quiz;
