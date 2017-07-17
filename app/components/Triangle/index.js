import React from 'react'

import './triangle.less'

console.log()

export default class Triangle extends React.Component {

  state = {
    text: this.props.text,
    clickHandler: this.props.clickHandler,
    active: this.props.active
  }

  componentWillReceiveProps(newProps) {
    if (newProps.text !== this.props.text) {
      this.setState({
        text: newProps.text
      })
    }
    if (newProps.clickHandler !== this.props.clickHandler) {
      this.setState({
        clickHandler: newProps.clickHandler
      })
    }
    if (newProps.active !== this.props.active) {
      this.setState({
        active: newProps.active
      })
    }
  }

  render() {
    return(
      <div className="triangle-wrapper">
        <div className={this.state.active ? 'triangle active' : 'triangle'} />
        <div className="triangle-text">
          {this.state.text}
        </div>
      </div>
    )
  }
}