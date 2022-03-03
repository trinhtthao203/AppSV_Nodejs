import React from 'react';
import {createAppContainer} from 'react-navigation';
import AppNavigator from './AppNavigator';
const AppContainer = createAppContainer(AppNavigator);
import axios from 'axios';

axios.defaults.baseURL='http://192.168.1.6:4000';
export default class App extends React.Component {
  render(){   
    return (
      <AppContainer/>
    );
  }
}