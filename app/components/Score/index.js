import React from 'react'

import './score.less'

export default class Score extends React.Component {

  state = {
    score: this.props.score,
    active: this.props.active,
    team: this.props.team
  }

  componentWillReceiveProps(newProps) {
    if (newProps.score !== this.props.score) {
      this.setState({
        score: newProps.score
      })
    }
    if (newProps.active !== this.props.active) {
      this.setState({
        active: newProps.active
      })
    }
    if (newProps.team !== this.props.team) {
      this.setState({
        team: newProps.team
      })
    }
  }

  render() {
    return (
      <div className={'score-wrap ' + (this.state.active ? 'active' : '')}>
        <div>{this.state.score}</div>
        <div className="score-caption">Team {this.state.team}</div>
      </div>
    );
  }
}
