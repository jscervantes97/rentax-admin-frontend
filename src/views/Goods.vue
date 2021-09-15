<template>
  <div class="posts">
    <!-- Delete dialog-->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline error white--text" dark>Eliminar reseña</v-card-title>

        <v-card-title>¿Seguro desea eliminar la solicitud {{ selectedReview.customer }} ?</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog=false">Cancelar</v-btn>
          <v-btn color="error" text @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <h2 class="grey--text">Bienes Raíces</h2>
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-btn color="primary" depressed link to="/add-good">Agregar Nuevo Bien Raiz</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
        </v-col>
      </v-row>

      <v-card class="pa-2 mt-3" outlined>
        <v-data-table
          :headers="headers"
          :items="reviews"
          :items-per-page="10"
          item-key="_id"
          :options.sync="options"
          :server-items-length="totalItems"
          :footer-props="{
            itemsPerPageText: 'Reseñas por página'
          }"
          :loading="loading"
          loading-text="Cargando..."
          disable-sort
        >

          <template v-slot:item.actions="{ item }">
            <!-- <v-btn text small color="primary" :to="{ name: 'edit-post', params: { id: item._id} }">Editar</v-btn> -->
            <v-btn text small color="primary" @click="openDelete(item._id, item.customer)">Ver</v-btn>
            <v-btn text small color="error" @click="openDelete(item._id, item.customer)">Eliminar</v-btn>
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
      reviews: [],
      loading: true,
      headers: [
        { text: "Nombre", value: "customer" },
        { text: "Acciones", value: "actions" }
      ],
      selectedReview: {
        id: null,
        customer: null,
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
        this.getReviews();
      },
      deep: true
    }
  },
  mounted() {
    this.getReviews();
  },
  methods: {
    getReviews() {
      const { page, itemsPerPage } = this.options;

      this.loading = true;

      this.$http
        .get(
          `review?page=1&limit=1000`
        )
        .then((res) => {
          this.reviews = res.data.data;
          this.totalItems = res.data.data.length;

          if (itemsPerPage > 0) {
            this.posts = this.reviews.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            );
          }

          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    openDelete(id, customer) {
      this.dialog = true;
      this.selectedReview.id = id;
      this.selectedReview.customer = customer;
    },
    confirmDelete() {
      this.$http
        .delete(`review/${this.selectedReview.id}`)
        .then(() => {
          this.getReviews();
          this.dialog = false;
          this.$store.commit("SNACKBAR", {
            text: "Reseña eliminada con exito",
            type: "success",
            isShow: true
          });
          this.selectedReview.id = null;
          this.selectedReview.customer = null;
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>
>
