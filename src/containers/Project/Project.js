import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { object, func, array } from 'prop-types';

import { NoteList } from '../../components/NoteList';
import { ProjectNameInput } from '../../components/ProjectNameInput';
import { removeNote, setActiveNote } from '../../redux/reducers/project';
import { addProject } from '../../redux/reducers/projects';
import { AddButton } from '../../elements/Buttons/Buttons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = state => {
  return {
    project: state.project.project,
    projects: state.projects.projects
  };
};

const mapDispatchToProps = {
  removeNote,
  setActiveNote,
  addProject
};

export class Project extends Component {
  static propTypes = {
    project: object,
    projects: array,
    removeNote: func,
    addProject: func,
    setActiveNote: func
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <AddButton iconName="add note" onPress={() => navigation.navigate('Project')} />
    )
  })

  navigateNote = noteId => {
    const { navigation, setActiveNote } = this.props
    setActiveNote(noteId);
    navigation.navigate('Note');
  }

  removeNote = noteId => {
    const { removeNote } = this.props
    removeNote(noteId)
  }

  createProject = name => {
    const { projects, addProject, navigation } = this.props;

    const projectId = 'project_' + (projects.length + 1);
    addProject(projectId, name);
    navigation.navigate('Projects');
    // this.props.navigation.setParams({ projectId: newProjectId, name })
    // this.props.addProject(newProjectId, name)
  }

  render() {
    const { project: { notes } } = this.props;

    if (!notes) {
      return (
        <ProjectNameInput
          onSubmitEditing={this.createProject}
        />
      )
    }

    return (
      <View style={styles.container}>
        <NoteList
          notes={notes}
          onNavigateNote={this.navigateNote}
          onRemoveNote={this.removeNote}
        />
      </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Project);
