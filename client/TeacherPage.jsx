import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseForm from 'CourseForm';
import CourseList from 'CourseList';
import {
  createCourse,
  updateCourse,
  getDashboard,
  deleteCourse,
  currentUser } from 'utils/api';

class TeacherPage extends React.Component {
  constructor(props) {
    super(props);
    this._newCourse = { id: '', name: '' };
    this.state = { courses: [], currentCourse: this._newCourse };
    this.createCourse = this.createCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    getDashboard().then(({ courses }) => this.setState({ courses }));
  }

  resetForm() {
    this.setState({ currentCourse: this._newCourse });
  }

  createCourse(body) {
    return createCourse(body).then(course => {
      this.setState(state => {
        return { courses: state.courses.concat(course) };
      });

      return course;
    }).then(this.resetForm);
  }

  updateCourse(body) {
    return updateCourse(body).then(course => {
      this.setState(state => {
        return { courses: state.courses.map(oldCourse => (
          course.id === oldCourse.id ? course : oldCourse))
        };
      });

      return course;
    }).then(this.resetForm);
  }

  deleteCourse(course) {
    deleteCourse(course).then(() => {
      this.setState(state => {
        return { courses: state.courses.filter(c => c.id !== course.id) };
      });
    });
  }

  editCourse(course) {
    this.setState({ currentCourse: course });
  }

  render() {
    return (
      <Row>
        <Col sm={4}>
          <CourseForm submitForm={this.state.currentCourse.id ? this.updateCourse : this.createCourse }
            buttonText={ this.state.currentCourse.id ? "Update" : "Add" }
            course={this.state.currentCourse} />
        </Col>

        <Col sm={8}>
          <h2>Courses for {currentUser().name}</h2>
          <CourseList editCourse={this.editCourse}
            deleteCourse={this.deleteCourse}
            courses={this.state.courses} />
        </Col>
      </Row>
    );
  }
}

export default TeacherPage;
