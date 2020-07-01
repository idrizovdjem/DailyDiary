import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'login'
    };

    this.getActivePage = this.getActivePage.bind(this);
    this.changeActivePage = this.changeActivePage.bind(this);
  }

  changeActivePage(newActivePage) {
    this.setState({
      activePage: newActivePage
    });
    this.forceUpdate();
  }

  getActivePage() {
    switch(this.state.activePage) {
      case 'login': return <Login changePage={this.changeActivePage}/>;
      case 'register': return <Register changePage={this.changeActivePage}/>
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
