import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import StudentListItem from 'StudentListItem';

const CourseList = ({ courses, editCourse, deleteCourse }) => (
  <ListGroup>
    { courses.map((course, i) => (
      <ListGroupItem header={course.name} key={i}>
        { editCourse &&
            <Button
              bsSize="small"
              onClick={() => editCourse(course)}>
              Edit Course
            </Button>
        }

        { deleteCourse &&
            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={() => deleteCourse(course)}>
              Delete Course
            </Button>
        }

        <ListGroup>
          { course.students.map((student, i) => (
              <StudentListItem key={i} student={student} />
            ))
          }
        </ListGroup>
      </ListGroupItem>
    )) }
  </ListGroup>
);

CourseList.propTypes = {
  courses: React.PropTypes.array.isRequired,
  editCourse: React.PropTypes.func,
  deleteCourse: React.PropTypes.func,
}

export default CourseList;
