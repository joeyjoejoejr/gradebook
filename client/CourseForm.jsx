import React from 'react';

class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      semester: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    this.props.submitForm(this.state).then(resp => {
      this.setState({ name: '', semester: '', errors: '' });
    }).catch(err => this.setState({ errors: err.responseErrors }));

    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
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
            value={this.state.select}
            onChange={this.handleChange}>
            <option value="" />
            <option value="1">Spring 2017</option>
          </select>
        </label>

        <input type="submit" value="Add Course" />
      </form>
    );
  }
}

CourseForm.propTypes = {
  submitForm: React.PropTypes.func.isRequired,
}

export default CourseForm
