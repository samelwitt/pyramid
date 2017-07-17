import React from 'react';
import * as AppActions from '../../AppActions';
import AppStore from '../../AppStore';
import * as Utils from '../../helpers/utils';

import './app.less'

export default class App extends React.Component {

  componentWillMount() {
    //
  }

  componentWillUnmount() {
    //
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
