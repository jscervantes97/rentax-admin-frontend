<template>
  <v-app class="grey lighten-4">
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {
    setTimeout(() => {
      this.validateUser();
    }, 250);
  },

  methods: {
    ...mapGetters(["getToken"]),

    validateUser() {
      const currentRoute = this.$router.currentRoute;
      const token = this.getToken()
        ? this.getToken().trim().length !== 0
        : false;
      if (!currentRoute.name) {
        if (!token) {
          this.$router.push({ name: "login" });
        } else if (token) {
          this.$router.push({ name: "dashboard" });
        }
        return;
      }
      if (!token && currentRoute.name !== "login") {
        this.$router.push({ name: "login" });
      } else if (token && currentRoute.name === "login") {
        this.$router.push({ name: "dashboard" });
      }
    }
  }
};
</script>
