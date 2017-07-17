import React from 'react';
import SoundFX from '../SoundFX'
import AppStore from '../../AppStore'
import * as AppActions from '../../AppActions'

import './timer.less'

let countdown,
  roundDelay = 1000,
  winnersCircleDelay = 2000

export default class Timer extends React.Component{

  static propTypes = {
    timeRemaining: React.PropTypes.number.isRequired,
    tickCallback: React.PropTypes.func,
    completeCallback: React.PropTypes.func,
    isPlaying: React.PropTypes.bool
  }

  static defaultProps = () =>{
    return {
      timeRemaining: 0,
      tickCallback: () => false,
      completeCallback: () => false,
      isPlaying: false
    }
  }

  state = {
    timeRemaining: this.props.timeRemaining,
    isPlaying: this.props.isPlaying,
    mode: null
  }

  countdown = false
  roundDelay = 1000
  winnersCircleDelay = 2000

  decrement = () => {
    if (this.state.isPlaying) {
      this.setState({
        timeRemaining: this.state.timeRemaining - 1
      })
      if (this.state.timeRemaining < 1) {
        clearInterval(this.countdown)
        this.props.completeCallback()
      }
      else if (this.state.mode === 'winnersCircle') {
        AppActions.onTick()
      }
    }
  }

  reset = () => {
    clearInterval(this.countdown)
    this.countdown = false
  }

  componentWillMount() {
    this.listeners = [
      AppStore.addListener('clearTimer', this.reset)
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
  }

  startCountDown = () => {
    this.countdown = setInterval(()=>{
      this.decrement()
    },1000)
  }

  tock = () =>{
    if (!this.countdown && this.state.isPlaying) {
      let delay
      this.setState({
        mode: AppStore.mode
      })
      if (AppStore.mode === 'winnersCircle') {
        delay = this.winnersCircleDelay
      } else {
        delay = this.roundDelay
      }
      setTimeout(this.startCountDown, delay)
    }

  }

  render() {
    return (
      <h1 className='timer'>
        {this.state.timeRemaining}
      </h1>
    )
  }
};
