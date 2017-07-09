import React from 'react'
import {Button} from 'react-bootstrap'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'
import SoundFX from '../SoundFX'

export default class GamePlayButtons extends React.Component {

  state = {
    isTimerPlaying: AppStore.isTimerPlaying(),
    disabled: this.props.disabled
  }

  togglePlay = () => {
    AppActions.playPauseTimer()
  }

  onRightAnswer = () => {
    AppActions.onAnswer()
  }

  onFoul = () => {
    AppActions.foul()
  }

  onWin = () => {
    AppActions.playPauseTimer({force: true})
    AppActions.onWin()
  }

  onClear = () => {
    AppActions.clearTimer()
  }

  handleTogglePlay = () => {
    this.setState({
      isTimerPlaying: AppStore.isTimerPlaying()
    })
  }

  componentWillMount() {
    AppStore.addListener('playPauseTimer', this.handleTogglePlay);
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
            <Button onClick={this.onRightAnswer} bsStyle="info" bsSize="large" disabled={this.state.disabled}>Right Answer</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onFoul} bsStyle="danger" bsSize="large" disabled={this.state.disabled}>Foul!</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onWin} bsStyle="success" bsSize="large" disabled={this.state.disabled}>Win!</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Button onClick={this.onClear} bsStyle="warning" bsSize="large" disabled={this.state.disabled}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    )
  }
}




