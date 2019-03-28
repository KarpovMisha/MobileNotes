import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { object, func, array, string } from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import { NoteList } from '../../components/NoteList';
import { ProjectNameInput } from '../../components/ProjectNameInput';
import { removeNote, setActiveNote, initialProjectFromStore } from '../../redux/reducers/project';
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
  addProject,
  initialProjectFromStore
};

export class Project extends Component {
  static propTypes = {
    project: object,
    projects: array,
    removeNote: func,
    addProject: func,
    setActiveNote: func,
    initialProjectFromStore: func
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <AddButton iconName="add note" onPress={() => navigation.navigate('CreateNote')} />
    )
  })

  navigateNote = noteId => {
    const { navigation, setActiveNote } = this.props
    setActiveNote(noteId);
    navigation.navigate('Note');
  }

  componentDidMount() {
    AsyncStorage.getItem('project').then(value => {
      const init = JSON.parse(value);
      if (Object.keys(init).length > 0) {
        this.props.initialProjectFromStore(init);
      }
    })
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
