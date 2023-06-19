import  { Component } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../auth/Logout';
import MongoDbController from '../api/MongoDbController';
import NewUserPage from '../pages/NewUserPage';
import LoginPage from '../pages/LoginPage';
import UserDisplay from "../components/UserDisplay";

interface NavBarProps {}

interface NavBarState {
  isLoggedIn: boolean;
  showLoginPopup: boolean;
  showNewUserPopup: boolean;
  sessionId: string | undefined;
}

class NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showLoginPopup: false,
      showNewUserPopup: false,
      sessionId: undefined,
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus = async () => {
    const sessionId = sessionStorage.getItem('sessionId');
    const sessionController = new MongoDbController({ collection: 'sessions' });

    let existingSession;
    if (sessionId != null) {
      try {
        existingSession = await sessionController.getByName(sessionId);
        this.setState({ sessionId:  sessionId });
        console.log(existingSession);
      } catch (error) {
        existingSession = null;
      }
    }

    this.setState({ isLoggedIn: existingSession != null });
  };

  LoggedInDisplay = () => {
    return (
      <div>
        <div>
          <UserDisplay sessionID={this.state.sessionId as String}/>
        </div>
        <nav>
          <div className="flex flex-row gap-4">
            <Link to="/create-prompt" className="links">
              [ Create ]
            </Link>
            <Link to="/your-prompts" className="links">
              [ Prompts ]
            </Link>
          </div>
        </nav>
      </div>
    );
  };

  toggleLoginPopup = () => {
    this.setState((prevState) => ({
      showLoginPopup: !prevState.showLoginPopup,
    }));
  };

  toggleNewUserPopup = () => {
    this.setState((prevState) => ({
      showNewUserPopup: !prevState.showNewUserPopup,
    }));
  };

  logoutAndRefresh = async () => {
    const success = await Logout();
    if (success == 0) {
      this.setState({ isLoggedIn: false });
    }
  };

  render() {
    const { isLoggedIn, showLoginPopup, showNewUserPopup } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <this.LoggedInDisplay />
        ) : null}
        <div className="auth-container">
          {isLoggedIn ? (
            <button className="auth-button" onClick={this.logoutAndRefresh}>[Log Out]</button>
          ) : (
            <button className="auth-button" onClick={this.toggleLoginPopup}>[Log In]</button>
          )}
        <button className="auth-button" onClick={this.toggleNewUserPopup}>[Create User]</button>
        </div>
        {showLoginPopup && <LoginPage toggle={this.toggleLoginPopup} />}
        {showNewUserPopup && <NewUserPage toggle={this.toggleNewUserPopup} />}
      </div>
    );
  }
}

export default NavBar;
