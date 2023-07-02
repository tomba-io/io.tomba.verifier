export default {
  setKey({ commit }, input) {
    commit('setKey', input)
  },
  setSecret({ commit }, input) {
    commit('setSecret', input)
  },
  setAccount({ commit }, input) {
    commit('setAccount', input)
  },
  setEmails({ commit }, input) {
    commit('setEmails', input)
  },
}
