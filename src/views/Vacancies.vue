<template>
  <div class="vacancies">
    <!-- Delete dialog-->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline error white--text" dark>Eliminar desarrollo</v-card-title>

        <v-card-title>¿Seguro desea eliminar la vacante {{ selectedDevelopment.title}} ?</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog=false">Cancelar</v-btn>
          <v-btn color="error" text @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <h2 class="grey--text">Bolsa de trabajo</h2>

      <!-- Toolbar -->
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-btn color="primary" depressed link to="/add-vacancy">Agregar vacante</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
        </v-col>
      </v-row>

      <v-card class="pa-2 mt-3" outlined>
        <v-data-table
          :headers="headers"
          :items="vacancies"
          :items-per-page="10"
          item-key="title"
          :options.sync="options"
          :server-items-length="totalItems"
          :footer-props="{
            itemsPerPageText: 'Vacantes por página'
          }"
          :loading="loading"
          loading-text="Cargando..."
          disable-sort
        >

          <template v-slot:item.actions="{ item }">
            <v-btn text small color="primary" :to="{ name: 'edit-vacancy', params: { id: item._id} }">Editar</v-btn>
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
      sectors: [],
      newSector: null,
      loading: true,
      vacancies: [],
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
        this.getVacancies();
      },
      deep: true
    }
  },
  mounted() {
    this.getVacancies();
  },
  methods: {

    getVacancies() {
      const { page, itemsPerPage } = this.options;

      this.loading = true;

      this.$http
        .get(
          `vacancy/?page=1&limit=1000`
        )
        .then((res) => {
          this.vacancies = res.data.data;
          this.totalItems = res.data.data.length;
          
          if (itemsPerPage > 0) {
            this.vacancies = this.vacancies.slice(
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
        .delete(`vacancy/${this.selectedDevelopment.id}`)
        .then(() => {
          this.getVacancies();
          this.dialog = false;
          this.$store.commit("SNACKBAR", {
            text: "Vacante eliminada con exito",
            type: "success",
            isShow: true
          });
          this.selectedDevelopment.id = null;
          this.selectedDevelopment.title = null;
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>
>
