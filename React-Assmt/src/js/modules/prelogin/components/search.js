import React, { Component } from 'react';
import { searchStudent } from '../actions';
import { connect } from 'react-redux';

class Search extends React.Component {

  _searchList(term) {
    this.props.searchStudent(term);
  }

  render() {
    return (
      <input type="text" onChange={event => this._searchList(event.target.value)}
      placeholder="Search Student" />
    );
  }
};

function mapStatetoProps(state) { 
  return {
      allResults: state.allResults
  };
}

function mapDispatchToProps(dispatch) {
  return {
      searchStudent: text => dispatch(searchStudent(text))
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Search);
