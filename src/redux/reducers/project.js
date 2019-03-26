const STATE_KEY = 'project';

const SET_PROJECT = `${STATE_KEY}/SET_PROJECT`;
const NOTE_REMOVED = `${STATE_KEY}/NOTE_REMOVED`;
const ACTIVE_NODE = `${STATE_KEY}/ACTIVE_NODE`;
const NOTE_UPDATE = `${STATE_KEY}/NOTE_UPDATE`;

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

    case NOTE_UPDATE: {
      const { text } = action.payload
      const project = handleUpdateNote(state.project, text, state.activeNote);
      return {
        ...state,
        project
      }
    }

    default: {
      return state;
    }
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