import React, { Component } from 'react';
import './App.css';
import UsernameInput from './components/usernameInput';
import ArticlesList from './components/articlesList'
import ErrorComponent from './components/error';
import ClassNames from 'classnames';
import LocalStorageProvider from './localStorageProvider';
import {getMediumFeedArticles, ResponseStatuses} from './ApiGateway/AxiosApiGateway';

class App extends Component {
  
  state = {
    username: '',
    isLoading: false,
    loaded: false,
    articles: {},
    status: 0,
    usernameIsValid: false
  };

  componentDidMount() {
    const savedState = LocalStorageProvider.hydrateStateWithLocalStorage(this.state);
    this.setState(savedState)

    window.addEventListener(
      "beforeunload",
      this.SaveCurrrentState
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.SaveCurrrentState
    );

    this.SaveCurrrentState();
  }

  SaveCurrrentState = () => {
    LocalStorageProvider.saveStateToLocalStorage(this.state)
  }
  
  usernameInputChanged = (event) => {
    var username = event.target.value;
    const usernameIsValid = this.usernameValidation(username);
    this.setState({username, usernameIsValid }
  )};
  
  usernameValidation = (username) => {
    var allowedUsernames = /^@?([a-z]|[A-Z]|[0-9]|-)+$/;
    return allowedUsernames.test(username);
  }

  fetchFeed = () => {
    if(!this.usernameValidation(this.state.username))
    {
      console.warn('tried to fetch with invalid username');      
      return;
    }

    this.setState({
      isLoading: true,
      loaded: false,
      status: 0,
    })

    getMediumFeedArticles(this.state.username, this.setFetchResponse);
  }

  setFetchResponse = ({articles, status}) => {
    this.setState({
      loaded: true,
      isLoading: false,
      articles,
      status
    })
  }


  render() {
    return (
      <div className="App">
        <header className={ClassNames("App-header", { streched: !this.state.loaded })}>
          <UsernameInput username={this.state.username} 
                         onUsernameInputChanged={this.usernameInputChanged} 
                         onClickFetch={this.fetchFeed}
                         isValid={this.state.usernameIsValid}
                         isLoading={this.state.isLoading}/>
        </header>
        <div className={ClassNames("App-intro", { hidden: !this.state.loaded })}>
          {this.state.status && 
          (this.state.status === ResponseStatuses.Ok?
          (<ArticlesList articles={this.state.articles} />):
          (<ErrorComponent status={this.state.status}/>))}        
        </div>
      </div>
    );
  }
}

export default App;
