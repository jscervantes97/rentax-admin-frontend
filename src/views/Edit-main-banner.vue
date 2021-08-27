<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Editar banner principal</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Nombre del banner" v-model="form.title" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="items"
                  label="Standard"
                  item-text="type"
                  item-value="value"
                  v-model="form.type"
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Descripción"
                  rows="3"
                  row-height="40"
                  v-model="form.description"
                ></v-textarea>
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
        description: [v => !!v || "Descripción requerida"]
      },
      items: [{ type: 'Banner principal', value: 'Main banner' }, { type: 'Banner de promociones', value: 'Promo banner' }, { type: 'Banner recompensa', value: 'Reward banner' }]
    }
  },
  mounted() {
    this.getMainBanner();
  },
  methods: {
    getMainBanner() {
      this.$http
        .get(`banner/${this.id}`)
        .then((res) => {
          let banner = res.data.data

          this.form.title = banner.title;
          this.form.description = banner.description;
          this.form.type = banner.type

          // Change local or prod
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
      formData.append("type", this.form.type);

      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }

      this.$http
        .put(`banner/${this.id}`, formData)
        .then((res) => {
          this.$router.replace("/main-banner");
        })
        .catch((error) => {
          console.log(error);
        })
    },
    // async validate() {
    //   await this.$refs.form.validate();

    //   if (!this.selectedFileLogo || this.selectedFiles.length == 0) {
    //     this.imagesValid = false

    //     if (this.selectedFileLogo) {
    //       this.imagesRules.logo = false
    //     } else {
    //       this.imagesRules.logo = true
    //     }

    //     if (!this.selectedFiles.length == 0) {
    //       this.imagesRules.images = false
    //     } else {
    //       this.imagesRules.images = true
    //     }

    //   } else {
    //     this.imagesValid = true
    //   }

    //   if (!selectedFile && )
      
    //   if (!this.valid || !this.imagesValid) {
    //     return;
    //   } else {
    //     this.addDevelopment();
    //   }
    // }
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
