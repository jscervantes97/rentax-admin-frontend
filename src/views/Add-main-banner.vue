<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Agregar banner</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Nombre del banner" v-model="form.title" :rules="rules.title" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="items"
                  label="Tipo de banner"
                  item-text="type"
                  item-value="value"
                  v-model="form.type"
                  :rules="rules.type"
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Descripción"
                  v-model="form.description"
                  :rules="rules.description"
                  rows="3"
                  row-height="40"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                  
                  <div
                  v-if="!selectedFileDesktop"
                  style="height:144px;width:100%;"
                  class="grey lighten-3"
                >
                  <input
                    id="desktopFile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    @change="addDesktopBanner"
                  />
                  <label for="desktopFile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar banner escritorio
                  </label>
                </div>

                <!-- Desktop Image -->
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
                    @click="removeDesktop"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="desktopImage" max-height="400px"></v-img>
                </div>
                <p v-if="imageRule" class="error--text py-3">Ingresa la imagén del banner</p>
              </v-col>

              <v-col cols="12" md="6">
                  <div
                  v-if="!selectedFileMobile"
                  style="height:144px;width:100%;"
                  class="grey lighten-3"
                >
                  <input
                    id="mobileFile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    @change="addMobileBanner"
                  />
                  <label for="mobileFile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar banner movil
                  </label>
                </div>

                <!-- Mobile Image -->
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
                    @click="removeMobile"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="mobileImage" max-height="400px"></v-img>
                </div>
                <p v-if="imageRule" class="error--text py-3">Ingresa la imagén del banner</p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-spacer></v-spacer>
      <v-btn
        class="my-4 float-right"
        color="primary"
        @click="validate"
        :loading="loading"
        depressed
      >Guardar</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    selectedFileDesktop: null,
    selectedFileMobile: null,
    desktopImage: "",
    mobileImage: "",
    form: {
      title: null,
      type: null,
      description: null
    },
    loading: false,
    valid: true,
    imageValid: false,
    imageRule: false,
    imageMobileRule: false,
    rules: {
      title: [v => !!v || "Nombre del desarrollo requerido"],
      description: [v => !!v || "Descripción requerida"],
      type: [v => !!v || "Tipo de banner requerido"]
    },
    items: [{ type: 'Banner principal', value: 'Main banner' }, { type: 'Banner ventajas de your home', value: 'Promo banner' }]
  }),
  methods: {
    addDesktopBanner(e) {
      this.selectedFileDesktop = e.target.files[0];
      this.desktopImage = URL.createObjectURL(this.selectedFileDesktop);
      this.imageRule = false
    },
    addMobileBanner(e) {
      this.selectedFileMobile = e.target.files[0];
      this.mobileImage = URL.createObjectURL(this.selectedFileMobile);
      this.imageMobileRule = false
    },
    removeDesktop() {
      this.selectedFileDesktop = null;
      this.desktopImage = "";
    },
    removeMobile() {
      this.selectedFileMobile = null;
      this.mobileImage = "";
    },
    addBanner() {
      this.loading = true;

      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("type", this.form.type);
      formData.append("description", this.form.description);
      formData.append("image", this.selectedFileDesktop);
      formData.append("mobileImage", this.selectedFileMobile);

      this.$http
        .post("banner/", formData)
        .then((res) => {
          this.loading = false;

          this.form.title = null;
          this.form.type = null;
          this.form.description = null;

          this.$store.commit("SNACKBAR", {
            text: "Banner agregado con exito",
            type: "success",
            isShow: true
          });
          this.$router.replace("/main-banner");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async validate() {
      this.addBanner();

      // await this.$refs.form.validate();

      // if (!this.selectedFile) {
      //   this.imageValid = false
      //   this.imageRule = true
      // } else {
      //   this.imageValid = true
      //   this.imageRule = false
      // }

      // if (selectedFileDesktop && selectedFileMobile) {
      //   this.imageValid = true
      //   this.imageRule = false
      // } else {
      //   this.imageValid = false
      //   this.imageRule = true
      // }

      
      // if (!this.valid || !this.imageValid) {
      //   return;
      // } else {
      //   this.addBanner();
      // }
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
