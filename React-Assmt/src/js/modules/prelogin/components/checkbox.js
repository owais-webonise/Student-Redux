import React, { Component } from 'react';
import { CHECKBOXENUM, RESULTTYPE } from './constants.js';

class Checkbox extends React.Component {

  _changecheck(marks, event) {
    this.props.checkMe(marks, event);
  }

  render() {
    return (
      <div className="clearfix">
      {
        _.map(RESULTTYPE, (item, key) => {
          return (
            <div key={key} className="pull-left">
              <input type = "checkbox" onChange = {event => this._changecheck(item, event)} id={item}/>
              <label for={item}>{item}</label>
            </div>
          )
        })
      }
      </div>
    );
  }
};

export default Checkbox;
