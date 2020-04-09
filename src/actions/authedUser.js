export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'

export function setAuthedUser (action) {
  return {
    type: SET_AUTHED_USER,
    id: action.id
  }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function login(id) {
  return {
      type: LOGIN,
      id
  }
}
