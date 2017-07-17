import dispatcher from "./AppDispatcher";

export function newTimer(which, who) {
  dispatcher.dispatch({
    type: 'NEW_TIMER',
    which,
    who
  });
}
export function cancelTimer() {
  dispatcher.dispatch({
    type: 'CANCEL_TIMER'
  });
}
export function toggleTimer(opts) {
  dispatcher.dispatch({
    type: 'TOGGLE_TIMER',
    opts
  });
}
export function foul() {
  dispatcher.dispatch({
    type: 'FOUL'
  });
}
export function tick() {
  dispatcher.dispatch({
    type: 'TICK'
  });
}
export function timesUp() {
  dispatcher.dispatch({
    type: 'TIMES_UP'
  });
}
export function newGame() {
  dispatcher.dispatch({
    type: 'NEW_GAME'
  });
}
export function rightAnswer() {
  dispatcher.dispatch({
    type: 'RIGHT_ANSWER'
  });
}