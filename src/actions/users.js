export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_VOTE = 'UPDATE_USER_VOTE';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function updateUserVote({ qid, authedUser, answer }) {
    return {
        type: UPDATE_USER_VOTE,
        qid,
        authedUser,
        answer
    }
}

export function addQuestionUser({ qid, authedUser }) {
    return {
        type: ADD_QUESTION_USER,
        qid,
        authedUser
    }
}
