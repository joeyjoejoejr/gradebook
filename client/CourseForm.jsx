import React from 'react';
import { searchStudents } from 'utils/api';

const StudentListItem = ({ student, index, handleRemove, handleUpdate }) => (
  <li>
    {student.name}

    <label>
      Grade
      <input onChange={event => {
          handleUpdate(event.target.value, index)
        }}
        value={student.grade}
      />
    </label>

    <button onClick={event => {
      handleRemove(student);
      event.preventDefault();
    }}>
    Remove Student
  </button>
</li>
)

class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      semester: '',
      id: '',
      searchResults: [],
      students: []
    };
    this._clearState = this.state;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
  }

  componentWillReceiveProps(props) {
    const course = props.course;
    if(this.props.course !== course) {
      this.setState({
        name: course.name,
        semester: course.semester,
        id: course.id,
        students: course.students
      })
    }
  }

  handleSubmit(event) {
    const params = {
      id: this.state.id,
      name: this.state.name,
      semester: this.state.semester,
      students: this.state.students,
    }
    this.props.submitForm(params)
      .then(() => this.setState(this._clearState))
      .catch(err => this.setState({ errors: err.responseErrors }));

    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  handleSearch(event) {
    if(event.target.value) {
      searchStudents(event.target.value).then(students => {
        this.setState({ searchResults: students });
      });
    }
  }

  addStudent(student) {
    if (this.state.students.indexOf(student) === -1) {
      this.setState(state => ({ students: state.students.concat(student) }));
    }
  }

  removeStudent(student) {
    this.setState(state => {
      return { students: state.students.filter(s => s !== student) };
    });
  }

  updateGrade(grade, i) {
    this.setState(state => {
      const student = Object.assign({}, state.students[i], { grade });
      const students = state.students.map((s, j) => (i === j ? student : s));
      return {
        students: students
      };
    });
  }

  render() {
    return (
      <form id="course" onSubmit={this.handleSubmit}>
        { this.state.errors &&
            this.state.errors.map((err, i) => <li key={i} >{err}</li>) }
            <label>
              Name
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>

            <label>
              Semester
              <select
                name="semester"
                value={this.state.semester}
                onChange={this.handleChange}>
                <option value="" />
                <option value="1">Spring 2017</option>
              </select>
            </label>

            <label>
              Search Students
              <input onChange={this.handleSearch} />
            </label>

            <ul>
              { this.state.searchResults.map((student, i) => (
                <li key={i}>
                  {student.name}
                  <button onClick={event => {
                    this.addStudent(student)
                    event.preventDefault();
                  }}>
                  Add Student
                </button>
              </li>
              ))}
            </ul>

            <p>Enrolled</p>
            <ul>
              { this.state.students && this.state.students.map((student, i) => (
                <StudentListItem
                  key={i}
                  index={i}
                  student={student}
                  handleRemove={this.removeStudent}
                  handleUpdate={this.updateGrade}
                />
              ))}
            </ul>


            <input type="submit" value={`${this.props.buttonText} Course`} />
          </form>
    );
  }
}

CourseForm.propTypes = {
  submitForm: React.PropTypes.func.isRequired,
  buttonText: React.PropTypes.string.isRequired,
  course: React.PropTypes.object,
}

export default CourseForm
