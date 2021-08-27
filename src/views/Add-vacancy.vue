<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Agregar vacante</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Nombre de la vacante" v-model="form.title" :rules="rules.title" required></v-text-field>
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
                  v-if="!selectedFile"
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
                    @click="removeImage"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="image" max-height="400px"></v-img>
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
    selectedFile: null,
    image: "",
    form: {
      title: null,
      location: null,
      description: null
    },
    loading: false,
    valid: true,
    imageValid: false,
    imageRule: false,
    rules: {
      title: [v => !!v || "Nombre de la vacante requerido"],
      description: [v => !!v || "Descripción requerida"],
      location: [v => !!v || "Ubicación requerida"]
    }
  }),
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
      this.imageRule = false
    },
    removeImage() {
      this.selectedFile = null;
      this.image = "";
    },
    addVacancy() {
      this.loading = true;

      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("location", this.form.location);
      formData.append("image", this.selectedFile);

      this.$http
        .post("vacancy/", formData)
        .then((res) => {
          this.loading = false;

          this.form.title = null;
          this.form.description = null;
          this.form.location = null;
          
          this.$store.commit("SNACKBAR", {
            text: "Vacante agregada con exito",
            type: "success",
            isShow: true
          });
          this.$router.replace("/vacancies");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async validate() {
      await this.$refs.form.validate();

      if (!this.selectedFile) {
        this.imageValid = false
        this.imageRule = true
      } else {
        this.imageValid = true
        this.imageRule = false
      }
      
      if (!this.valid || !this.imageValid) {
        return;
      } else {
        this.addVacancy();
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
