import logo from './logo.svg';
import { BrowserRouter, Link, Redirect, Route, Router, Switch } from 'react-router-dom'
import ChessGame from './chess';
import Home from './Home';
import CheckersGame from './checkers';
import NavBar from './misc/Navbar';

function App() {
  return (
    <>
  
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <NavBar />
      <Switch>
        <Route path="/chess" component={ChessGame} />
        <Route path="/checkers" component={CheckersGame} />
        <Route path="/" component={Home} />


      


      </Switch>

    </BrowserRouter>
    </>

  );
}

export default App;
