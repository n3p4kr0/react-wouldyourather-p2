import { saveUser } from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_VOTE = 'UPDATE_USER_VOTE';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';
export const ADD_USER = 'ADD_USER';

// Called when the data is fetched from the API, when App is mounted
export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

// Called when the User votes for any option of a Question
export function updateUserVote({ qid, authedUser, answer }) {
    return {
        type: UPDATE_USER_VOTE,
        qid,
        authedUser,
        answer
    }
}

// Called when the User creates a new question, to add it to the User's "questions" property
export function addQuestionUser({ qid, authedUser }) {
    return {
        type: ADD_QUESTION_USER,
        qid,
        authedUser
    }
}

function addUser ({ id, name, avatarURL }) {
    return {
        type: ADD_USER,
        id,
        name,
        avatarURL
    }
}

export function handleAddUser( { name, avatarURL }) {
    return (dispatch) => {
        return saveUser({ name, avatarURL })
          .then((data) => {
            dispatch(addUser(data))
        })
      }
}