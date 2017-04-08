import React from 'react';
import { Button } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this._clearState = this.state;
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillUnmount() {
    this.setState(this._clearState);
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    })
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <label className="form-group">
          Email
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            className="form-control"
          />
        </label>

        <label className="form-group">
          Password
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            className="form-control"
          />
        </label>
        <Button type="submit" bsStyle="primary">Sign In</Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
}

export default LoginForm;
