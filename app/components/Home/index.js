import React from 'react'
import NewGameButtons from '../NewGameButtons'
import Game from '../Game'
import SoundFX from '../SoundFX'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

export default class Home extends React.Component {

  state = {
    mode: AppStore.getMode()
  }

  handleGameStatus = () => {
    this.setState({
      mode: AppStore.getMode()
    })
  }

  componentWillMount() {
    AppStore.addListener('newTimer', this.handleGameStatus);
    AppStore.addListener('clearTimer', this.handleGameStatus);
  }

  render() {
    return (
      <div className="home-wrap">
        <SoundFX/>
        <NewGameButtons disabled={this.state.mode !== 'home'} />
        <Game mode={this.state.mode} disabled={this.state.mode === 'home'} />
      </div>
    );
  }
}
