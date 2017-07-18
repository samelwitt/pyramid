import React from 'react'
import Triangle from '../Triangle'
import AppStore from '../../AppStore'

import './winners-circle-score.less'

export default class WinnersCircleScore extends React.Component {

  state = {
    score: 0
  }

  setScore = () => {
    this.setState({
      score: AppStore.score.currentRound
    })
  }

  componentWillMount() {
    this.listeners = [
      AppStore.addListener('rightAnswer', this.setScore),
      AppStore.addListener('newGame', this.setScore)
    ]
  }

  componentWillUnmount() {
    this.listeners.forEach((listener, i, arr) => {
      listener.remove()
    })
  }

  render() {
    return (
      <div className="winners-circle-score-wrap container">
        <div className="row">
          <Triangle active={this.state.score > 5}>$50</Triangle>
        </div>
        <div className="row">
          <Triangle active={this.state.score > 3}>$50</Triangle>
          <Triangle active={this.state.score > 4}>$50</Triangle>
        </div>
        <div className="row">
          <Triangle active={this.state.score > 0}>$50</Triangle>
          <Triangle active={this.state.score > 1}>$50</Triangle>
          <Triangle active={this.state.score > 2}>$50</Triangle>
        </div>
      </div>
    );
  }
}
