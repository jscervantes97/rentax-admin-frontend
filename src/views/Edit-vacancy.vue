<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Editar vacante</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Nombre de la vacante" v-model="form.title" required></v-text-field>
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
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Ubicación" v-model="form.location" :rules="rules.location" required></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                  <div
                  v-if="!image"
                  style="height:144px;width:100%;"
                  class="grey lighten-3"
                >
                  <input
                    id="imageFile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    @change="onFileChange"
                  />
                  <label for="imageFile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagen
                  </label>
                </div>
                <!-- Image -->
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
                    @click="removeImage"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="image" max-height="400px"></v-img>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-spacer></v-spacer>
      <v-btn
        class="my-4 float-right"
        color="primary"
        @click="editBanner"
        :loading="loading"
        depressed
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
      image: null,
      form: {
        title: null,
        description: null,
        type: null
      },
      loading: false,
      valid: true,
      imagesValid: false,
      imagesRules: {
        logo: false,
        images: false
      },
      rules: {
        title: [v => !!v || "Nombre del desarrollo requerido"],
        description: [v => !!v || "Descripción requerida"],
        location: [v => !!v || "Ubicación requerida"],
      },
      items: [{ type: 'Banner principal', value: 'Main banner' }, { type: 'Banner de promociones', value: 'Promo banner' }]
    }
  },
  mounted() {
    this.getVacancy();
  },
  methods: {
    getVacancy() {
      this.$http
        .get(`vacancy/${this.id}`)
        .then((res) => {
          let banner = res.data.data

          this.form.title = banner.title;
          this.form.description = banner.description;
          this.form.location = banner.location;

          this.image = `${this.prodEnv}${banner.image}`;
        })
        .catch((error) => console.log(error));
    },
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
    },
    removeImage() {
      this.selectedFile = null;
      this.image = "";
    },
    editBanner() {
      const formData = new FormData();

      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("location", this.form.location);

      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }

      this.$http
        .put(`vacancy/${this.id}`, formData)
        .then((res) => {
          this.$router.replace("/vacancies");
        })
        .catch((error) => {
          console.log(error);
        })
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
