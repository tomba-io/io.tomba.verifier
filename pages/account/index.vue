<template>
  <v-container>
    <v-card v-if="account">
      <v-card-title>
        <h2>
          Account Information
          <!-- {{ account }} -->
        </h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="8" sm="4">
            <v-avatar size="120">
              <img :src="account.image" alt="Profile Image" />
            </v-avatar>
            <p>{{ account.first_name + ' ' + account.last_name }}</p>
            <strong>{{ account.pricing.name }} plan </strong>
          </v-col>
          <v-col cols="8" sm="4">
            <!-- <v-text-field
              v-model="account.first_name + ' ' + account.last_name"
              label="Full Name"
              readonly
            ></v-text-field> -->
            <v-text-field
              v-model="account.email"
              label="Email"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="account.pricing.available_searches"
              label="Searches"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="account.pricing.available_verifications"
              label="Verifications"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="account.pricing.available_phones"
              label="Phone"
              readonly
            ></v-text-field>
            <!-- <v-text-field
              v-model="account.country"
              label="Country"
              readonly
            ></v-text-field> -->
          </v-col>
          <v-col cols="8" sm="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="account.pricing.name == 'Free' ? 'red' : 'green'"
                  >
                    {{
                      account.pricing.name === 'Free'
                        ? 'mdi-close'
                        : 'mdi-check'
                    }}
                  </v-icon>
                  CRM integrations
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="account.pricing.name == 'Free' ? 'red' : 'green'"
                  >
                    {{
                      account.pricing.name === 'Free'
                        ? 'mdi-close'
                        : 'mdi-check'
                    }}
                  </v-icon>
                  Bulk tasks
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="account.pricing.name == 'Free' ? 'red' : 'green'"
                  >
                    {{
                      account.pricing.name === 'Free'
                        ? 'mdi-close'
                        : 'mdi-check'
                    }}
                  </v-icon>
                  Domain Search export
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="account.pricing.name == 'Free' ? 'red' : 'green'"
                  >
                    {{
                      account.pricing.name === 'Free'
                        ? 'mdi-close'
                        : 'mdi-check'
                    }}
                  </v-icon>
                  Domain Search export
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="account.pricing.name == 'Free' ? 'red' : 'green'"
                  >
                    {{
                      account.pricing.name === 'Free'
                        ? 'mdi-close'
                        : 'mdi-check'
                    }}
                  </v-icon>
                  Teams
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="account.pricing.name == 'Free' ? 'red' : 'green'"
                  >
                    {{
                      account.pricing.name === 'Free'
                        ? 'mdi-close'
                        : 'mdi-check'
                    }}
                  </v-icon>
                  Webhooks
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    href="https://app.tomba.io/accounts/edit?utm_source=extension&utm_medium=extension&utm_campaign=extension&utm_content=option_page"
                    target="__blank"
                    color="primary"
                  >
                    Edit
                  </v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card"></v-skeleton-loader>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      account: JSON.parse(localStorage.getItem('account')),
      snackbar: false,
      text: `Connect to view information about the current account.`,
    }
  },
  mounted() {
    if (!this.account) {
      this.snackbar = true
      setTimeout(() => {
        this.$router.push({ path: '/connection' })
      }, 1000)
    }
  },
}
</script>
