import { EventEmitter } from "fbemitter"
import dispatcher from "./AppDispatcher"

class AppStore extends EventEmitter {

  mode = 'home'
  timerPlaying = false
  initialTime = 0
  currentPlayer = -1
  score = {
    total: [0,0],
    currentRound: 0,
    goal: 0
  }

  handleActions(action) {
    switch (action.type) {

      case 'NEW_GAME': {
        this.initialTime = 0
        this.handleToggleTimer({stop: true})
        this.mode = 'home'
        this.currentPlayer = -1
        this.score.currentRound = 0
        this.score.total = [0,0]
        this.score.goal = 0
        this.emit('newGame');
        break;
      }

      case 'NEW_TIMER': {
        //this.handleToggleTimer({stop: true})
        this.mode = action.which
        this.currentPlayer = action.who
        this.initialTime = action.which === 'firstRound' ? 30 : 60
        this.score.goal = action.which === 'firstRound' ? 7 : 6
        this.score.currentRound = 0
        this.emit('newTimer')
        break;
      }

      case 'TOGGLE_TIMER': {
        this.handleToggleTimer(action.opts)
        break;
      }

      case 'RIGHT_ANSWER': {
        this.score.currentRound ++
        this.score.total[this.currentPlayer] ++
        this.emit('rightAnswer')
        if (this.score.currentRound === this.score.goal) {
          this.handleToggleTimer({stop: true})
          this.currentPlayer = -1
          if (this.mode !== 'winnersCircle') {
            setTimeout(( ) => {
              this.mode = 'home'
              this.emit('win')
            }, 2000)
          } else {
            this.emit('win')
          }
        }
        break;
      }

      case 'FOUL': {
        this.emit('foul')
        break;
      }

      case 'CANCEL_TIMER': {
        this.handleToggleTimer({stop: true})
        this.currentPlayer = -1
        this.mode = 'home'
        this.emit('cancelTimer')
        break;
      }

      case 'TICK': {
        this.emit('tick')
        break;
      }

      case 'TIMES_UP': {
        this.handleToggleTimer({stop: true})
        this.currentPlayer = -1
        this.mode = 'home'
        this.emit('timesUp');
        break;
      }

      case 'TOGGLE_THEME': {
        this.emit('toggleTheme');
        break;
      }
    }
  }

  handleToggleTimer = (opts = {}) => {
    if (opts.start) {
      this.timerPlaying = true
    } else if (opts.stop) {
      this.timerPlaying = false
    } else {
      this.timerPlaying = !this.timerPlaying
    }
    this.emit('toggleTimer')
  }

}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;