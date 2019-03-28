import React, { Component } from 'react';
import { connect} from 'react-redux';
import { object, func  } from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeable from 'react-native-swipeable';

import { ProjectList } from '../../components/ProjectList';
import { setProject } from '../../redux/reducers/project';
import { initiaProjectsFromStore } from '../../redux/reducers/projects';
import { AddButton } from '../../elements/Buttons/Buttons';
import styles from './styles';

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = {
  setProject,
  initiaProjectsFromStore
};

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

class Projects extends Component {
  static propTypes = {
    projects: object,
    setProject: func,
    initiaProjectsFromStore: func
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
      <View style={styles.container}>
        <ProjectList
          projects={projects}
          onPressProject={this.navigateProject}
        />
        <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
          <Text>My swipeable content</Text>
        </Swipeable>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
