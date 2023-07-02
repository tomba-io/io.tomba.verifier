<template>
  <div>
    <v-card max-width="600" class="mx-auto">
      <v-container class="about-container">
        <v-row align="center" justify="center">
          <tomba-logo />
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6">
            <div class="info-container">
              <h3>Contact anyone.</h3>
              <p class="version">Version: {{ pkg.version }}</p>
              <p class="released-at">Released at: {{ pkg.releasedAt }}</p>
              <p class="copyright">
                &copy; Copyright {{ currentYear }} Tomba technology web service
                LLC
              </p>
              <hr class="my-3" />
              <div class="social-media">
                <div class="text-xs-right">
                  <em><small>Follow us on</small></em>
                </div>
                <v-btn
                  icon
                  href="https://twitter.com/tombaplatforum"
                  target="_blank"
                >
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://www.facebook.com/tombaplatforum"
                  target="_blank"
                >
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://www.linkedin.com/company/tomba-io/"
                  target="_blank"
                >
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
              </div>
              <hr class="my-3" />
              <div class="social-media">
                <div class="text-xs-right">
                  <em><small>Other apps</small></em>
                </div>
                <v-btn
                  icon
                  href="https://workspace.google.com/marketplace/app/tomba_for_sheets/915979967841"
                  target="_blank"
                >
                  <v-icon>mdi-google-spreadsheet</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://appsource.microsoft.com/en-us/product/office/WA200003632"
                  target="_blank"
                >
                  <v-icon>mdi-microsoft-excel</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import pkg from '../../package.json'

export default {
  name: 'About',
  data() {
    return {
      pkg,
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
.about-container {
  text-align: center;
  margin-top: 50px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  max-width: 200px;
}

.version,
.released-at,
.social-media {
  margin-bottom: 10px;
}

.social-media v-btn {
  margin-right: 5px;
}
</style>
