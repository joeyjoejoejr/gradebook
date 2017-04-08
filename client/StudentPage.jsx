import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
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

        <ListGroup>
          { this.state.courses.map((course, i) => (
              <ListGroupItem header={course.name} key={i}>
                <dl>
                  <dt>Teacher</dt><dd>{course.teacher_name}</dd>
                  <dt>Your Grade</dt><dd>{course.grade}</dd>
                </dl>
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </div>
    )
  }
}

export default StudentPage;
