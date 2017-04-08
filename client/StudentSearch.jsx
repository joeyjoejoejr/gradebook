import React from 'react';
import { ListGroupItem, ListGroup, Button } from 'react-bootstrap';
import { searchStudents } from 'utils/api';

class StudentSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    if(event.target.value) {
      searchStudents(event.target.value).then(students => {
        this.setState({ searchResults: students });
      });
    }
  }

  render() {
    return (
      <div>
        <label className="form-group">
          Search Students
          <input className="form-control" onChange={this.handleSearch} />
        </label>

        <ListGroup>
          { this.state.searchResults.map((student, i) => (
            <ListGroupItem key={i}>
              {student.name}
              <Button
                bsSize="small"
                onClick={event => {
                this.props.addStudent(student)
                event.preventDefault();
              }}>
                Add Student
              </Button>
            </ListGroupItem>
            ))}
          </ListGroup>
        </div>
    );
  }
}

StudentSearch.propTypes = {
  addStudent: React.PropTypes.func.isRequired,
}

export default StudentSearch;
