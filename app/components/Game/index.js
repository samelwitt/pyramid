import React from 'react'
import Timer from '../Timer'
import GamePlayButtons from '../GamePlayButtons'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

export default class Game extends React.Component {

  state = {
    initialTime: AppStore.getInitialTime(),
    disabled: this.props.disabled,
    isTimerPlaying: AppStore.isTimerPlaying()
  }

  handleTogglePlay = () => {
    this.setState({
      isTimerPlaying: AppStore.isTimerPlaying()
    })
  }

  onComplete = () => {
    AppActions.timesUp()
  }

  componentWillMount() {
    AppStore.addListener('playPauseTimer', this.handleTogglePlay)
    AppStore.addListener('clearTimer', this.handleTogglePlay)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: newProps.disabled,
        initialTime: AppStore.getInitialTime()
      })
    }
  }

  render() {
    return (
      <div className="container game-wrap">
        <div className="row">
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