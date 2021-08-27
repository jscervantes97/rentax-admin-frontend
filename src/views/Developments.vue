<template>
  <div class="developments">
    <v-dialog v-model="sectorDialog" width="700">
      <v-card>
        <v-card-title>Sectores</v-card-title>
        <v-card-text>
          <v-text-field
              label="Nombre del sector"
              v-model="newSector"
          ></v-text-field>
          <v-btn color="primary" depressed @click="addSector()">Agregar</v-btn>
          <v-divider class="grey my-3"></v-divider>
        </v-card-text>
        <v-card-text>
          <v-data-table
            :headers="sectorHeaders"
            :items="sectors"
            :items-per-page="5"
            class="elevation-0"
            hide-default-footer
          >
            <template v-slot:item.actions="{ item }">
              <v-btn text small color="error" @click="deleteSector(item._id)">Eliminar</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  
    <!-- Delete dialog-->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline error white--text" dark>Eliminar desarrollo</v-card-title>

        <v-card-title>¿Seguro desea eliminar {{ selectedDevelopment.title}} ?</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog=false">Cancelar</v-btn>
          <v-btn color="error" text @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <h2 class="grey--text">Desarrollos</h2>

      <!-- Toolbar -->
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-btn color="primary" depressed link to="/add-development">Agregar desarrollo</v-btn>
          <v-btn color="secondary" depressed class="ml-3" @click="sectorDialog = true">Sectores</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <!-- <v-text-field label="Buscar desarrollo" prepend-icon="mdi-magnify"></v-text-field> -->
        </v-col>
      </v-row>

      <v-card class="pa-2 mt-3" outlined>
        <v-data-table
          :headers="headers"
          :items="developments"
          :items-per-page="10"
          item-key="title"
          :options.sync="options"
          :server-items-length="totalItems"
          :footer-props="{
            itemsPerPageText: 'Desarrollos por página'
          }"
          :loading="loading"
          loading-text="Cargando desarrollos..."
          disable-sort
        >
          <template v-slot:item.actions="{ item }">
            <v-btn text small color="primary" :to="{ name: 'edit-development', params: { id: item._id} }">Editar</v-btn>
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
      sectorDialog: false,
      sectors: [],
      newSector: null,
      loading: true,
      developments: [],
      sectorHeaders: [
        { text: "Nombre", value: "title" },
        { text: "Acciones", value: "actions" }
      ],
      headers: [
        { text: "Titulo", value: "title" },
        { text: "Acciones", value: "actions" }
      ],
      selectedDevelopment: {
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
        this.getDevelopments();
      },
      deep: true
    }
  },
  mounted() {
    this.getDevelopments();
    this.getSectors();
  },
  methods: {
    getSectors() {
      this.$http
        .get(`sector/`)
        .then((res) => {
          this.sectors = res.data.data
        })
        .catch((error) => console.log(error));
    },
    addSector() {
      let form = {
        title: this.newSector
      }

      this.$http
        .post(`sector/`, form)
        .then((res) => {
          this.sectors = res.data.sectors
          this.getSectors()
        })
        .catch((error) => console.log(error));
    },
    deleteSector(item) {
      this.$http
        .delete(`sector/${item}`)
        .then((res) => {
          this.sectors = res.data.sectors;
          this.newSector = null;
          this.getSectors();
        })
        .catch((error) => console.log(error));
    },
    getDevelopments() {
      const { page, itemsPerPage } = this.options;

      this.loading = true;

      this.$http
        .get(
          `development/?page=1&limit=1000`
        )
        .then((res) => {
          this.developments = res.data.data;
          this.totalItems = this.developments.totalItems;
          
          if (itemsPerPage > 0) {
            this.developments = this.developments.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            );
          }

          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    openDelete(id, title) {
      this.dialog = true;
      this.selectedDevelopment.id = id;
      this.selectedDevelopment.title = title;
    },
    confirmDelete() {
      this.$http
        .delete(`development/${this.selectedDevelopment.id}`)
        .then(() => {
          this.getDevelopments();
          this.$store.commit("SNACKBAR", {
            text: "Desarrollo eliminado con exito",
            type: "success",
            isShow: true
          });
          this.dialog = false;

          this.selectedDevelopment.id = null;
          this.selectedDevelopment.title = null;
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>
>
