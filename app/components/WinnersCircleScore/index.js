import React from 'react'
import Triangle from '../Triangle'

import './winners-circle-score.less'

export default class WinnersCircleScore extends React.Component {

  state = {
    score: this.props.score
  }

  componentWillReceiveProps(newProps) {
    if (newProps.score !== this.props.score) {
      this.setState({
        score: newProps.score
      }, () => {
        if (this.state.score === 6) {

        }
      })
    }
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
