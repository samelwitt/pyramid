import React from 'react'
import AppStore from '../../AppStore'
import tick from '../../sfx/tick.mp3'
import theme from '../../sfx/theme.mp3'
import cuckoo from '../../sfx/cuckoo.mp3'
import buzzz from '../../sfx/buzzz.mp3'
import ding from '../../sfx/ding.mp3'
import dong from '../../sfx/dong.mp3'
import dick2 from '../../sfx/dick2.mp3'
import dick1 from '../../sfx/dick1.mp3'

const sounds = {
  tick: new Audio(tick),
  theme: new Audio(theme),
  cuckoo: new Audio(cuckoo),
  buzzz: new Audio(buzzz),
  ding: new Audio(ding),
  dong: new Audio(dong),
  dick2: new Audio(dick2),
  dick1: new Audio(dick1)
}


export default class SoundFX extends React.Component{

  state = {
    currentAnswer: AppStore.currentAnswer,
    mode: AppStore.mode,
    initiated: false
  }

  preload = () => {
    Object.keys(sounds).map((key,i,arr) => {
      sounds[key].preload = 'auto'
    })
  }

  onAnswer = () => {
    if (this.state.mode === 'winnersCircle') {
      sounds['dong'].load()
      this.play('dong')
    } else {
      sounds['ding'].load()
      this.play('ding')
    }
  }

  onNewTimer = () => {
    this.setState({
      mode: AppStore.mode,
      initiated: false
    }
  )}

  onToggleTimer = () => {

    if (!this.state.initiated) {
      if (this.state.mode === 'winnersCircle') {
        this.play('dick2')
      } else {
        this.play('dick1')
      }
      this.setState({
        initiated: true
      })
    }
  }

  onTick = () => {
    sounds['tick'].load()
    this.play('tick')
  }

  onFoul = () => {
    if (this.state.mode === 'winnersCircle') {
      this.play('buzzz')
    } else {
      this.play('cuckoo')
    }
  }

  onTimesUp = () => {
    this.play('buzzz')
  }

  onWin = () => {
    if (this.state.mode === 'winnersCircle') {
      this.resetAllSounds(()=>{
        this.play('theme')
      })
    }
  }

  resetAllSounds = (cb = ()=> false) => {
    Object.keys(sounds).map((key,i,arr) => {
      sounds[key].pause()
    })
    cb()
  }

  play = (which) => {
    sounds[which].play()
  }

  componentWillMount() {
    this.preload()
  }

  componentDidMount() {
    AppStore.addListener('newTimer', this.onNewTimer);
    AppStore.addListener('incrementScore', this.onAnswer);
    AppStore.addListener('foul', this.onFoul);
    AppStore.addListener('tick', this.onTick);
    AppStore.addListener('onWin', this.onWin);
    AppStore.addListener('clearTimer', this.resetAllSounds);
    AppStore.addListener('timesUp', this.onTimesUp);
    AppStore.addListener('playPauseTimer', this.onToggleTimer);
  }

  render() {
    return null
  }

}