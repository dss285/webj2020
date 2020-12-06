import AsiakasHaku from './AsiakasHaku';
import Yhteystiedot from './Yhteystiedot';
import Koti from './Koti';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Koti</Link></li>
          <li><Link to="/asiakashaku">Asiakashaku</Link></li>
          <li><Link to="/yhteystiedot">Yhteystiedot</Link></li>
        </ul>
      <Switch>
        <Route path="/asiakashaku">
          <AsiakasHaku />
        </Route>
        <Route exact path="/yhteystiedot/:id" component={Yhteystiedot}/>
        <Route exact path="/yhteystiedot">
          <Yhteystiedot />
        </Route>
        
        <Route path="/">
          <Koti />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
