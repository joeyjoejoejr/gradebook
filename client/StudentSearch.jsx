import React from 'react';
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
        <label>
          Search Students
          <input onChange={this.handleSearch} />
        </label>

        <ul>
          { this.state.searchResults.map((student, i) => (
            <li key={i}>
              {student.name}
              <button onClick={event => {
                this.props.addStudent(student)
                event.preventDefault();
              }}>
              Add Student
            </button>
          </li>
          ))}
        </ul>
      </div>
    );
  }
}

StudentSearch.propTypes = {
  addStudent: React.PropTypes.func.isRequired,
}

export default StudentSearch;
