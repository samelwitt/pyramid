import { EventEmitter } from "fbemitter"
import dispatcher from "./AppDispatcher"
import { viewport } from './helpers/utils'
//import firstRoundData from './data/first-round-data.json'
//import winnersCircleData from './data/winners-circle-data.json'

class AppStore extends EventEmitter {

  mode = 'home'
  initialTime = 0
  timerPlaying = false
  currentAnswer = null

  getMode() {
    return this.mode
  }
  getInitialTime() {
    return this.initialTime
  }
  isTimerPlaying() {
    return this.timerPlaying
  }
  getCurrentAnswer() {
    return this.currentAnswer
  }

  onWindowResize() {
    this.viewport = viewport()
    this.emit('windowResize')
  }
  newTimer(which) {
    this.mode = which
    this.initialTime = which === 'firstRound' ? 30 : 60
    this.emit('newTimer');
  }
  clearTimer() {
    this.initialTime = 0
    this.timerPlaying = false
    this.mode = 'home'
    this.emit('clearTimer');
  }
  onTimesUp() {
    this.emit('timesUp');
  }
  playPauseTimer(opts) {
    this.timerPlaying = opts.force ? false : !this.timerPlaying
    this.emit('playPauseTimer')
  }
  onAnswer() {
    //this.currentAnswer = which
    this.emit('onAnswer')
  }
  onFoul() {
    //this.currentAnswer = which
    this.emit('foul')
  }
  onWin() {
    this.emit('onWin')
  }
  onTick() {
    this.emit('tick')
  }

  handleActions(action) {
    switch (action.type) {
      case 'ON_WINDOW_RESIZE': {
        this.onWindowResize();
        break;
      }
      case 'NEW_TIMER': {
        this.newTimer(action.which);
        break;
      }
      case 'CLEAR_TIMER': {
        this.clearTimer();
        break;
      }
      case 'PLAY_PAUSE_TIMER': {
        this.playPauseTimer(action.opts);
        break;
      }
      case 'ON_ANSWER': {
        this.onAnswer();
        break;
      }
      case 'FOUL': {
        this.onFoul();
        break;
      }
      case 'ON_WIN': {
        this.onWin();
        break;
      }
      case 'ON_TICK': {
        this.onTick();
        break;
      }
      case 'TIMES_UP': {
        this.onTimesUp();
        break;
      }
    }
  }

}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;