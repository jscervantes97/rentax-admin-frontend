<template>
  <div class="properties">
    <!-- Delete dialog-->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline error white--text" dark>Eliminar desarrollo</v-card-title>

        <v-card-title>¿Seguro desea eliminar {{ selectedProperty.title}} ?</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <h2 class="grey--text">Propiedades</h2>

      <!-- Toolbar -->
      <v-row>
        <v-col cols="12" md="4" class="d-flex align-center">
          <v-btn color="primary" depressed link to="/add-property">Agregar propiedad</v-btn>
        </v-col>
        <v-col cols="12" md="8" class="d-flex align-center">
          <!-- <v-text-field class="mr-4" label="Buscar desarrollo" prepend-icon="mdi-magnify"></v-text-field>
          <v-select v-model="select" :items="itemsCombo" label="Desarrollo" required></v-select> -->
        </v-col>
      </v-row>

      <v-card class="pa-2 mt-3" outlined>
        <v-data-table
          :headers="headers"
          :items="properties"
          :items-per-page="10"
          item-key="title"
          :options.sync="options"
          :server-items-length="totalItems"
          :footer-props="{
            itemsPerPageText: 'Propiedades por página'
          }"
          :loading="loading"
          loading-text="Cargando propiedades..."
          disable-sort
        >
          <template v-slot:item.actions="{ item }">
            <v-btn text small color="primary" :to="{ name: 'edit-property', params: { id: item._id} }">Editar</v-btn>
            <!-- <v-btn text small color="primary">Editar</v-btn> -->
            <v-btn text small color="error" @click="openDelete(item._id, item.title)">Eliminar</v-btn>
          </template>

        </v-data-table>
      </v-card>

      
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      properties: [],
      headers: [
        { text: "Título", value: "title" },
        { text: "Desarrollo", value: "development.title" },
        { text: "Acciones", value: "actions" },
      ],
      selectedProperty: {
        id: null,
        title: null,
      },
      itemsPerPageArray: [10, 15, 20],
      itemsPerPage: 20,
      options: {},
      totalItems: 0
    };
  },
  watch: {
    options: {
      handler() {
        this.getProperties();
      },
      deep: true
    }
  },
  mounted() {
    this.getProperties();
  },
  methods: {
    getProperties() {
      const { page, itemsPerPage } = this.options;
      
      this.loading = true;

      this.$http
        .get(`property`)
        .then((res) => {
          console.log(res)
          this.properties = res.data.data;
          this.totalItems = res.data.data.length;

          if (itemsPerPage > 0) {
            this.properties = this.properties.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            );
          }

          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    openDelete(id, title) {
      this.dialog = true;
      this.selectedProperty.id = id;
      this.selectedProperty.title = title;
    },
    confirmDelete() {
      this.$http
        .delete(`property/${this.selectedProperty.id}`)
        .then(() => {
          this.dialog = false;
          this.$store.commit("showAppStatus", {
            message: "Propiedad eliminada con exito",
            isShow: true,
            type: "success",
          });
          this.selectedProperty.id = null;
          this.selectedProperty.title = null;
          this.getProperties();
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>
>
