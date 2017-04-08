import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { getDashboard } from 'utils/api';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      enrollment: null
    }
  }

  componentDidMount() {
    getDashboard().then(({courses, enrollment}) => this.setState({
      courses,
      enrollment
    }));
  }

  render() {
    return (
      <div>
        <h2>Courses</h2>
        <h3>Enrollment {this.state.enrollment}</h3>

        <ListGroup>
          { this.state.courses.map((course, i) => (
              <ListGroupItem
                key={i}
                header={course.name}>
                <dl>
                  <dt>Teacher</dt><dd>{course.teacher_name}</dd>
                  <dt>Average Grade</dt><dd>{course.average_grade}</dd>
                  <dt>Enrollment</dt><dd>{course.enrollment}</dd>
                </dl>
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </div>
    )
  }
}

export default AdminPage;
