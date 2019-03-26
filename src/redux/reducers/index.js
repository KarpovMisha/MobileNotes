// @flow
import { combineReducers } from 'redux';
import projects from './projects';
import project from './project';

// Root Reducer
const rootReducer = combineReducers({
  projects,
  project
});

export default rootReducer;
