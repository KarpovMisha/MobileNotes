/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import configureStore from './src/redux/store';

import Projects from './src/containers/Projects/Projects';
import Project from './src/containers/Project/Project';
import Note from './src/containers/Note/Note';
import CreateNote from './src/containers/Note/CreateNote';

const store = configureStore({});

const navigator = createStackNavigator(
  {
    Projects: { screen: Projects },
    Project: { screen: Project },
    Note: { screen: Note },
    CreateNote: { screen: CreateNote }
  },
  {
    initialRouteName: 'Projects'
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff'
    }
  }
);

const AppContainer = createAppContainer(navigator);

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
