import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { NoteDetail } from '../../components/NoteDetail';
import { SELECTORS as noteSelectors, updateNote } from '../../redux/reducers/project';

const mapStateToProps = (state, ownProps) => {
  return {
    note: noteSelectors.handleNotes(state.project),
  }
};

const mapDispatchToProps = {
  updateNote
};

export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: ''
    };
  }

  onChangeNote = noteText => {
    this.setState({ noteText })
  }

  saveNote = () => {
    const { noteText } = this.state;
    const { updateNote, navigation } = this.props;
    updateNote(noteText);
    navigation.navigate('Project');
  }

  render() {
    const { note } = this.props;
    const initialTextValue = note ? note.text : '';
    const noteText = this.state.noteText || initialTextValue;

    return (
      <NoteDetail
        noteText={noteText}
        onChangeNoteText={this.onChangeNote}
        saveNote={this.saveNote}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
