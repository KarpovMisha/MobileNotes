import React, { Component } from 'react';
import { connect} from 'react-redux';
import { object, func  } from 'prop-types';
import { Text, View } from 'react-native';

import { ProjectList } from '../../components/ProjectList';
import { setProject } from '../../redux/reducers/project';
import styles from './styles';

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = {
  setProject
};

class Projects extends Component {
  static propTypes = {
    projects: object,
    setProject: func
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
        <Text>Projects List</Text>
        <ProjectList
          projects={projects}
          onPressProject={this.navigateProject}
        />
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
