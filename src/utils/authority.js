// use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority () {
  return window.localStorage.getItem('authority') || 'guest'
}

export function setAuthority (authority) {
  return window.localStorage.setItem('authority', 'Admin')
}
