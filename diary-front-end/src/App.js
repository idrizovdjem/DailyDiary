import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/Main/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'login'
    };

    this.getActivePage = this.getActivePage.bind(this);
    this.changeActivePage = this.changeActivePage.bind(this);
  }

  // try to get the User_Key
  // and login the user
  componentDidMount() {
    const uuid = sessionStorage.getItem('User_Key');
    if(uuid) {
      this.changeActivePage('main');
    }
  }

  changeActivePage(newActivePage) {
    this.setState({
      activePage: newActivePage
    });
    this.forceUpdate();
  }

  // return DOM element from the currentActivePage
  getActivePage() {
    switch(this.state.activePage) {
      case 'login': return <Login changePage={this.changeActivePage}/>;
      case 'register': return <Register changePage={this.changeActivePage}/>
      case 'main': return <Main changePage={this.changeActivePage}/>
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
