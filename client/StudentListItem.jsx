import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

const StudentListItem = ({ student, index, handleRemove, handleUpdate }) => (
  <ListGroupItem
    header={student.name}
    className="list-group-item">

    { handleUpdate ?
      <label className="form-group">
        Grade
          <input onChange={event => {
              handleUpdate(index, event.target.value);
            }}
            value={student.grade}
            className="form-control"
          />
      </label> :
      <span>{student.grade}</span>
    }

    { handleRemove &&
      <Button bsStyle="danger" bsSize="small" onClick={event => {
        handleRemove(student);
        event.preventDefault();
      }}>
        Remove Student
      </Button> }
  </ListGroupItem>
)

StudentListItem.PropTypes = {
  student: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  handleRemove: React.PropTypes.func,
  handleUpdate: React.PropTypes.func,
};

export default StudentListItem;
