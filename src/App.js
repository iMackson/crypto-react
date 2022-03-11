import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom' ;
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import { Coin } from './components/Coin';
import { LineChart } from './components/LineChart';


export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/chart/">
            <LineChart />
          </Route>
          <Route path="/:coinId/">
            <Coin />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}