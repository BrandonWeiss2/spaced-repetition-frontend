import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageApiService from '../../services/language-api-service'
import Words from './Words';
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  state = {
    language: {
      "id": null,
      "name": "",
      "user_id": null,
      "head": null,
      "total_score": null
    },
    words: [],
  }

  static contextType = UserContext;

  componentDidMount() {
    LanguageApiService.getLanguage()
      .then(res => {
        console.log(res)
        this.setState({
          language: res.language,
          words: res.words
        })
      })
  }

  renderWords = () => {
    const { words } = this.state
    return (
      words.map(word => {
        return(
          <Words 
            original={word.original}
            translation={word.translation}
            correct={word.correct_count}
            incorrect={word.incorrect_count}
          />
        )
      })
    )
  }

  render() {
    return (
      <div>
        <div className='dashboardInfo'>
          <h2>Your Choosen Language is {this.state.language.name}</h2>
          <span className='totalScore'>Total correct answers: {this.state.language.total_score}</span>
        </div>  
        <main className='dashboardBody'>
          <section>
            <h3>Words to practice</h3>
            <ul className='wordCardsContainer'>
              {this.renderWords()}
            </ul>
          </section>
          <section>
            <Link className='startLearningButton' to='/learn'>
              Start practicing
            </Link>
          </section>
        </main>
      </div>
    )
  }
}
