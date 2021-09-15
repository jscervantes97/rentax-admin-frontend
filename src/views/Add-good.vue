<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Agregar Nuevo Bien Raiz</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-card-title class="pa-0">Generales</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field label="Título de la propiedad" v-model="form.title" :rules="rules.title"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :items="developments" label="Tipo de Bien Raíz" v-model="form.development" :rules="rules.development"></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea label="Descripción" v-model="form.description" :rules="rules.description"></v-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Precio" prefix="$" v-model="form.price"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Medias del lote" suffix="m" v-model="form.landSquareMeters" :rules="rules.landSquareMeters"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Metros cuadrados de construcción" suffix="㎡" v-model="form.constructionSquareMeters"></v-text-field>
              </v-col>            
            </v-row>
            <!-- <v-card-title class="pa-0">Información detallada</v-card-title> -->
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field type="number" label="Recámaras" v-model="form.rooms" :rules="rules.rooms"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field type="number" label="Cocheras" v-model="form.rooms" :rules="rules.rooms"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field type="number" label="Baños" v-model="form.bathrooms" :rules="rules.bathrooms"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.age"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.age"
                      label="Año de construcción"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.age" type="month" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(form.age)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <v-checkbox
                v-model="form.extras"
                label="Jardin"
                value="Jardin"
                hide-details
              ></v-checkbox>
              
            </v-col>
              <v-col cols="12" md="12">
                <v-text-field label="Video URL" v-model="form.videoUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Barrio o Colonia" v-model="form.videoUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Ciudad" v-model="form.videoUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Estado" v-model="form.videoUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field label="Url Google Maps" v-model="form.videoUrl"></v-text-field>
              </v-col>
            </v-row>
            
            <v-card-title class="pa-0">Imagen Principal</v-card-title>
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
                    @change="onFileChange"
                  />
                  <label for="file" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagen
                  </label>
                </div>
                <p v-if="!imagesValid" class="error--text py-3">Ingresa por lo menos una imagén de la propiedad</p>
              </v-col>
            </v-row>

            <v-card-title class="pa-0">Imagenes del Bien Raíz</v-card-title>
            <v-row class="pb-7">
              <v-col cols="3" md="3" v-for="(url, index) in urlsBanner" :key="url">
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
                    @click="removeImageBanner(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="url" max-height="144px"></v-img>
                </div>
              </v-col>
              <v-col cols="3" md="3">
                <div style="height:144px;width:100%;" class="grey lighten-3">
                  <input
                    id="fileBanner"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    multiple
                    @change="onFileChangeBanner"
                  />
                  <label for="fileBanner" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagenes
                  </label>
                </div>
                <p v-if="!imagesValid" class="error--text py-3">Ingresa por lo menos una imagén</p>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-btn class="my-4" color="primary" @click="validate" :loading="loading" depressed>Agregar propiedad</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    types: [
      "Ladrillo",
      "Block"
    ],
    distintive: ['Bono', 'Entrega inmediata', 'Equipamiento'],
    sector: [],
    developments: ['Comprar' , 'Rentar' , 'Vender'],
    amenities: [
      "Gimnasio",
      "Alberca",
      "Casa club",
      "Áreas verdes",
      "Ciclovía",
      "Fitness Park",
      "Juegos infantiles",
      "Acceso controlado",
      "Residencial privado",
      "Barda perimetral",
      "Cerca eléctrica",
      "Caseta de vigilancia",
      "Cancha de tenis",
      "Media cancha de Basketball",
      "Áreas de convivencia"
    ],
    selectedFile: null,
    selectedFiles: [],
    urls: [],
    loading: false,
    form: {
      title: null,
      description: null,
      development: null,
      highlightModel: false,
      distinctive: [],
      price: 0,
      showPrice: false,
      typeOfConstruction: null,
      landSquareMeters: null,
      constructionSquareMeters: null,
      rooms: 0,
      bathrooms: 0,
      age: new Date().toISOString().substr(0, 7),
      extras: [],
      videoUrl: null,
      virtualTourUrl: null,
      url: null,
      amenities: []
    },
    rules: {
      title: [v => !!v || "Titulo de la propiedad requerido"],
      description: [v => !!v || "Descripción requerida"],
      development: [v => !!v || "Desarrollo requerido"],
      type: [v => !!v || "Tipo de propiedad requerido"],
      sector: [v => !!v || "Sector requerido"],
      landSquareMeters: [v => !!v || "Metros cuadrados requerido"],
      constructionSquareMeters: [v => !!v || "Metros cuadrados de construcción requeridos"],
      rooms: [v => !!v || "Número de cuartos requerido"],
      garage: [v => !!v || "Cochera para autos requerido"],
      bathrooms: [v => !!v || "Número de baños requerido"],
      age: [v => !!v || "Fecha de construcción requerido"],
      amenities: [v => v.length !== 0 || "Agrega por lo menos una amenidad"],
      url: [v => !!v || "URL requerida"],
    },
    valid: true,
    imagesValid: true,
    menu: false,
    selectedFile: null,
    selectedFiles: [],
    selectedFileBanner: null,
    selectedFileBannerMobile: null,
    selectedFilesBanner: [],
    selectedFilesBannerMobile: [],
    urlsBanner: [],
    urlsBannerMobile: []
  }),
  created() {
    this.getDevelopments();
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      this.selectedFiles.push(e.target.files[0]);
      this.urls.push(URL.createObjectURL(this.selectedFile));
    },
    removeImage(i) {
      this.urls.splice(i, 1);
    },
    onFileChangeBanner(e) {
      this.selectedFileBanner = e.target.files[0];
      this.selectedFilesBanner.push(e.target.files[0]);
      this.urlsBanner.push(URL.createObjectURL(this.selectedFileBanner));
    },
    onFileChangeBannerMobile(e) {
      this.selectedFileBannerMobile = e.target.files[0];
      this.selectedFilesBannerMobile.push(e.target.files[0]);
      this.urlsBannerMobile.push(URL.createObjectURL(this.selectedFileBannerMobile));
    },
    removeImageBanner(i) {
      this.urlsBanner.splice(i, 1);
    },
    removeImageBannerMobile(i) {
      this.urlsBannerMobile.splice(i, 1);
    },
    addProperty() {
      this.loading = true;

      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("development", this.form.development);
      formData.append("highlightModel", this.form.highlightModel);
      formData.append("distinctive", this.form.distinctive);
      formData.append("price", this.form.price);
      formData.append("showPrice", this.form.showPrice);
      formData.append("typeOfConstruction", this.form.typeOfConstruction);
      formData.append("landSquareMeters", this.form.landSquareMeters);
      formData.append("constructionSquareMeters", this.form.constructionSquareMeters);
      formData.append("rooms", this.form.rooms);
      formData.append("bathrooms", this.form.bathrooms);
      formData.append("age", this.form.age);
      formData.append("videoUrl", this.form.videoUrl);
      formData.append("virtualTourUrl", this.form.virtualTourUrl);
      formData.append("slug", this.form.url);
      
      this.form.extras.map((el) => {
        formData.append("extras", el);
      });

      this.form.amenities.map((el) => {
        formData.append("amenities", el);
      });
      
      this.selectedFiles.map((el) => {
        formData.append("images", el);
      });

      this.selectedFilesBanner.map((el) => {
        formData.append("bannerImages", el);
        console.log(el)
      });

      this.selectedFilesBannerMobile.map((el) => {
        formData.append("bannerImagesMobile", el);
      });

      this.$http
        .post("property", formData)
        .then((res) => {
          this.loading = false;
          // console.log(res);
          this.$store.commit("showAppStatus", {
            message: "Propiedad agregada con exito",
            isShow: true,
            type: "success",
          });
          this.$router.replace("/properties");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDevelopments() {
      /*
      this.$http
        .get("development/")
        .then((res) => {
          this.developments = res.data.data;

          this.developments = this.developments.map((item) => {
            return { text: item.title, value: item._id };
          });
        })
        .catch((error) => console.log(error));
        */
    },
    async validate() {
      await this.$refs.form.validate();

      if (this.selectedFiles.length == 0) {
        this.imagesValid = false;
      }

      if (!this.valid) {
        return;
      } else {
        this.addProperty();
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
