import React, { PureComponent } from 'react';
import { string, number, func } from 'prop-types'
import { connect} from 'react-redux';
import { View, TextInput, StyleSheet } from 'react-native';

import { createNote } from '../../redux/reducers/project';


const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  input: {
    fontSize: 16
  }
})

const mapStateToProps = state => {
  return {
    countNotes: state.project.project.notes.length
  };
};

const mapDispatchToProps = {
  createNote
};

class CreateNote extends PureComponent {
  static propTypes = {
    countNotes: number,
    createNote: func
  }

  onSubmitEditing = e => {
    const { countNotes, createNote, navigation } = this.props;

    const newNoteId = `${countNotes + 1}`;
    const editTime = new Date().getFullYear();
    const text = e.nativeEvent.text;

    createNote(newNoteId, editTime, text);

    //back on Project page
    navigation.navigate('Project');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          placeholder="Type note ..."
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
          onSubmitEditing={this.onSubmitEditing}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
