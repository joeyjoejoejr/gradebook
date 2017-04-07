import React from 'react';
import TeacherPage from 'TeacherPage';
import LoginForm from 'LoginForm';
import { isLoggedIn, login, logout } from 'utils/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: isLoggedIn()
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(body) {
    logout();
    this.setState({ loggedin: false });
  }

  handleLogin(body) {
    return login(body)
      .then(() => this.setState({ loggedin: true }))
  }

  render() {
    return (
      <div>
        { this.state.loggedin &&
            <button onClick={this.handleLogout}>Sign Out</button> }
        { this.state.loggedin ?
          <TeacherPage /> :
          <LoginForm login={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;
