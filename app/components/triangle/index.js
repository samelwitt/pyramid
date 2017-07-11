import React from 'react'

export default class Triangle extends React.Component {

  state = {
    text: this.props.text,
    clickHandler: this.props.clickHandler,
    disabled: this.props.disabled
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
    if (newProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: newProps.disabled
      })
    }
  }

  render() {
    return(
      <div className="triangle-wrapper">
        <div className="triangle" />
        <div className="triangle-text">
          {this.state.text}
        </div>
      </div>
    )
  }
}