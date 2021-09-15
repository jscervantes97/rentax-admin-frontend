<template> 
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list nav dense>

        <v-list-item link to="/dashboard">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/home.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/developments">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/desarrollos.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Desarrollos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/commercial">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/areasComerciales.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Áreas Comerciales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/placesAndOffices">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/plazasyOficinas.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Plazas y Oficinas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/goods">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/bienesRaices.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bienes Raíces</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/properties">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/propiedades.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Propiedades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/main-banner">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/banners.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Banners</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/reward">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/corteComercial.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Corte comercial</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/galery">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/galeriaDeProyectos.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Galeria de Proyectos </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/reviews">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/testimonios.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Testimonios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/contactRequests">
          <v-list-item-action>
            <v-img
            max-height="25"
            max-width="25"
            src="../assets/Iconos/Iconos_azul/solicitudesDeContacto.png"
            ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Solicitudes de Contacto</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white" flat dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="green"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-black">
        <v-img
        max-height="67"
        max-width="80"
        src="../assets/logorentax.jpg"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <span class="font-weight-medium mr-3">{{ user.firstName }}</span> -->
       <v-menu offset-y style="border-right: solid;">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon color="#c4c2be">mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Notificaciones</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="font-weight-medium mr-3" style="color:gray;border-left: solid; padding-left:5px;">Admin</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon color="green">mdi-chevron-down</v-icon>
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
