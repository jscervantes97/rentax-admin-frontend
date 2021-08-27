<template>
  <v-app>
    <Navbar />
    <v-main class="grey lighten-4">
      <router-view />
      <v-snackbar
        v-model="getAppStatus.isShow"
        :color="getAppStatus.type"
        timeout="5000"
      >
        {{ getAppStatus.text }}
        <template v-slot:action="{ attrs }">
          <v-btn icon text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    snackbar: true
  }),
  computed: {
    getAppStatus() {
      return this.$store.state.snackbar;
    }
  }
};
</script>
