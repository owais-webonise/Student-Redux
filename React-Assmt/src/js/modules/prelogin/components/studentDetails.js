class Home extends React.Component {
    render() {
        return (
          <div>
            <span className="studentName">Name: {this.props.location.query.param1}  {this.props.location.query.param2}</span>
            <table className="studentDetails table">
            <tr>
              <th> English </th>
              <th> Hindi </th>
              <th> Mathematics </th>
              <th> Total</th>
              <th> Percentage </th>
             </tr>
              <tr>
                <td> {this.props.location.query.param3} </td>
                <td> {this.props.location.query.param4} </td>
                <td> {this.props.location.query.param5} </td>
                <td> {this.props.location.query.param6} </td>
                <td> {this.props.location.query.param7} </td>
              </tr>
            </table>
         </div>
        );
    }
}

export default Home;
