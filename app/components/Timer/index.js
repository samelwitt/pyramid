import React from 'react';
import AppStore from '../../AppStore'
import * as AppActions from '../../AppActions'

import './timer.less'

const roundDelay = 1000
const winnersCircleDelay = 2000

export default class Timer extends React.Component{

  state = {
    timeRemaining: 0,
    isPlaying: false,
    mode: null,
    started: false
  }

  countdown = false

  initTimer = () => {
    this.setState({
      timeRemaining: AppStore.initialTime,
      mode: AppStore.mode,
      started: false
    }, () => {
      this.countdown = false
    })
  }

  setPlayStatus = () => {
    this.setState({
      isPlaying: AppStore.timerPlaying
    }, () => {
      if (this.state.isPlaying && !this.state.started) {
        this.startTimer()
      } else {
        this.decrement()
      }
    })
  }

  startTimer = () => {
    let delay
    if (this.state.mode === 'winnersCircle') {
      delay = winnersCircleDelay
    } else {
      delay = roundDelay
    }
    this.setState({
      started: true
    }, () => {
      setTimeout(this.startCountDown, delay)
    })
  }

  startCountDown = () => {
    this.countdown = setInterval(()=>{
      this.decrement()
    },1000)
  }

  decrement = () => {
    if (this.state.isPlaying) {
      this.setState({
        timeRemaining: this.state.timeRemaining - 1
      })
      if (this.state.timeRemaining < 1) {
        clearInterval(this.countdown)
        AppActions.timesUp()
      }
      else if (this.state.mode === 'winnersCircle') {
        AppActions.tick()
      }
    }
  }

  clearTimer = () => {
    clearInterval(this.countdown)
  }

  componentWillMount() {
    this.listeners = [
      AppStore.addListener('newTimer', this.initTimer),
      AppStore.addListener('toggleTimer', this.setPlayStatus),
      AppStore.addListener('cancelTimer', this.clearTimer)
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
    return (
      <h1 className='timer'>
        {this.state.timeRemaining}
      </h1>
    )
  }
};
