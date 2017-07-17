import dispatcher from "./AppDispatcher";

export function onWindowResize() {
  dispatcher.dispatch({
    type: 'ON_WINDOW_RESIZE',
  });
}
export function newTimer(which) {
  dispatcher.dispatch({
    type: 'NEW_TIMER',
    which
  });
}
export function clearTimer() {
  dispatcher.dispatch({
    type: 'CLEAR_TIMER'
  });
}
export function playPauseTimer(opts = {force: false}) {
  dispatcher.dispatch({
    type: 'PLAY_PAUSE_TIMER',
    opts
  });
}
/*export function onAnswer() {
  dispatcher.dispatch({
    type: 'ON_ANSWER'
  });
}*/
export function foul() {
  dispatcher.dispatch({
    type: 'FOUL'
  });
}
export function onWin() {
  dispatcher.dispatch({
    type: 'ON_WIN'
  });
}
export function onTick() {
  dispatcher.dispatch({
    type: 'ON_TICK'
  });
}
export function timesUp() {
  dispatcher.dispatch({
    type: 'TIMES_UP'
  });
}
export function clearGame() {
  dispatcher.dispatch({
    type: 'CLEAR_GAME'
  });
}
export function incrementScore() {
  dispatcher.dispatch({
    type: 'INCREMENT_SCORE'
  });
}
export function setPlayer(i) {
  dispatcher.dispatch({
    type: 'SET_PLAYER',
    i
  });
}