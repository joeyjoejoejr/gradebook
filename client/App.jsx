import React from 'react';
import TeacherPage from 'TeacherPage';
import StudentPage from 'StudentPage';
import LoginForm from 'LoginForm';
import { currentUser, login, logout } from 'utils/api';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: currentUser() || {} }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(body) {
    logout();
    this.setState({ user: {} });
  }

  handleLogin(body) {
    return login(body)
      .then(user => this.setState({ user }))
  }

  render() {
    return (
      <div>
        { this.state.user.name &&
            (
              <span>
                Signed in as {this.state.user.name}
                <button onClick={this.handleLogout}>Sign Out</button>
              </span>
            )
        }
        {
          {
            'Teacher': <TeacherPage />,
            'Student': <StudentPage />,
            'default': <LoginForm login={this.handleLogin} />,
          }[this.state.user.type || 'default']
        }
      </div>
    );
  }
}

export default App;
