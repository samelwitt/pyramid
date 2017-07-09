import React from 'react'
import {Button} from 'react-bootstrap'
import Timer from '../Timer'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

export default class NewGameButtons extends React.Component {

  state = {
    disabled: this.props.disabled
  }

  newFirstRound = () => {
    AppActions.newTimer('firstRound')
  }

  newWinnersCircle = () => {
    AppActions.newTimer('winnersCircle')
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
      <div className="container new-game-buttons-wrap">
        <div className="row">
          <div className="col-xs-6">
            <Button onClick={this.newFirstRound} bsStyle="primary" bsSize="large" disabled={this.state.disabled}>New First Round</Button>
          </div>
          <div className="col-xs-6">
            <Button onClick={this.newWinnersCircle} bsStyle="primary" bsSize="large" disabled={this.state.disabled}>New Winner's Circle</Button>
          </div>
        </div>
      </div>
    )
  }
}




