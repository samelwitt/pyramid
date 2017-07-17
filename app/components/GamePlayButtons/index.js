import React from 'react'
import {Button} from 'react-bootstrap'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'
import SoundFX from '../SoundFX'

export default class GamePlayButtons extends React.Component {

  state = {
    isTimerPlaying: AppStore.timerPlaying,
    disabled: this.props.disabled
  }

  togglePlay = () => {
    AppActions.playPauseTimer()
  }

  onRightAnswer = () => {
    AppActions.incrementScore()
  }

  onFoul = () => {
    AppActions.foul()
  }

  onClear = () => {
    AppActions.clearTimer()
  }

  handleTogglePlay = () => {
    this.setState({
      isTimerPlaying: AppStore.timerPlaying
    })
  }

  componentWillMount() {
    this.listeners = [
      AppStore.addListener('playPauseTimer', this.handleTogglePlay)
    ]
  }

  componentWillUnmount() {
    this.listeners.remove()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.timeRemaining !== this.props.timeRemaining) {
      this.setState({
        timeRemaining: newProps.timeRemaining
      })
    }
    if (newProps.isPlaying !== this.props.isPlaying) {
      this.setState({
        isPlaying: newProps.isPlaying
      }, this.tock)
    }
    if (newProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: newProps.disabled
      })
    }
  }

  render() {
    return(
      <div className="container game-play-buttons-wrap">
        <div className="row">
          <div className="col-xs-3">
            <Button onClick={this.togglePlay} bsStyle="primary" bsSize="large" disabled={this.state.disabled}>{this.state.isTimerPlaying ? 'Pause':'Start'} Clock</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onRightAnswer} bsStyle="primary" bsSize="large" disabled={this.state.disabled}>Right Answer</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onFoul} bsStyle="primary" bsSize="large" disabled={this.state.disabled}>Foul!</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onClear} bsStyle="primary" bsSize="large" disabled={this.state.disabled}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    )
  }
}




