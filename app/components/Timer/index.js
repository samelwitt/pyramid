import React from 'react';
import SoundFX from '../SoundFX'
import AppStore from '../../AppStore'
import * as AppActions from '../../AppActions'

import './timer.less'

let countdown

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

  decrement = () => {
    if (this.state.isPlaying) {
      this.setState({
        timeRemaining: this.state.timeRemaining - 1
      })
      if (this.state.timeRemaining < 1) {
        clearInterval(countdown)
        this.props.completeCallback()
      }
      else if (this.state.mode === 'winnersCircle') {
        AppActions.onTick()
      }
    }
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

  tock() {
    if (!countdown) {
      this.setState({
        mode: AppStore.getMode()
      })
      countdown = setInterval(()=>{
        this.decrement()
      },1000)
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
