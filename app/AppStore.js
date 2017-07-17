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
  currentPlayer = -1
  score = {
    total: [0,0],
    currentRound: 0
  }

  getCurrentPlayer() {
    //console.log('getCurrentPlayer')
    return this.currentPlayer
  }

  onWindowResize() {
    this.viewport = viewport()
    this.emit('windowResize')
  }
  newTimer(which) {
    this.initialTime = 0
    this.mode = which
    this.initialTime = which === 'firstRound' ? 30 : 60
    this.score.currentRound = 0
    this.emit('newTimer');
  }
  clearTimer() {
    this.initialTime = 0
    this.playPauseTimer({force: true})
    this.mode = 'home'
    this.currentAnswer = null
    this.onSetPlayer(-1)
    this.score.currentRound = 0
    this.emit('clearTimer');
  }
  onTimesUp() {
    this.clearTimer()
    this.emit('timesUp');
  }
  playPauseTimer(opts) {
    this.timerPlaying = opts.force ? false : !this.timerPlaying
    this.emit('playPauseTimer')
  }
  //onAnswer() {
  //  //this.currentAnswer = which
  //  this.emit('onAnswer')
  //}
  onFoul() {
    //this.currentAnswer = which
    this.emit('foul')
  }
  onWin() {
    this.timerPlaying = false
    if (this.mode !== 'winnersCircle') {
      this.clearTimer()
    }
    this.emit('onWin')
  }
  onTick() {
    this.emit('tick')
  }
  onIncrementScore() {
    //console.log('onIncrementScore')
    this.score.currentRound ++
    this.score.total[this.currentPlayer] ++
    this.emit('incrementScore')
  }
  onSetPlayer(i) {
    //console.log('app store onSetPlayer', i)
    this.currentPlayer = i
    this.emit('setPlayer')
  }
  onClearGame() {
    this.clearTimer()
    this.score.total = [0,0]
    this.emit('clearGame');
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
/*      case 'ON_ANSWER': {
        this.onAnswer();
        break;
      }*/
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
      case 'CLEAR_GAME': {
        this.onClearGame();
        break;
      }
      case 'INCREMENT_SCORE': {
        this.onIncrementScore()
        break;
      }
      case 'SET_PLAYER': {
        this.onSetPlayer(action.i)
        break;
      }
    }
  }

}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;