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
      <div id="main">
        <div id="content">
          {children}
        </div>
      </div>
    );
  }
}
