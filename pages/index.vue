<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline py-2">
          Tomba Email Verifier
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="blue" small v-bind="attrs" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <span class="py-6">
              Enter an email address below to check in real-time if it's real
            </span>
          </v-tooltip>
        </v-card-title>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-text-field
                  v-model="email"
                  placeholder="name@company.com"
                  label="Email"
                  required
                  :rules="emailRules"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-btn type="submit" color="primary">
                  <v-icon left> mdi-email</v-icon>Verify
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <br v-if="disposable" />
      <v-alert v-if="disposable" type="info" dismissible>
        This domain name is used to hide real email addresses so we don't
        perform the verification. 💡
      </v-alert>
      <br v-if="webmail" />
      <v-alert v-if="webmail" type="info" dismissible>
        Tomba is designed to contact other professionals. This domain name is
        used to create personal email addresses so we don't perform the
        verification. 💡
      </v-alert>
      <v-skeleton-loader v-if="load" type="card"></v-skeleton-loader>
      <br />
      <verify v-if="show" :data="data" />
    </v-flex>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailRules: [
        (value) => !!value || 'Email is required',
        (value) => /.+@.+\..+/.test(value) || 'Invalid email address',
      ],
      show: false,
      load: false,
      data: null,
      disposable: false,
      webmail: false,
      account: JSON.parse(localStorage.getItem('account')),
      snackbar: false,
      text: `Connect to Verifier this email.`,
    }
  },
  computed: {
    key() {
      return this.$store.getters.key
    },
    secret() {
      return this.$store.getters.secret
    },
    emails() {
      return this.$store.getters.emails
    },
  },
  mounted() {
    if (this.$route.query.email) {
      this.email = this.$route.query.email
    }
    this.loadState()
  },
  methods: {
    loadState() {
      if (localStorage.getItem('key')) {
        this.$store.commit('setKey', localStorage.getItem('key'))
      }
      if (localStorage.getItem('secret')) {
        this.$store.commit('setSecret', localStorage.getItem('secret'))
      }
      if (localStorage.getItem('account')) {
        this.$store.commit('setAccount', localStorage.getItem('account'))
      }
      if (localStorage.getItem('emails')) {
        this.$store.commit('loadJSON', localStorage.getItem('emails'))
      }
    },
    saveState() {
      localStorage.setItem('emails', this.$store.getters.toJSON)
    },
    checkEmail(email) {
      const foundEmail = this.emails.find(
        (entry) => entry.email.email === email
      )
      return foundEmail
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.load = true
        this.disposable = false
        this.webmail = false
        if (!this.account) {
          this.load = false
          // console.log(this.checkEmail(this.email))
          this.snackbar = true
          setTimeout(() => {
            this.$router.push({ path: '/connection' })
          }, 1000)
        } else if (this.checkEmail(this.email)) {
          this.load = false
          this.show = true
          this.data = this.checkEmail(this.email)
        } else {
          // Form is valid, you can perform further actions here
          const TombaInstance = (key, secret) =>
            this.$axios.create({
              baseURL: 'https://api.tomba.io/v1',
              headers: {
                'X-Tomba-Key': key,
                'X-Tomba-Secret': secret,
                'X-Tomba-Origin': 'extension',
              },
            })
          TombaInstance(this.key, this.secret)
            .$get(`/email-verifier/${this.email}`)
            .then((rest) => {
              this.data = rest.data
              console.log(this.data)
              this.load = false
              if (!this.data.email.disposable && !this.data.email.webmail) {
                this.show = true
                this.$store.commit('addEmails', this.data)
                this.saveState()
              }
              if (this.data.email.disposable) {
                this.disposable = true
              }
              if (this.data.email.webmail) {
                this.webmail = true
              }
            })
            .catch((err) => {
              // this.$router.push(`/verify`)
              console.log(err)
              this.load = false
            })
        }
      }
    },
  },
}
</script>
