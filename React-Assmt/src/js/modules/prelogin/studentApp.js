import React, { Component } from 'react';
import allResults from 'static/files/results.json';
import Search from './components/search.js';
import Checkbox from './components/checkbox.js';
import 'static/stylesheets/style';
import { connect } from 'react-redux';
import { updateData } from './actions';
import { Link } from 'react-router';
import { CHECKBOXENUM } from './components/constants.js';

var total,percentage,checkValue=[];
class StudentApp extends Component {

  componentDidMount () {
    this.props.updateData(allResults.results);
  }

  _generateTable() {
    if (this.props.results) {
      if(this.props.updatedResults.length) {
        var percentageResults = Object.assign([], this.props.updatedResults);
      } else { 
        var percentageResults = Object.assign([], this.props.results);
      }      
      return percentageResults.map((value, key) => {
        total = (value.marks.english + value.marks.hindi + value.marks.mathematics);
        percentage = parseInt(total / 3, 10);
        if (!percentageResults.percentage) {
          percentageResults[key].percentage= percentage;
        }
        var obj= {
          firstName: value.firstName, 
          lastName: value.lastName,
          english: value.marks.english,
          hindi: value.marks.hindi,
          maths: value.marks.mathematics,
          total: total, 
          percent:percentage
        }
        return (
          <tr key = {key} className = {percentage < 35 ? "failColor" : null}>
            <td><Link to={{pathname: "home/", query: obj}} className="field" target="_blank">{value.firstName}</Link></td>
            <td>{value.lastName}</td>
            <td>{percentage}</td>
          </tr>
        )
      });
    } else {
      console.log("Table is Empty!")
    }
  }

  handleCheck(marks, event) {
    var filteredData = Object.assign([], allResults.results);
    var min = CHECKBOXENUM[marks].MIN;
    var max = CHECKBOXENUM[marks].MAX;
    var id = event.target.id;
    var check = event.target.checked;
    filteredData = filteredData.filter(function (index) {
      if(index.percentage >= min && index.percentage < max) {
        return index.firstName;
      }
    })
    if(id === marks && check) {
       checkValue = _.uniq(filteredData.concat(checkValue));
       this.props.updateData(checkValue);
    }
    if(id === marks && !check) {
      checkValue = _.difference(checkValue, filteredData);
      if(checkValue.length) {
        this.props.updateData(checkValue);
      } else {
        this.props.updateData(allResults.results);
      }
    }
  }

  render() {
    return (
      <div>
        <form>
          <Search />
          <Checkbox checkMe={this.handleCheck.bind(this)} />
        </form>
        <table className="table">
        <tr>
        <th> First Name </th>
        <th> Last Name </th>
        <th> Percentage </th>
        </tr>
          {this._generateTable()}
        </table>
      </div>
    );
  }
};

function mapStatetoProps(state) {
  return {
    results: state.allResults,
    updatedResults: state.updatedResults,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateData: allResults => dispatch(updateData(allResults))
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(StudentApp);
