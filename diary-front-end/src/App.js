import React from 'react';
import './App.css';
import Login from './Components/Login/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'login'
    };

    this.getActivePage = this.getActivePage.bind(this);
  }

  getActivePage() {
    switch(this.state.activePage) {
      case 'login': return <Login />;
      default: throw 'Invalid active page state';
    }
  }

  render() {
    let renderedPage = this.getActivePage();

    return(
      <div className="App">
        {renderedPage}
      </div>
    );
  }
}

export default App;
