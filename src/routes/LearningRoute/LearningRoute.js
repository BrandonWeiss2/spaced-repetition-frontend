import React, { Component } from 'react'
import { Input, Label } from '../../components/Form/Form'
import LanguageApiService from '../../services/language-api-service'
import Button from '../../components/Button/Button'
import './LearningRoute.css'

class LearningRoute extends Component {
  state = {
    word: {},
    viewAnswer: false,
    answer: {},
    guess: ''
  }

  componentDidMount() {
    LanguageApiService.getWord()
      .then(res => {
        this.setState({
          word: res
        })
      })
  }

  handlePostAnswer = ev => {
    ev.preventDefault()
    const { guess } = ev.target
    LanguageApiService.postAnswer(guess.value)
      .then(res => {
        this.setState({
          guess: guess.value,
          viewAnswer: true,
          answer: res
        })
      })
  }

  hanldeContinue = () => {
    this.setState({
      viewAnswer: false,
    })
    LanguageApiService.getWord()
      .then(res => {
        this.setState({
          word: res
        })
      })
  }

  renderLearningSection = () => {
    const { word, answer } = this.state
    if (this.state.viewAnswer === false) {
      return (
      <section className='learningSection'>
        <div className='learningHeader'>
          <h2>Translate the word:</h2>
          {answer.nextWord &&
            <span className='nextWord'>{answer.nextWord}</span>
          }
          {!answer.nextWord &&
            <span className='nextWord'>{word.nextWord}</span>
          }
          {answer.totalScore &&
            <p>Your total score is: {answer.totalScore}</p>
          }
          {!answer.totalScore &&
            <p>Your total score is: {word.totalScore}</p>
          }
        </div>
        <main className='learningMain'>
          <form onSubmit={this.handlePostAnswer}>
            <Label htmlFor='learn-guess-input'>
              What's the translation for this word?
            </Label>
            <Input
              ref={this.firstInput}
              id='learn-guess-input'
              name='guess'
              required
            />
            <Button name='submit your answer' className='lear-guess-submit' type='submit'>
              Submit your answer
            </Button>
          </form>
          <div>
            <p>You have answered this word correctly {word.wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {word.wordIncorrectCount} times.</p>
          </div>
        </main>
      </section>
      )
    } else {
      const { answer } = this.state
      if (answer.isCorrect) {
        answer.isCorrect = 'You were correct! :D'
      } else {
        answer.isCorrect = 'Good try, but not quite right :('
      }
      return (
        <section className='learningSection'>
          <h2 className='learningHeader'>{answer.isCorrect}</h2>
          <main className='learningMain'>
            <div className='DisplayScore'>
              <p>Your total score is: {answer.totalScore}</p>
            </div>
            <div className='DisplayFeedback'>
              <p>The correct translation for {word.nextWord} was {answer.answer} and you chose {this.state.guess}!</p>
            </div>
            <div className='answerContent'>
              <span>Correct Count: {word.wordCorrectCount}</span>
              <span>Incorrect Count: {word.wordIncorrectCount}</span>
            </div>
            <div>
              <button onClick={this.hanldeContinue}>Try another word!</button>
            </div>
          </main>
        </section>
      )
    }
  }
  render() {
    return (
      <>
      {this.renderLearningSection()}
      </>
    );
  }
}

export default LearningRoute
