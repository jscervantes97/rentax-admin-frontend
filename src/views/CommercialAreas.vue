<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Comercial</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-card-title class="pa-0">Informacion general de la zona a promocionar</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field label="Titulo" v-model="form.title" :rules="rules.title" required></v-text-field>
              </v-col>      
              <v-col cols="12" md="12">
                <v-textarea
                  label="Descripción"
                  v-model="form.description"
                  :rules="rules.description"
                  rows="3"
                  row-height="20"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field label="Url centro promocionar" v-model="form.title" :rules="rules.title" required></v-text-field>
              </v-col>    
            </v-row>
            <v-card-title class="pa-0 mt-3">Imagenes banner</v-card-title>
            <v-row>
              <v-col cols="3" md="3" v-for="(url, index) in urls" :key="url">
                <div style="position:relative;">
                  <v-btn
                    color="red"
                    class="v-btn--example"
                    dark
                    top
                    right
                    small
                    fab
                    style="position:absolute;z-index:3;top:-8px;right:20px;"
                    @click="removeImage(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="url" max-height="144px"></v-img>
                </div>
              </v-col>
              <v-col cols="3" md="3">
                <div style="height:144px;width:100%;" class="grey lighten-3">
                  <input
                    id="file"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    @change="addImage"
                    multiple
                  />
                  <label for="file" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagenes
                  </label>
                </div>
                <p v-if="imagesRule" class="error--text py-3">Ingresa por lo menos una imagén del desarrollo</p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      
      <v-spacer></v-spacer>
      <v-btn
        class="my-4"
        color="primary"
        :loading="loading"
        depressed
        @click="validate"
      >Guardar</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      localEnv: 'http://localhost:5000/',
      prodEnv: 'http://housesinadmin.housesin.mx:45205/',
      id: this.$route.params.id,
      selectedFile: null,
      selectedFiles: [],
      urls: [],
      mobileUrls: [],
      selectedFileLogo: null,
      logoUrl: null,
      form: {
        title: null,
        description: null,
        videoUrl: null,
        url: null,
        sector: null,
        lat: null,
        lng: null
      },
      loading: false,
      valid: true,
      imagesValid: false,
      logo: null,
      logoRule: false,
      imagesRule: false,
      sectors: [],
      rules: {
        title: [v => !!v || "Nombre del desarrollo requerido"],
        description: [v => !!v || "Descripción requerida"],
        videoUrl: [v => !!v || "URL del desarrollo requerido"],
        url: [v => !!v || "URL requerida"],
        sectors: [v => !!v || "Sector requerido"],
        lat: [v => !!v || "Latitud requerida"],
        lng: [v => !!v || "Longitud requerida"]
      },
      initialImages: [],
      deleteImages: [],
      images: [],
      mobileImages: []
    };
  },
  mounted() {
    this.getDevelopment();
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
    getDevelopment() {
      this.$http
        .get(`development/${this.id}`)
        .then((res) => {
          this.form.title = res.data.data.title;
          this.form.description = res.data.data.description;
          this.form.videoUrl = res.data.data.videoUrl;
          this.form.url = res.data.data.slug;
          this.form.sector = res.data.data.sector;
          this.form.lat = res.data.data.location.coordinates[0];
          this.form.lng = res.data.data.location.coordinates[1];
          this.logo = res.data.data.logoImage;
          
          this.images = res.data.data.images;
          this.mobileImages = res.data.data.mobileImages;

          for (const image of this.images) {
            let url = `${this.prodEnv}images/${image}`;
            this.urls.push(url);
          }

          for (const image of this.mobileImages) {
            let url = `${this.prodEnv}images/${image}`;
            console.log(url);
            this.mobileUrls.push(url);
          }
          
          if (this.logo) {
            // Change local or prod
            this.logoUrl = `${this.prodEnv}images/${this.logo}`;
          }
        })
        .catch((error) => console.log(error));
    },
    editDevelopment() {
      this.loading = true

      let location = {
        "type": "Point",
        "coordinates": [this.form.lat, this.form.lng]
      }

      const formData = {
        title: this.form.title,
        description: this.form.description,
        videoUrl: this.form.videoUrl,
        slug: this.form.url,
        sector: this.form.sector,
        location: location
      }

      this.$http
        .put(`development/${this.id}`, formData)
        .then((res) => {
          this.loading = false;
          this.$store.commit("SNACKBAR", {
            text: "Desarrollo editado con exito",
            type: "success",
            isShow: true
          });
          this.$router.replace("/developments");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async validate() {
      await this.$refs.form.validate();

      if (!this.logoUrl && !this.selectedFileLogo) {
        this.imagesValid = false;
        this.logoRule = true;
        this.imagesRule = false;
      } else if (this.selectedFiles.length == 0 && this.urls.length == 0) {
        this.imagesValid = false;
        this.logoRule = false;
        this.imagesRule = true;
      } else {
        this.imagesValid = true;
        this.logoRule = false;
        this.imagesRule = false;
      }
      
      if (!this.valid || !this.imagesValid) {
        return;
      } else {
        this.editDevelopment();
      }
    },
    addImage(e) {
      const formData = new FormData();

      this.selectedFile = e.target.files[0];

      formData.append("image", this.selectedFile)

      this.$http
        .put(`development/addImage/${this.id}`, { params: { imageParam: 42 } }, formData)
        .then((res) => {
          // this.loading = false;
          this.$store.commit("SNACKBAR", {
            text: "Imagén agregada con exito",
            type: "success",
            isShow: true
          });

          this.urls = [];
          this.mobileUrls = [];

          this.getDevelopment();
          this.getSectors();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeImage(index) {
      this.$http
        .put(`development/removeImage/${this.id}`, null, { params: { image: this.images[index] }})
        .then((res) => {
          // this.loading = false;
          this.$store.commit("SNACKBAR", {
            text: "Imagén eliminada con exito",
            type: "success",
            isShow: true
          });

          this.urls = [];
          this.mobileUrls = [];

          this.getDevelopment();
          this.getSectors();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMobileImage(e) {
      const formData = new FormData();

      this.selectedFile = e.target.files[0];

      formData.append("image", this.selectedFile)

      this.$http
        .put(`development/addMobileImage/${this.id}`, formData)
        .then((res) => {
          // this.loading = false;
          this.$store.commit("SNACKBAR", {
            text: "Imagén agregada con exito",
            type: "success",
            isShow: true
          });

          this.urls = [];
          this.mobileUrls = [];

          this.getDevelopment();
          this.getSectors();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 
    removeMobileImage(index) {
      this.$http
        .put(`development/removeMobileImage/${this.id}`, null, { params: { image: this.mobileImages[index] }})
        .then((res) => {
          // this.loading = false;
          this.$store.commit("SNACKBAR", {
            text: "Imagén eliminada con exito",
            type: "success",
            isShow: true
          });

          this.urls = [];
          this.mobileUrls = [];

          this.getDevelopment();
          this.getSectors();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addLogoImage(e) {
      const formData = new FormData();

      this.selectedFile = e.target.files[0];

      formData.append("image", this.selectedFile)

      this.$http
        .put(`development/addLogo/${this.id}`, formData)
        .then((res) => {

          this.$store.commit("SNACKBAR", {
            text: "Logo agregado con exito",
            type: "success",
            isShow: true
          });

          this.urls = [];
          this.mobileUrls = [];

          this.getDevelopment();
          this.getSectors();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeLogoImage(e) {
      this.$http
        .put(`development/removeLogo/${this.id}`, null, { params: { image: this.logo }})
        .then((res) => {
          this.$store.commit("SNACKBAR", {
            text: "Logo eliminado con exito",
            type: "success",
            isShow: true
          });

          this.urls = [];
          this.mobileUrls = [];
          this.logoUrl = null;

          this.getDevelopment();
          this.getSectors();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
.add-image-btn {
  display: none;
}

label {
  padding: 40px;
  /* background: green; */
  height: 100%;
  width: 100%;
  border-radius: 4px;
  /* color: #fff; */
  text-align: center;
  font-weight: 500;
  font-size: 1.1rem;
  display: block;
  cursor: pointer;
}

.v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0px -24px 0px 0px;
}
</style>
