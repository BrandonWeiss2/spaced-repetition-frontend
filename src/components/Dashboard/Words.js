import React, { Component } from 'react'

export default class Words extends Component {
  render() {
    return (
      <li className='wordCard'>
        <h4 className='wordOriginal'>{this.props.original}</h4>
        <div className='wordScore'>
          <span>correct answer count: {this.props.correct}</span>
          <span>incorrect answer count: {this.props.incorrect}</span>
        </div>
      </li>
    )
  }
}
