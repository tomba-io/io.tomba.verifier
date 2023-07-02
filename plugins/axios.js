export default function ({ $axios, redirect }) {
  $axios.setBaseURL('http://api.tomba.io/v1')
  $axios.onError((error) => {
    if (error.response.status === 500) {
      // redirect('/sorry')
    }
  })
}
