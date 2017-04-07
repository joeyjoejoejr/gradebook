import React from 'react';

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
        <label>
          Email
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </label>
        <input type="submit" value="Sign In" />
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
}

export default LoginForm;
