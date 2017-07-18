import React from 'react'
import {Button} from 'react-bootstrap'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

export default class GamePlayButtons extends React.Component {

  state = {
    isTimerPlaying: AppStore.timerPlaying
  }

  togglePlay = () => {
    AppActions.toggleTimer()
  }

  onRightAnswer = () => {
    AppActions.rightAnswer()
  }

  onFoul = () => {
    AppActions.foul()
  }

  onCancel = () => {
    AppActions.cancelTimer()
  }

  handleTogglePlay = () => {
    this.setState({
      isTimerPlaying: AppStore.timerPlaying
    })
  }

  componentWillMount() {
    this.listeners = [
      AppStore.addListener('toggleTimer', this.handleTogglePlay)
    ]
  }

  componentWillUnmount() {
    this.listeners.forEach((listener, i, arr) => {
      listener.remove()
    })
  }

  componentWillReceiveProps() {
    //
  }

  render() {
    return(
      <div className="container game-play-buttons-wrap">
        <div className="row">
          <div className="col-xs-3">
            <Button onClick={this.togglePlay} bsStyle="primary" bsSize="large">{this.state.isTimerPlaying ? 'Pause':'Start/Resume'} Round</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onRightAnswer} bsStyle="primary" bsSize="large">Correct!</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onFoul} bsStyle="primary" bsSize="large">Foul!</Button>
          </div>
          <div className="col-xs-3">
            <Button onClick={this.onCancel} bsStyle="primary" bsSize="large">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
}




