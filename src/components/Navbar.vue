<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list nav dense>

        <v-list-item link to="/developments">
          <v-list-item-action>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Desarrollos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/properties">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Propiedades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/main-banner">
          <v-list-item-action>
            <v-icon>mdi-image-size-select-actual</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Banners</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/vacancies">
          <v-list-item-action>
            <v-icon>mdi-briefcase</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bolsa de trabajo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/blog">
          <v-list-item-action>
            <v-icon>mdi-blogger</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Blog</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/reward">
          <v-list-item-action>
            <v-icon>mdi-gift</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Corte comercial</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/reviews">
          <v-list-item-action>
            <v-icon>mdi-message-processing</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reseñas clientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" flat dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-black">Rentax</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <span class="font-weight-medium mr-3">{{ user.firstName }}</span> -->
      <span class="font-weight-medium mr-3">Admin</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logOut()">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    drawer: null
  }),

  computed: {
    ...mapState(["user"])
  },

  methods: {
    ...mapActions(["borrarToken", "updateUser"]),

    logOut() {
      this.updateUser({});
      this.borrarToken(null);
      this.$router.push({ name: "login" });
    }
  }
};
</script>
