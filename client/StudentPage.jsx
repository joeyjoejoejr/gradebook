import React from 'react';
import { currentUser, getDashboard } from 'utils/api';

class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      gpa: null,
    }
  }

  componentDidMount() {
    getDashboard().then(({courses, gpa}) => this.setState({
      courses,
      gpa
    }));
  }

  render() {
    return (
      <div>
        <h2>Courses for {currentUser().name}</h2>
        <h3>GPA {this.state.gpa}</h3>

        <ul>
          { this.state.courses.map((course, i) => (
              <li key={i}>
                {course.name} {course.teacher_name} {course.grade}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default StudentPage;
