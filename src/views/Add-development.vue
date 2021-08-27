<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Agregar desarrollo</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-card-title class="pa-0">Generales</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombre del desarrollo" v-model="form.title" :rules="rules.title" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="sectors"
                  item-text="title"
                  :rules="rules.sectors"
                  item-value="_id"
                  label="Sector"
                  v-model="form.sector"
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Descripción"
                  v-model="form.description"
                  :rules="rules.description"
                  rows="3"
                  row-height="30"
                ></v-textarea>
              </v-col>
            </v-row>
            
            <v-card-title class="pa-0">Logo</v-card-title>
            <v-row class="pb-7">
              <v-col cols="3" md="3">
                <div
                  v-if="!selectedFileLogo"
                  style="height:144px;width:100%;"
                  class="grey lighten-3"
                >
                  <input
                    id="logoFile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    @change="onFileChangeLogo"
                  />
                  <label for="logoFile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar logo
                  </label>
                </div>
                <!-- Logo Image -->
                <div v-else style="position:relative">
                  <v-btn
                    color="red"
                    class="v-btn--example"
                    dark
                    top
                    right
                    small
                    fab
                    style="position:absolute;z-index:3;top:-8px;right:20px;"
                    @click="removeLogo"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="logoUrl" max-height="144px"></v-img>
                </div>
                <p v-if="imagesRules.logo" class="error--text py-3">Ingresa la imagén del logo del desarrollo</p>
              </v-col>
            </v-row>
            
            <v-card-title class="pa-0 mt-3">Imagenes banner</v-card-title>
            <v-row class="pb-7">
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
                    multiple
                    @change="addDesktopBanner"
                  />
                  <label for="file" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagenes de banner
                  </label>
                </div>
                <p v-if="imagesRules.images" class="error--text py-3">Ingresa por lo menos una imagén del desarrollo</p>
              </v-col>
            </v-row>

            <v-card-title class="pa-0 mt-3">Imagenes mobiles</v-card-title>
            <v-row class="pb-7">
              <v-col cols="3" md="3" v-for="(url, index) in mobileUrls" :key="url">
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
                    @click="removeMobile(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="url" max-height="144px"></v-img>
                </div>
              </v-col>
              <v-col cols="3" md="3">
                <div style="height:144px;width:100%;" class="grey lighten-3">
                  <input
                    id="MobileFile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    multiple
                    @change="addMobileBanner"
                  />
                  <label for="MobileFile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar mobiles imagenes del banner
                  </label>
                </div>
                <!-- <p v-if="imagesRules.images" class="error--text py-3">Ingresa por lo menos una imagén del desarrollo</p> -->
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="URL de video" v-model="form.videoUrl" :rules="rules.videoUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="URL" v-model="form.url" :rules="rules.url"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Latitud" v-model="form.lat" :rules="rules.lat"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Longitud" v-model="form.lng" :rules="rules.lng"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-spacer></v-spacer>
      <v-btn
        class="my-4"
        color="primary"
        @click="validate"
        :loading="loading"
        depressed
      >Agregar desarrollo</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    selectedFileDesktop: null,
    selectedFileMobile: null,
    selectedFilesDesktop: [],
    selectedFilesMobile: [],
    urls: [],
    mobileUrls: [],
    selectedFileLogo: null,
    logoUrl: "",
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
    imagesRules: {
      logo: false,
      images: false
    },
    sectors: [],
    rules: {
      title: [v => !!v || "Nombre del desarrollo requerido"],
      description: [v => !!v || "Descripción requerida"],
      videoUrl: [v => !!v || "URL del desarrollo requerido"],
      url: [v => !!v || "URL requerida"],
      sectors: [v => !!v || "Sector requerido"],
      lat: [v => !!v || "Latitud requerida"],
      lng: [v => !!v || "Longitud requerida"]
    }
  }),
  mounted() {
    this.getSectors();
  },
  methods: {
    getSectors() {
      this.$http
        .get(`sector/`)
        .then((res) => {
          this.sectors = res.data.data;
        })
        .catch((error) => console.log(error));
    },
    addDesktopBanner(e) {
      this.selectedFileDesktop = e.target.files[0];
      this.selectedFilesDesktop.push(e.target.files[0]);
      this.urls.push(URL.createObjectURL(this.selectedFileDesktop));
      this.imagesRules.images = false
    },
    addMobileBanner(e) {
      this.selectedFileMobile = e.target.files[0];
      this.selectedFilesMobile.push(e.target.files[0]);
      this.mobileUrls.push(URL.createObjectURL(this.selectedFileMobile));
    },
    onFileChangeLogo(e) {
      this.selectedFileLogo = e.target.files[0];
      this.logoUrl = URL.createObjectURL(this.selectedFileLogo);
      this.imagesRules.logo = false
    },
    removeImage(i) {
      this.urls.splice(i, 1);
    },
    removeMobile(i) {
      this.mobileUrls.splice(i, 1);
    },
    removeLogo() {
      this.selectedFileLogo = null;
      this.logoUrl = "";
    },
    addDevelopment() {
      this.loading = true;

      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("logo", this.selectedFileLogo);
      formData.append("videoUrl", this.form.videoUrl);
      formData.append("slug", this.form.url);
      formData.append("sector", this.form.sector);
      
      this.form.lat = parseFloat(this.form.lat)
      this.form.lng = parseFloat(this.form.lng)

      let location = {
        "coordinates": [this.form.lat, this.form.lng]
      }

      let stringLocation = JSON.stringify(location)

      formData.append("location", stringLocation)

      this.selectedFilesDesktop.map((el) => {
        formData.append("images", el);
      });

      this.selectedFilesMobile.map((el) => {
        formData.append("mobileImages", el);
      });

      this.$http
        .post("development/", formData)
        .then((res) => {
          this.loading = false;
          this.urls = [];
          
          this.form.title = null;
          this.form.description = null;
          this.form.videoUrl = null;
          this.form.url = null;
          this.form.sector = null;          
          this.form.lat = null;
          this.form.lng = null;

          this.$store.commit("SNACKBAR", {
            text: "Desarrollo agregado con exito",
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

      if (!this.selectedFileLogo || this.selectedFilesDesktop.length == 0) {
        this.imagesValid = false

        if (this.selectedFileLogo) {
          this.imagesRules.logo = false
        } else {
          this.imagesRules.logo = true
        }

        if (!this.selectedFilesDesktop.length == 0) {
          this.imagesRules.images = false
        } else {
          this.imagesRules.images = true
        }

      } else {
        this.imagesValid = true
      }
      
      if (!this.valid || !this.imagesValid) {
        return;
      } else {
        this.addDevelopment();
      }
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
