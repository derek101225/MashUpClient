import React from 'react';
import Auth from './components/Auth/Auth'

import Home from './components/Home/Home'
import { Component } from 'react'
import './App.css';



type AuthState = {
  token: string
}

export default class App extends Component<{}, AuthState> {
  constructor(props: string) {
    super(props);
    let token = localStorage.getItem('token')
    this.state = {
      token: token ? token : '',
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    console.log(newToken)
    this.setState({
      token: newToken
    })

  }

  clearToken = () => {
    localStorage.clear();
    this.setState({
      token: ''
    })
  }

  render() {
    return (
      <div id="app-background">

        {this.state.token ? <Home updateToken={this.updateToken.bind(this)} token={this.state.token} clearToken={this.clearToken} /> : <Auth updateToken={this.updateToken.bind(this)} />}



      </div>
    )
  }

}