import React from 'react';
import * as AppActions from '../../AppActions';
import AppStore from '../../AppStore';
import * as Utils from '../../helpers/utils';

import './app.less'

export default class App extends React.Component {

  componentWillMount() {
    //Utils.throttle(window, 'resize', AppActions.onWindowResize);
    //this.windowResizeToken = AppStore.addListener('onWindowResize', ()=> {/*do something*/});
  }

  componentWillUnmount() {
    //Utils.deThrottle(window, 'resize', AppActions.onWindowResize);
    //this.windowResizeToken.remove();
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
     return React.cloneElement(child);
    });

    return (
      <div id="app">
        <link href="https://fonts.googleapis.com/css?family=Oswald:400" rel="stylesheet"/>
        <div id="content">
          {children}
        </div>
      </div>
    );
  }
}
