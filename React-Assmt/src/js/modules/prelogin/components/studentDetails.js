class Home extends React.Component {
    render() {
        return (
          <div>
            <span className="studentName">Name: {this.props.location.query.firstName}  {this.props.location.query.lastName}</span>
            <table className="studentDetails table">
            <tr>
              <th> English </th>
              <th> Hindi </th>
              <th> Mathematics </th>
              <th> Total</th>
              <th> Percentage </th>
             </tr>
              <tr>
                <td> {this.props.location.query.english} </td>
                <td> {this.props.location.query.hindi} </td>
                <td> {this.props.location.query.maths} </td>
                <td> {this.props.location.query.total} </td>
                <td> {this.props.location.query.percent} </td>
              </tr>
            </table>
         </div>
        );
    }
}

export default Home;
