export const RECEIVE_USERS = 'RECEIVE_USERS';
export const UPDATE_USER_VOTE = 'UPDATE_USER_VOTE';

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

export default receiveUsers