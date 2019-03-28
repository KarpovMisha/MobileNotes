import AsyncStorage from '@react-native-community/async-storage';

const avatar_3 = require('../../images/avatar_3.jpg');
const STATE_KEY = 'project';

const SET_PROJECT = `${STATE_KEY}/SET_PROJECT`;
const NOTE_REMOVED = `${STATE_KEY}/NOTE_REMOVED`;
const ACTIVE_NODE = `${STATE_KEY}/ACTIVE_NODE`;
const NOTE_UPDATE = `${STATE_KEY}/NOTE_UPDATE`;
const NOTE_CREATE = `${STATE_KEY}/NOTE_CREATE`;
const INIT_PROJECT = `${STATE_KEY}/INIT_PROJECT`;

const initialState = {
  project: {},
  activeNote: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT: {
      return {
        project: action.project
      }
    }

    case NOTE_REMOVED: {
      const { noteId } = action.payload
      const project = handleRemoveNote(state.project, noteId);
      AsyncStorage.setItem('project', JSON.stringify(project));
      return {
        ...state,
        project
      }
    }

    case ACTIVE_NODE: {
      return {
        ...state,
        activeNote: action.id
      }
    }

    case NOTE_CREATE: {
      const { newNoteId, editTime, text } = action.payload
      const project = addNewNote(state.project, newNoteId, editTime, text);
      AsyncStorage.setItem('project', JSON.stringify(project));

      return {
        ...state,
        project
      }
    }

    case NOTE_UPDATE: {
      const { text } = action.payload
      const project = handleUpdateNote(state.project, text, state.activeNote);
      AsyncStorage.setItem('project', JSON.stringify(project));
      return {
        ...state,
        project
      }
    }

    case INIT_PROJECT: {
      return { ...state, project: action.payload.project };
    }

    default: {
      return state;
    }
  }
}

export function initialProjectFromStore(project) {
  return {
    type: INIT_PROJECT,
    payload: { project }
  }
}

export function createNote(newNoteId, editTime, text) {
  return {
    type: NOTE_CREATE,
    payload: { newNoteId, editTime, text }
  }
}

export const handleNotes = (state) => {
  const { project, activeNote } = state;
  return project.notes.find(note => note.id === activeNote);
}

export const SELECTORS = {
  handleNotes,
};

export function setActiveNote(id) {
  return {
    type: ACTIVE_NODE,
    id
  }
}

export function setProject(project) {
  return {
    type: SET_PROJECT,
    project
  }
}

export function removeNote(noteId) {
  return {
    type: NOTE_REMOVED,
    payload: { noteId }
  }
}

function handleRemoveNote(project, noteId) {
  return {...project, notes: project.notes.filter(note => note.id !== noteId)}
}

export function updateNote(text) {
  return {
    type: NOTE_UPDATE,
    payload: { text }
  }
}

function addNewNote(project, id, editTime, text) {
  const notes = project.notes;
  notes.push({id, editTime, text, userName: 'Томас', avatar: avatar_3});
  return {...project, notes};
}

function handleUpdateNote(project, text, noteId) {
  const notes = project.notes.map(_note => {
    const note = {..._note};
    if(note.id === noteId) {
      note.text = text;
    }
    return note;
  });
  return {...project, notes};
}