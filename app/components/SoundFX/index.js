import React from 'react'
import AppStore from '../../AppStore'
import tick from '../../sfx/tick.mp3'
import theme from '../../sfx/theme.mp3'
import cuckoo from '../../sfx/cuckoo.mp3'
import buzzz from '../../sfx/buzzz.mp3'
import ding from '../../sfx/ding.mp3'
import dong from '../../sfx/dong.mp3'

const sounds = {
  tick: new Audio(tick),
  theme: new Audio(theme),
  cuckoo: new Audio(cuckoo),
  buzzz: new Audio(buzzz),
  ding: new Audio(ding),
  dong: new Audio(dong)
}


export default class SoundFX extends React.Component{

  state = {
    currentAnswer: AppStore.getCurrentAnswer(),
    mode: AppStore.getMode()
  }

  preload = () => {
    Object.keys(sounds).map((key,i,arr) => {
      sounds[key].preload = 'auto'
    })
  }

  onAnswer = () => {
    if (this.state.mode === 'winnersCircle') {
      this.play('dong')
    } else {
      this.play('ding')
    }
  }

  onNewTimer = () => {
    this.setState({
      mode: AppStore.getMode()
    }
  )}

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
    AppStore.addListener('onAnswer', this.onAnswer);
    AppStore.addListener('foul', this.onFoul);
    AppStore.addListener('tick', this.onTick);
    AppStore.addListener('onWin', this.onWin);
    AppStore.addListener('clearTimer', this.resetAllSounds);
    AppStore.addListener('timesUp', this.onTimesUp);
  }

  render() {
    return null
  }

}