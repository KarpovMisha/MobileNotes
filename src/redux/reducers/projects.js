import AsyncStorage from '@react-native-community/async-storage';

const avatar_1 = require('../../images/avatar_1.jpg');
const avatar_2 = require('../../images/avatar_2.jpg');
const avatar_3 = require('../../images/avatar_3.jpg');

const STATE_KEY = 'projects';
const ADD_PROJECT = `${STATE_KEY}/ADD_PROJECT`;
const INIT_PROJECTS = `${STATE_KEY}/INIT_PROJECTS`;

const user_1 = {
  userName: 'Мурзик',
  avatar: avatar_2
}

const user_2 = {
  userName: 'Томас',
  avatar: avatar_3
}

const currentUser = {
  userName: 'Корнелиус',
  avatar: avatar_1
}

const initialState = {
  projects: [
    {
      id: 'project_1',
      name: 'Первый тестовый проект',
      notes: [
        {
          id: '1',
          ...user_2,
          editTime: 'Mon Aug 27 2018',
          text: 'Тестирую возможности приложения'
        }
      ]
    },
    {
      id: 'project_2',
      name: 'Кража сосиски',
      notes: [
        {
          id: '1',
          ...user_1,
          editTime: 'Sat Aug 25 2018',
          text: 'Активные действия беру на себя!'
        },
        {
          id: '2',
          ...user_2,
          editTime: 'Sun Aug 26 2018',
          text: 'Я отвлеку хозяина'
        },
        {
          id: '3',
          ...currentUser,
          editTime: 'Mon Aug 27 2018',
          text: 'Парни, в этот раз без меня. Я пока отлежусь. Позовите, если у вас все получится'
        }
      ]
    }
  ]
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT: {
      const { id, name } = action.payload;
      const oneMore = handleProject(state.projects, id, name);
      const newState = {...state, projects: oneMore};

      AsyncStorage.setItem('projects', JSON.stringify(newState));
      return newState;
    }

    case INIT_PROJECTS: {
      return action.payload.projects;
    }

    default: {
      return state;
    }
  }
}

export function initiaProjectsFromStore(projects) {
  return {
    type: INIT_PROJECTS,
    payload: { projects }
  }
}

function handleProject(projects, id, name) {
  const newProjects = [...projects, {id, name, notes: [] }];
  return newProjects;
}

export function addProject(id, name) {
  return {
    type: ADD_PROJECT,
    payload: { id, name }
  }
}
