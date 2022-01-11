import logo from './logo.svg';
import { BrowserRouter, Link, Redirect, Route, Router, Switch } from 'react-router-dom'
import ChessGame from './chess';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>


        <Route path="/chess" component={ChessGame} />


        <Redirect path="/" to="chess" />



      </Switch>

    </BrowserRouter>

  );
}

export default App;
