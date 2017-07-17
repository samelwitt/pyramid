import React from 'react'
import NewGameButtons from '../NewGameButtons'
import Game from '../Game'
import SoundFX from '../SoundFX'
import * as AppActions from '../../AppActions'
import AppStore from '../../AppStore'

export default class Home extends React.Component {

  state = {
    mode: AppStore.mode
  }

  setMode = () => {
    this.setState({
      mode: AppStore.mode
    })
  }

  componentWillMount() {
    AppStore.addListener('newGame', this.setMode)
    AppStore.addListener('newTimer', this.setMode)
    AppStore.addListener('cancelTimer', this.setMode)
    AppStore.addListener('timesUp', this.setMode)
    AppStore.addListener('win', () => {
      if (this.state.mode !== 'winnersCircle') {
        this.setMode()
      }
    })
  }

  render() {
    return (
      <div className="home-wrap">
        <SoundFX/>
        {this.state.mode === 'home' &&
          <NewGameButtons />
        }
        <Game />
      </div>
    );
  }
}
