import React from 'react';
import CourseForm from 'CourseForm';
import { createCourse, getCourses } from 'utils/api';

class TeacherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
    this.submitCourse = this.submitCourse.bind(this);
  }

  componentDidMount() {
    getCourses().then(courses => this.setState({ courses }));
  }

  submitCourse(body) {
    return createCourse(body).then(course => {
      this.setState(state => {
        return { courses: state.courses.concat(course) };
      });

      return course;
    });
  }

  render() {
    return (
      <CourseForm submitForm={this.submitCourse} />
    );
  }
}

export default TeacherPage;
