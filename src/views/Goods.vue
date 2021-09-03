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
        { text: "Cliente", value: "customer" },
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
