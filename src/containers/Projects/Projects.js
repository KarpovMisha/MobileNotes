import React, { Component } from 'react';
import { connect} from 'react-redux';
import { object, func  } from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { ProjectList } from '../../components/ProjectList';
import { setProject } from '../../redux/reducers/project';
import { initiaProjectsFromStore, removeProject } from '../../redux/reducers/projects';
import { AddButton } from '../../elements/Buttons/Buttons';
import styles from './styles';

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = {
  setProject,
  initiaProjectsFromStore,
  removeProject
};

class Projects extends Component {
  static propTypes = {
    projects: object,
    setProject: func,
    initiaProjectsFromStore: func,
    removeProject: func
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <AddButton iconName="add project" onPress={() => navigation.navigate('Project')} />
    )
  })

  componentDidMount() {
    AsyncStorage.getItem('projects').then(value => {
      const init = JSON.parse(value);
      if (Object.keys(init).length > 0) {
        this.props.initiaProjectsFromStore(init);
      }
    })
  }


  navigateProject = project => {
    const { setProject, navigation } = this.props;

    setProject(project);
    navigation.navigate('Project');
  }



  render() {
    const { projects } = this.props.projects;

    return (
      <ProjectList
        projects={projects}
        onPressProject={this.navigateProject}
        removeProject={this.props.removeProject}
      />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
