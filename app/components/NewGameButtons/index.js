import React from 'react'
import {Button} from 'react-bootstrap'
import Timer from '../Timer'
import Triangle from '../Triangle'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

import './newGameButtons.less'
import logoSm from '../../img/logo-sm.png'

export default class NewGameButtons extends React.Component {

  state = {
    disabled: this.props.disabled
  }

  newFirstRound = [
    () => {
      AppActions.setPlayer(0)
      AppActions.newTimer('firstRound')
    },
    () => {
      AppActions.setPlayer(1)
      AppActions.newTimer('firstRound')
    }
  ]

  newWinnersCircle = () => {
    AppActions.newTimer('winnersCircle')
  }

  newGame = () => {
    AppActions.clearGame()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: newProps.disabled
      })
    }
  }

  render() {
    return(
      <div className={this.state.disabled ? 'container new-game-buttons-wrap disabled' : 'container new-game-buttons-wrap'}>
        <div className="inner">
          <img className="logo" src={logoSm} alt=""/>
          <div className="row">
            <div className="col-xs-6">
              <Button onClick={this.newFirstRound[0]} bsStyle="primary" bsSize="large">New Round Team 1</Button>
            </div>
            <div className="col-xs-6">
              <Button onClick={this.newFirstRound[1]} bsStyle="primary" bsSize="large">New Round Team 2</Button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <Button onClick={this.newWinnersCircle} bsStyle="primary" bsSize="large">New Winner's Circle</Button>
            </div>
            <div className="col-xs-6">
              <Button onClick={this.newGame} bsStyle="primary" bsSize="large">New Game</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}




