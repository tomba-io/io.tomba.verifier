<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Connection
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="blue" small v-bind="attrs" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <span class="py-6"> Connection To Tomba </span>
          </v-tooltip>
        </v-card-title>
        <v-form ref="form" @submit.prevent="onConnect">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-text-field
                  ref="key"
                  v-model="ikey"
                  label="API key"
                  prepend-icon="mdi-key"
                  :disabled="!key && !secret ? false : true"
                  required
                  :rules="keyRules"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-text-field
                  v-model="isecret"
                  label="Secret Key"
                  prepend-icon="mdi-key"
                  :disabled="!key && !secret ? false : true"
                  required
                  :rules="SecretRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-btn
                  v-if="!key && !secret"
                  :loading="loading"
                  type="submit"
                  color="primary"
                >
                  <v-icon left> mdi-connection </v-icon> Connect
                </v-btn>
                <v-btn
                  v-if="key && secret"
                  :loading="loading"
                  color="red"
                  @click="onDisconnect"
                >
                  Disconnect
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-alert v-if="error" type="error" dismissible>
                  Failed to connect to Tomba !!
                </v-alert>
                <v-alert v-if="success" type="success" dismissible>
                  Successfully Connect to Tomba.
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <br />
      <br />
      <v-card v-if="!key && !secret">
        <!-- <v-img :src="image"></v-img> -->
        <v-card-title>Still don't have an account on Tomba? </v-card-title>
        <v-card-text>
          Tomba is the easiest way to find the email address of anyone.
        </v-card-text>
        <v-card-actions>
          <v-btn @click="onClick">
            <v-icon left> mdi-account-plus</v-icon> Connect Create a free
            account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Connection',
  data() {
    return {
      ikey: localStorage.getItem('key'),
      isecret: localStorage.getItem('secret'),
      account: localStorage.getItem('account'),
      keyRules: [
        (value) => !!value || 'API KEY is required',
        (value) => (value || '').length <= 40 || 'Max 40 characters',
      ],
      SecretRules: [
        (value) => !!value || 'Secret KEY is required',
        (value) => (value || '').length <= 40 || 'Max 40 characters',
      ],
      success: false,
      error: false,
      loading: false,
    }
  },
  computed: {
    key() {
      return this.$store.getters.key
    },
    secret() {
      return this.$store.getters.secret
    },
  },
  watch: {
    ikey(newVal, oldVal) {
      console.log(newVal, oldVal)
    },
  },
  beforeMount() {
    this.loadState()
  },
  mounted() {
    this.loadState()
  },
  methods: {
    saveState() {
      localStorage.setItem('key', this.$store.getters.key)
      localStorage.setItem('secret', this.$store.getters.secret)
      localStorage.setItem('account', this.$store.getters.account)
    },
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
    },
    onConnect() {
      this.error = false
      if (this.$refs.form.validate()) {
        this.loading = true
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
        TombaInstance(this.ikey, this.isecret)
          .get(`/me`)
          .then((res) => {
            this.success = true
            this.loading = false
            this.$store.commit('setKey', this.ikey)
            this.$store.commit('setSecret', this.isecret)
            this.$store.commit('setAccount', JSON.stringify(res.data.data))
            this.saveState()
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 4000)
          })
          .catch((err) => {
            this.error = true
            this.loading = false
            console.log(err)
            this.$refs.key.focus()
          })
      }
    },
    onDisconnect() {
      this.ikey = ''
      this.isecret = ''
      localStorage.removeItem('key')
      localStorage.removeItem('secret')
      localStorage.removeItem('account')
      this.loading = false
      window.location.reload()
    },
    onClick() {
      window.open(
        'https://app.tomba.io/auth/register?utm_source=io.tomba.verifier&utm_medium=io.tomba.verifier&utm_campaign=io.tomba.verifier&utm_content=io.tomba.verifier',
        '_blank'
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
