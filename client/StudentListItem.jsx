import React from 'react';

const StudentListItem = ({ student, index, handleRemove, handleUpdate }) => (
  <li>
    <span>{student.name}</span>

    { handleUpdate ?
      <label>
        Grade
          <input onChange={event => {
              handleUpdate(index, event.target.value);
            }}
            value={student.grade}
          />
      </label> :
      <span>{student.grade}</span>
    }

    { handleRemove &&
      <button onClick={event => {
        handleRemove(student);
        event.preventDefault();
      }}>
        Remove Student
      </button> }
</li>
)

StudentListItem.PropTypes = {
  student: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  handleRemove: React.PropTypes.func,
  handleUpdate: React.PropTypes.func,
};

export default StudentListItem;
