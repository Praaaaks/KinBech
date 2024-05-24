// import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './Components/navbar';
import Home from './Components/home';
import SideBar from './Components/sidebar';
// import Login from './Components/Auth/login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <SideBar />
        <Home />
      </header>
    </div>
  );
}

export default App;
