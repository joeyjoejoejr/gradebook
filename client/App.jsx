import React from 'react';
import { Grid, Row, Button } from 'react-bootstrap';
import TeacherPage from 'TeacherPage';
import StudentPage from 'StudentPage';
import AdminPage from 'AdminPage';
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
      <Grid>
        <Row>
          <h1>Grade Book</h1>
          { this.state.user.name &&
              (
                <span className="pull-right">
                  Signed in as {this.state.user.name}
                  <Button bsSize="small"
                    bsStyle="warning"
                    onClick={this.handleLogout}>Sign Out</Button>
                </span>
              )
          }
        </Row>

        {
          {
            'Teacher': <TeacherPage />,
            'Student': <StudentPage />,
            'Admin': <AdminPage />,
            'default': <LoginForm login={this.handleLogin} />,
          }[this.state.user.type || 'default']
        }
      </Grid>
    );
  }
}

export default App;
