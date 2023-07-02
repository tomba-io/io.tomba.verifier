<template>
  <div>
    <v-card v-if="emails.length > 0" max-width="600" class="mx-auto">
      <v-list subheader two-line>
        <v-list-item v-for="(data, key) in paginatedData" :key="key">
          <v-list-item-avatar>
            <v-avatar color="red">
              <span class="white--text text-h5">
                {{ data.email.email.charAt(0).toUpperCase() }}
              </span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="data.email.email"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="onClick(data.email.email)">
                {{
                  data.email.result === 'deliverable'
                    ? 'mdi-check-circle'
                    : data.email.result === 'risky' && data.email.accept_all
                    ? 'mdi-asterisk-circle-outline'
                    : data.email.block
                    ? 'mdi-help-circle'
                    : 'mdi-close-circle'
                }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </v-card>
    <v-card v-else max-width="600" class="mx-auto">
      <!-- <v-img :src="image"></v-img> -->
      <v-card-title>No Result, yet.</v-card-title>
      <v-card-text>
        Use the Email Verifier to Verify a professional email.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onClick">New Verifier</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'History',
  data: () => ({
    image: 'https://app.tomba.io/assets/img/empty.png',
    page: 1,
    itemsPerPage: 10,
  }),
  computed: {
    emails() {
      return this.$store.getters.emails
    },
    pages() {
      return Math.ceil(this.emails.length / this.itemsPerPage)
    },
    paginatedData() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.emails.slice(start, end)
    },
  },
  mounted() {
    this.loadState()
  },
  methods: {
    loadState() {
      if (localStorage.getItem('emails')) {
        this.$store.commit('loadJSON', localStorage.getItem('emails'))
      }
    },
    onClick(email) {
      setTimeout(() => {
        this.$router.push({ path: `/?email=${email}` })
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped></style>
