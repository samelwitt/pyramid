import React from 'react'
import AppStore from '../../AppStore'

import './score.less'

export default class Score extends React.Component {

  state = {
    score: 0,
    active: this.props.active,
    player: this.props.player
  };

  setScore = () => {
    if (this.state.active) {
      this.setState({
        score: AppStore.score.total[this.state.player -1]
      })
    }
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

  componentWillReceiveProps(newProps) {
    if (newProps.active !== this.props.active) {
      this.setState({
        active: newProps.active
      })
    }
    if (newProps.active !== this.props.active) {
      this.setState({
        active: newProps.active
      })
    }
  }

  render() {
    return (
      <div className={'score-wrap ' + (this.state.active ? 'active' : '')}>
        <div>{this.state.score}</div>
        <div className="score-caption">Team {this.state.player}</div>
      </div>
    );
  }
}
