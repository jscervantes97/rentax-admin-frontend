<template>
  <div class="developments">
  
    <v-container style="padding-top:5%; padding-left:2%; padding-right:2%;">
      <h2 class="grey--text">Desarrollos</h2>
        <div style="display : flex ; flex-direction : row ; ">
          <v-card class="mx-auto"
          max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content style="color: #003865;" >
                <div class="text-overline mb-4">
                  Desarrollos
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  6,105
                </v-list-item-title>
              </v-list-item-content>
                <v-img
                max-height="60"
                max-width="60"
                src="../assets/Iconos/Dashboard/desarrollos.png"
                ></v-img>
            </v-list-item>
            
          </v-card>
          <v-card 
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content style="color: #003865;" >
                <div class="text-overline mb-4">
                  Áreas Comerciales
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  $55,500.00
                </v-list-item-title>
              </v-list-item-content>
                <v-img
                max-height="60"
                max-width="60"
                src="../assets/Iconos/Dashboard/areasComerciales.png"
                ></v-img>
            </v-list-item>
            
          </v-card>
          <v-card class="mx-auto"
          max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content style="color: #003865;" >
                <div class="text-overline mb-4">
                  Plazas y Oficinas
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  $6,105,200.00
                </v-list-item-title>
              </v-list-item-content>
                <v-img
                max-height="60"
                max-width="60"
                src="../assets/Iconos/Dashboard/plazasyOficinas.png"
                ></v-img>
            </v-list-item>
            
          </v-card>
        </div>
         <div style="display : flex ; flex-direction : row ;  margin-top : 2% ;">
          <v-card class="mx-auto"
          max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content style="color: #003865;" >
                <div class="text-overline mb-4">
                    Bienes Raices
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  1,902
                </v-list-item-title>
              </v-list-item-content>
                <v-img
                max-height="60"
                max-width="60"
                src="../assets/Iconos/Dashboard/bienesRaices.png"
                ></v-img>
            </v-list-item>
            
          </v-card>
          <v-card 
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content style="color: #003865;" >
                <div class="text-overline mb-4">
                  Propiedades
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  55,500,008
                </v-list-item-title>
              </v-list-item-content>
                <v-img
                max-height="60"
                max-width="60"
                src="../assets/Iconos/Dashboard/propiedades.png"
                ></v-img>
            </v-list-item>
            
          </v-card>
          <v-card class="mx-auto"
          max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content style="color: #003865;" >
                <div class="text-overline mb-4">
                  Plazas y Oficinas
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  6,105,200
                </v-list-item-title>
              </v-list-item-content>
                <v-img
                max-height="60"
                max-width="60"
                src="../assets/Iconos/Dashboard/solicitudes.png"
                ></v-img>
            </v-list-item>
            
          </v-card>
        </div>
      
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
