import React from 'react';
import StudentListItem from 'StudentListItem';

const CourseList = ({ courses, editCourse, deleteCourse }) => (
  <ul>
    { courses.map((course, i) => (
      <li key={i}>
        { course.name }
        { editCourse &&
          <button onClick={() => editCourse(course)}>
            Edit Course
          </button>
        }

        { deleteCourse &&
          <button onClick={() => deleteCourse(course)}>
            Delete Course
          </button>
        }

        <ul>
          { course.students.map((student, i) => (
              <StudentListItem key={i} student={student} />
            ))
          }
        </ul>
      </li>
    )) }
  </ul>
);

CourseList.propTypes = {
  courses: React.PropTypes.array.isRequired,
  editCourse: React.PropTypes.func,
  deleteCourse: React.PropTypes.func,
}

export default CourseList;
