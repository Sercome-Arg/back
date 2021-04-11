import { fetchUtils } from 'react-admin';

const apiUrl = process.env.REACT_APP_BASE_URL
const empresa = process.env.REACT_APP_COMPANY

export default {

  login: async ({ username, password }) => {

    const httpClient = fetchUtils.fetchJson;

    return httpClient(apiUrl + '/auth/login?database=' + empresa, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password: password
      }),
    }).then(response => {

      let user = response.json.result.user
      let token = response.json.result.token.token
      let sessionId = response.json.result.session._id

      localStorage.setItem('username', username)

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('session_token', token)
      localStorage.setItem('session_id', sessionId)

      // let permissions = []
      // let permissionsReturn = []

      // permissions = user?.rolRef?.permission || []

      // permissions.map(perm => {
      //   if(perm.perm.number !== undefined) permissionsReturn.push(perm.perm.number)
      // })

      localStorage.setItem('permissions', user._id)

      return {
        data: { id: 'asd' }
      }
    })
  },

  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('username')
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: async () => {

    const httpClient = fetchUtils.fetchJson;
    let userId = ''

    if(localStorage.getItem('permissions') !== undefined) {
      userId = localStorage.getItem('permissions')
    }

    return httpClient(apiUrl + '/permission/by?user=' + userId).then(response => {
      return response.json.result
    })
  },
};