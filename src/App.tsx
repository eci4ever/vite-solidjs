import { Router, Route } from '@solidjs/router';
import LandingPage from './LandingPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import DashboardPage from './DashboardPage';

const App = () => {
  return (
    <Router>
      <Route path="/" component={LandingPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Router>
  );
};

export default App;
