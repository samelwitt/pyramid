import React from 'react'
import Timer from '../Timer'
import GamePlayButtons from '../GamePlayButtons'
import Score from '../Score'
import WinnersCircleScore from '../WinnersCircleScore'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

import './game.less'

export default class Game extends React.Component {

  state = {
    initialTime: AppStore.initialTime,
    disabled: this.props.disabled,
    isTimerPlaying: AppStore.timerPlaying,
    score: AppStore.score,
    currentPlayer: AppStore.currentPlayer,
    mode: AppStore.mode
  }

  handleTogglePlay = () => {
    this.setState({
      isTimerPlaying: AppStore.timerPlaying
    })
  }

  onComplete = () => {
    AppActions.timesUp()
  }

  getScore = () => {
    this.setState({
      score : AppStore.score
    }, this.handleScore)
  }

  getCurrentPlayer = () => {
    this.setState({
      currentPlayer : AppStore.currentPlayer
    })
  }

  getMode = () => {
    this.setState({
      mode: AppStore.mode
    })
  }

  handleScore = () => {
    if (this.state.mode === 'winnersCircle' && this.state.score.currentRound === 6) {
      AppActions.onWin()
    }
    else if (this.state.score.currentRound === 7) {
      setTimeout(AppActions.onWin, 1000)
    }
  }



  componentWillMount() {
    this.listeners = [
      AppStore.addListener('newTimer', this.getMode),
      AppStore.addListener('playPauseTimer', this.handleTogglePlay),
      AppStore.addListener('clearTimer', this.handleTogglePlay),
      AppStore.addListener('onWin', this.handleTogglePlay),
      AppStore.addListener('incrementScore', this.getScore),
      AppStore.addListener('timesUp', this.getScore),
      AppStore.addListener('setPlayer', this.getCurrentPlayer)
    ]
  }

  componentWillUnmount() {
    this.listeners.remove()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: newProps.disabled,
        initialTime: AppStore.initialTime
      })
    }
    if (newProps.mode !== this.props.mode) {
      this.setState({
        mode: newProps.mode
      })
    }
  }

  render() {
    return (
      <div className="container game-wrap">
        {this.state.mode !== 'winnersCircle' &&

          <div className="row">
            <div className="col-xs-6">
              <Score score={this.state.score.total[0]} team="1" active={this.state.currentPlayer === 0} />
            </div>
            <div className="col-xs-6">
              <Score score={this.state.score.total[1]} team="2" active={this.state.currentPlayer === 1} />
            </div>
          </div>

        }
        {this.state.mode === 'winnersCircle' &&
          <WinnersCircleScore score={this.state.score.currentRound} />
        }
        <div className="row timer-row">
          <div className="col-md-12">
            <div className="timer-wrap">
              <Timer timeRemaining={this.state.initialTime} isPlaying={this.state.isTimerPlaying} completeCallback={this.onComplete} />
            </div>
          </div>
        </div>
        <div className="row">
          <GamePlayButtons disabled={this.state.disabled} />
        </div>
      </div>

    );
  }
}