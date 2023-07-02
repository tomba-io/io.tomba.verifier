<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <strong>Format</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <span class="py-6">
                We verify that the email address has the correct format and is
                not gibberish.
              </span>
            </v-tooltip>
            <span
              :class="
                data.email.regex && !1 === data.email.gibberish
                  ? 'right vgreen'
                  : 'right vred'
              "
            >
              {{
                data.email.regex && !1 === data.email.gibberish
                  ? 'Valid'
                  : data.email.gibberish
                  ? 'Gibberish'
                  : 'Invalid'
              }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <strong>Server status</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <span class="py-6">
                We verify that MX records are present for the domain and that we
                can connect to the SMTP server these MX records point to.
              </span>
            </v-tooltip>
            <span
              :class="data.email.mx_records ? 'right vgreen' : 'right vred'"
            >
              {{ data.email.mx_records ? 'Valid' : 'Invalid' }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <strong>Type</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <span class="py-6">
                We verify that the domain name isn't used for webmails or for
                creating temporary email addresses.
              </span>
            </v-tooltip>
            <span
              :class="
                data.email.webmail && data.email.disposable
                  ? 'right vred'
                  : 'right vgreen'
              "
            >
              {{
                data.email.webmail && data.email.disposable
                  ? data.email.webmail
                    ? 'Webmail'
                    : 'Disposable'
                  : 'Professional'
              }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <strong>Email status</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <div class="py-6">
                <p>
                  We check if the email address exists and can receive emails.
                  Four results are possible:
                </p>
                <ul>
                  <li>
                    <strong class="vgreen">Valid</strong>: the email address can
                    receive emails.
                  </li>
                  <li>
                    <strong class="dark-orange">Accept all</strong>: the email
                    address can receive emails but any email address on this
                    domain can.
                  </li>
                  <li>
                    <strong class="dark-orange">Blocked</strong>: the server
                    prevented us to perform the verification.
                  </li>
                  <li>
                    <strong class="vred">Invalid</strong>: the email address
                    can't receive emails.
                  </li>
                </ul>
              </div>
            </v-tooltip>
            <span
              :class="
                data.email.result === 'deliverable'
                  ? 'right vgreen'
                  : data.email.accept_all
                  ? 'right vdark-orange'
                  : data.email.block
                  ? 'right vdark-orange'
                  : 'right vred'
              "
            >
              {{
                data.email.result === 'deliverable'
                  ? 'Valid'
                  : data.email.accept_all
                  ? 'Accept all'
                  : data.email.block
                  ? 'Blocked'
                  : 'Invalid'
              }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="data.email.whois.created_date" cols="12">
        <v-card>
          <v-card-text>
            <strong>Whois Date</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <span class="py-6">
                The creation date is when this domain was originally registevred
              </span>
            </v-tooltip>
            <span class="right">
              {{ data.email.whois.created_date }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="data.email.whois.referral_url" cols="12">
        <v-card>
          <v-card-text>
            <strong>RWhois</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <span class="py-6">
                RWhois (Referral Whois) is a directory services protocol which
                extends and enhances the Whois concept in a hierarchical and
                scalable fashion.
              </span>
            </v-tooltip>
            <span class="right">
              <a
                :href="data.email.whois.referral_url + '?ref=tomba.io'"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ data.email.whois.referral_url.toLowerCase() }}
              </a>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="data.email.whois.registrar_name" cols="12">
        <v-card>
          <v-card-text>
            <strong>Whois Name</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline</v-icon
                >
              </template>
              <span class="py-6">
                A domain name registrar is a business that handles the
                reservation of domain names as well as the assignment of IP
                addresses for those domain names
              </span>
            </v-tooltip>
            <span class="right">
              <v-avatar v-if="data.email.whois.referral_url" size="37">
                <img
                  :src="
                    'https://www.google.com/s2/favicons?sz=24&domain=' +
                    data.email.whois.referral_url
                  "
                  alt="favicons"
                />
              </v-avatar>
              {{ data.email.whois.registrar_name }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="data.sources.length > 0" cols="12">
        We found
        <strong>{{ data.sources ? data.sources.length : 0 }} sources</strong>
        for <strong>{{ data.email.email }}</strong> on the web.
        <br />
        <v-list subheader two-line>
          <v-list-item v-for="(source, key) in data.sources" :key="key">
            <v-list-item-content>
              <v-list-item-title v-text="source.uri"></v-list-item-title>
              <v-list-item-subtitle
                v-text="source.extracted_on"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    @click="onClick(source.uri)"
                    v-on="on"
                  >
                    <v-icon color="grey lighten-1">mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span class="py-6"> open url </span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col v-else>
        <strong>
          We couldn't find this email address publicly available on the web.
        </strong>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  methods: {
    onClick(uri) {
      window.open(uri, '_blank')
    },
  },
}
</script>
<style>
.vgreen {
  color: #52c41a;
}
.dark-orange {
  color: #ff572b;
}
.vred {
  color: #ef1d1d;
}
.right {
  float: right;
}
</style>
