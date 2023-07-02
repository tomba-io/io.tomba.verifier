// import Cookies from 'js-cookie'
export default {
  key: (state) => state.key,
  secret: (state) => state.secret,
  account: (state) => state.account,
  emails: (state) => state.emails,
  toJSON(state) {
    return JSON.stringify(state.emails)
  },
}
