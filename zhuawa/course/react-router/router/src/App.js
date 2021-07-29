import React, { useCallback } from 'react';
// import {
//   Route,
//   Link
// } from './Router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <>
//         <Link to="/home">home</Link>
//         <Link to="/about">about</Link>
//         <Link to="/about/about">about/about</Link>

//         <Route path="/home" render={(props) => <Home {...props} />} />
//         <Route path="/about">
//           About
//         </Route>
//         <Route path="/about/:id" component={About} />
//       </>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home(props) {
  console.log(props);
  return (
    <div>home</div>
  );
}

function About({ match = {} }) {
  console.log(match);
  return (
    <div>about {match?.params?.id ?? "-"}</div>
  );
}
export default App;
