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

  onRightAnswer = () => {
    if (this.state.mode === 'winnersCircle') {
      sounds['dong'].load()
      this.play('dong')
    } else {
      sounds['ding'].load()
      this.play('ding')
    }
  }

  onNewTimer = () => {
    this.resetAllSounds()
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
    this.resetAllSounds()
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
      sounds[key].currentTime = 0
    })
    cb()
  }

  toggleTheme = () => {
    if (sounds.theme.paused) {
      sounds.theme.play()
    }
    else {
      sounds.theme.pause()
      sounds.theme.currentTime = 0
    }
  }

  play = (which) => {
    sounds[which].play()
  }

  componentWillMount() {
    this.preload()
    this.listeners = [
      AppStore.addListener('rightAnswer', this.onRightAnswer),
      AppStore.addListener('win', this.onWin),
      AppStore.addListener('foul', this.onFoul),
      AppStore.addListener('tick', this.onTick),
      AppStore.addListener('toggleTimer', this.onToggleTimer),
      AppStore.addListener('timesUp', this.onTimesUp),
      AppStore.addListener('newTimer', this.onNewTimer),
      AppStore.addListener('cancelTimer', this.resetAllSounds),
      AppStore.addListener('toggleTheme', this.toggleTheme)
    ]
  }

  componentDidMount() {
    console.log(sounds.theme.paused)
  }

  componentWillUnmount() {
    this.listeners.forEach((listener, i, arr) => {
      listener.remove()
    })
  }

  render() {
    return null
  }

}