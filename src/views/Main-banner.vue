<template>
  <div class="banners">
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
      <h2 class="grey--text">Banner principal</h2>

      <!-- Toolbar -->
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-btn color="primary" depressed link to="/add-main-banner">Agregar banner</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
        </v-col>
      </v-row>

      <v-card class="pa-2 mt-3" outlined>
        <v-data-table
          :headers="headers"
          :items="banners"
          :items-per-page="10"
          item-key="title"
          :options.sync="options"
          :server-items-length="totalItems"
          :footer-props="{
            itemsPerPageText: 'Banners por página'
          }"
          
          :loading="loading"
          loading-text="Cargando..."
          disable-sort
        >
          <template v-slot:item.preview="{ item }">            
            <!-- <v-img
              class="my-3"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="100"
              max-width="250"
              :src="`http://localhost:5000/${item.image}`"
            ></v-img> -->
            <v-img
              class="my-3"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="100"
              max-width="250"
              :src="`http://housesinadmin.housesin.mx:45205/${item.image}`"
            ></v-img>
          </template>

          <template v-slot:item.type="{ item }">
            <v-chip
              v-if="item.type == 'Main banner'"
              color="primary"
            >
              Banner principal
            </v-chip>
            <v-chip
              v-if="item.type == 'Promo banner'"
              color="orange"
            >
              Banner de promociones
            </v-chip>
            <v-chip
              v-if="item.type == 'Reward banner'"
              color="teal" dark
            >
              Banner recompensa
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <!-- <v-btn text small color="primary" :to="{ name: 'edit-main-banner', params: { id: item._id} }">Editar</v-btn> -->
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
      localEnv: 'http://localhost:5000/',
      prodEnv: 'http://housesin.esoft.com.mx:45205/',
      dialog: false,
      sectors: [],
      newSector: null,
      loading: true,
      banners: [],
      headers: [
        { text: "Vista previa", value: "preview" },
        { text: "Titulo", value: "title" },
        { text: "Tipo", value: "type" },
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
        this.getbanners();
      },
      deep: true
    }
  },
  mounted() {
    this.getbanners();
  },
  methods: {
    getbanners() {
      const { page, itemsPerPage } = this.options;

      this.loading = true;

      this.$http
        .get(
          `banner/?page=1&limit=1000`
        )
        .then((res) => {
          this.banners = res.data.data;
          this.totalItems = this.banners.length;
          
          if (itemsPerPage > 0) {
            this.banners = this.banners.slice(
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
        .delete(`banner/${this.selectedDevelopment.id}`)
        .then(() => {
          this.getbanners();
          this.dialog = false;
          this.$store.commit("SNACKBAR", {
            text: "Banner eliminado con exito",
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
