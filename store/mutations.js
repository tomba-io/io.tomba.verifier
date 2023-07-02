// import Cookies from 'js-cookie'
export default {
  setKey(state, key) {
    state.key = key
  },
  setSecret(state, secret) {
    state.secret = secret
  },
  setAccount(state, account) {
    state.account = account
  },
  setEmails(state, emails) {
    state.emails = emails
  },
  addEmails(state, data) {
    state.emails.push(data)
  },
  loadJSON(state, json) {
    state.emails = JSON.parse(json)
  },
}
