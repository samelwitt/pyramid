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
    isTimerPlaying: AppStore.timerPlaying,
    score: AppStore.score,
    currentPlayer: AppStore.currentPlayer,
    mode: AppStore.mode
  }

  setMode = () => {
    this.setState({
      mode: AppStore.mode
    })
  }

  setPlayer = () => {
    this.setState({
      currentPlayer: AppStore.currentPlayer
    })
  }

  componentWillMount() {
    this.listeners = [
      AppStore.addListener('newGame', this.setMode),
      AppStore.addListener('newTimer', () => {
        this.setMode()
        this.setPlayer()
      }),
      AppStore.addListener('cancelTimer', this.setMode),
      AppStore.addListener('timesUp', this.setMode),
      AppStore.addListener('win', () => {
        if (this.state.mode !== 'winnersCircle') {
          this.setMode()
        }
      })
    ]
  }

  componentWillUnmount() {
    this.listeners.forEach((listener, i, arr) => {
      listener.remove()
    })
  }

  render() {
    return (
      <div className="container game-wrap">
        {this.state.mode !== 'winnersCircle' &&
          <div className="row">
            <div className="col-xs-6">
              <Score player="1" active={this.state.currentPlayer === 0} />
            </div>
            <div className="col-xs-6">
              <Score player="2" active={this.state.currentPlayer === 1} />
            </div>
          </div>
        }
        {this.state.mode === 'winnersCircle' &&
          <WinnersCircleScore />
        }
        <div className="row timer-row">
          <div className="col-md-12">
            <div className="timer-wrap">
              <Timer />
            </div>
          </div>
        </div>
        <div className="row">
          <GamePlayButtons />
        </div>
      </div>

    );
  }
}