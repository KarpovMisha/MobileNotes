import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { object, func, string } from 'prop-types';
// import shortid from 'shortid'
import { NoteList } from '../../components/NoteList';
// import { AddButton } from '../components/Buttons'
// import { ProjectNameInput } from "../components/ProjectNameInput";
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { removeNote, activeNote } from '../../redux/reducers/project';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    project: state.project.project,
    projectId: state.project.project.id
  };
};

const mapDispatchToProps = {
  removeNote,
  activeNote
};

export class Project extends Component {
  static propTypes = {
    project: object,
    projectId: string,
    removeNote: func,
    activeNote: func
  }

  navigateNote = noteId => {
    const { projectId, navigation, activeNote } = this.props
    activeNote(noteId);
    navigation.navigate('Note', { noteId, projectId })
  }

  removeNote = noteId => {
    const { removeNote } = this.props
    removeNote(noteId)
  }

  render() {
    const { project: { notes } } = this.props;

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
