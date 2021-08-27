<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Editar propiedad</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-card-title class="pa-0">Generales</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field label="Título de la propiedad" v-model="form.title"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :items="developments" label="Desarrollo" v-model="form.development"></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea label="Descripción" v-model="form.description"></v-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <v-radio-group
                  v-model="form.highlightModel"
                  row
                >
                  <span class="mr-2">Modelo destacado:</span>
                  <v-radio
                    label="Si"
                    v-bind:value="true"
                  ></v-radio>
                  <v-radio
                    label="No"
                    v-bind:value="false"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="4">
                <v-select :items="distintive" label="Distintivo" v-model="form.distinctive" item-text="text" item-value="value"></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Precio" prefix="$" v-model="form.price"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-radio-group
                  v-model="form.showPrice"
                  row
                >
                  <span class="mr-2">Mostrar precio:</span>
                  <v-radio
                    label="Si"
                    v-bind:value="true"
                  ></v-radio>
                  <v-radio
                    label="No"
                    v-bind:value="false"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="4">
                <v-select :items="types" label="Tipo de construcción" v-model="form.typeOfConstruction"></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Medias del lote" suffix="m" v-model="form.landSquareMeters"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Metros cuadrados de construcción" suffix="㎡" v-model="form.constructionSquareMeters"></v-text-field>
              </v-col>            
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field type="number" label="Recámaras" v-model="form.rooms"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field type="number" label="Baños" v-model="form.bathrooms"></v-text-field>
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
                label="Cochera"
                value="Cochera"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Cochera techada"
                value="Cochera techada"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Recámara en planta baja"
                value="Recámara en planta baja"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Área para TV"
                value="Área para TV"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Estudio"
                value="Estudio"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <v-checkbox
                v-model="form.extras"
                label="Cuarto de servicio"
                value="Cuarto de servicio"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Patio"
                value="Patio"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Pasillo de servicio"
                value="Pasillo de servicio"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Recámara principal con baño completo"
                value="Recámara principal con baño completo"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Recámara principal con baño completo y vestidor"
                value="Recámara principal con baño completo y vestidor"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <v-checkbox
                v-model="form.extras"
                label="Cocina"
                value="Cocina"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Sala / Comedor"
                value="Sala / Comedor"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Bodega"
                value="Bodega"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Recámara principal con baño completo, vestidor y balcón"
                value="Recámara principal con baño completo, vestidor y balcón"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="form.extras"
                label="Cuarto de lavado"
                value="Cuarto de lavado"
                hide-details
              ></v-checkbox>  
            </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="form.amenities"
                  :rules="rules.amenities"
                  :items="amenities"
                  label="Amenidades"
                  multiple
                  chips
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Video URL" v-model="form.videoUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Tour virtual" v-model="form.virtualTourUrl"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="URL" v-model="form.slug" :rules="rules.url"></v-text-field>
              </v-col>
            </v-row>
            <v-card-title class="pa-0">Imagenes</v-card-title>
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
                    @change="addImage"
                  />
                  <label for="file" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagenes
                  </label>
                </div>
                <p v-if="!imagesValid" class="error--text py-3">Ingresa por lo menos una imagén del desarrollo</p>
              </v-col>
            </v-row>
            
            <v-card-title class="pa-0">Imagenes de banner</v-card-title>
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
                    @click="removeBanner(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="url" max-height="144px"></v-img>
                </div>
              </v-col>
              <v-col cols="3" md="3">
                <div style="height:144px;width:100%;" class="grey lighten-3">
                  <input
                    id="bannerFile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    multiple
                    @change="addBanner"
                  />
                  <label v-if="!bannerLoading" for="bannerFile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagenes
                  </label>
                  <label v-else for="bannerFile" class="grey lighten-3">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </label>
                  
                </div>
                <p v-if="!imagesValid" class="error--text py-3">Ingresa por lo menos una imagén del desarrollo</p>
              </v-col>
            </v-row>

            <v-card-title class="pa-0">Imagenes mobiles del banner</v-card-title>

            <v-row class="pb-7">
              <v-col cols="3" md="3" v-for="(url, index) in urlsBannerMobile" :key="url">
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
                    @click="removeBannerMobile(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-img :src="url" max-height="144px"></v-img>
                </div>
              </v-col>
              <v-col cols="3" md="3">
                <div style="height:144px;width:100%;" class="grey lighten-3">
                  <input
                    id="bannerFileMobile"
                    class="mb-4 add-image-btn"
                    type="file"
                    block
                    multiple
                    @change="addBannerMobile"
                  />
                  <label v-if="!bannerMobileLoading" for="bannerFileMobile" class="grey lighten-3">
                    <span>
                      <v-icon>mdi-cloud-upload</v-icon>
                    </span>
                    <br />Agregar imagenes
                  </label>
                  <label v-else for="bannerFileMobile" class="grey lighten-3">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </label>
                </div>
                <!-- <p v-if="!imagesValid" class="error--text py-3">Ingresa por lo menos una imagén del desarrollo</p> -->
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-card>
      <v-btn class="my-4" color="primary" depressed @click.stop="editProperty()">Guardar</v-btn>
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
      types: [
        "Ladrillo",
        "Block"
      ],
      distintive: [
        { text: 'Ninguno', value: null },
        { text: 'Bono', value: 'Bono' },
        { text: 'Entrega inmediata', value: 'Entrega inmediata' },
        { text: 'Equipamiento', value: 'Equipamiento' },
        { text: 'Terreno excedente', value: 'Terreno excedente' }
      ],
      sector: [],
      developments: [],
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
      loading: false,
      form: {
        title: null,
        description: null,
        development: null,
        highlightModel: false,
        distinctive: null,
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
        slug: null,
        amenities: []
      },
      rules: {
        title: [v => !!v || "Titulo de la propiedad requerido"],
        description: [v => !!v || "Descripción requerida"],
        development: [v => !!v || "Desarrollo requerido"],
        type: [v => !!v || "Tipo de propiedad requerido"],
        sector: [v => !!v || "Sector requerido"],
        landSquareMeters: [v => !!v || "Metros cuadrados requerido"],
        rooms: [v => !!v || "Número de cuartos requerido"],
        garage: [v => !!v || "Cochera para autos requerido"],
        bathrooms: [v => !!v || "Número de baños requerido"],
        age: [v => !!v || "Fecha de construcción requerido"],
        amenities: [v => v.length !== 0 || "Agrega por lo menos una amenidad"],
        url: [v => !!v || "URL requerida"]
      },
      valid: true,
      menu: false,
      selectedFile: null,
      property: {},
      imagesValid: true,
      selectedFileBanner: null,
      selectedFileBannerMobile: null,
      urls: [],
      urlsBanner: [],
      urlsBannerMobile: [],
      images: [],
      banners: [],
      mobileBanners: [],
      imageLoading: false,
      bannerLoading: false,
      bannerMobileLoading: false
    };
  },
  mounted() {
    this.getProperty();
    this.getDevelopments();
  },
  methods: {
    getDevelopments() {
      this.$http
        .get("development/")
        .then((res) => {
          this.developments = res.data.data;

          this.developments = this.developments.map((item) => {
            return { text: item.title, value: item._id };
          });
        })
        .catch((error) => console.log(error));
    },
    getProperty() {
      var vm = this;

      this.$http
        .get(`property/${this.id}`)
        .then((res) => {
          console.log(res);
          this.form.title = res.data.data.title;
          this.form.development = res.data.data.development._id;
          this.form.description = res.data.data.description;
          this.form.highlightModel = res.data.data.highlightModel;
          this.form.distinctive = res.data.data.distinctive;        
          this.form.price = res.data.data.price;
          this.form.showPrice = res.data.data.showPrice;
          this.form.typeOfConstruction = res.data.data.typeOfConstruction;  
          this.form.landSquareMeters = res.data.data.landSquareMeters;
          this.form.constructionSquareMeters = res.data.data.constructionSquareMeters;
          this.form.rooms = res.data.data.rooms;
          this.form.bathrooms = res.data.data.bathrooms;
          this.form.extras = res.data.data.extras;
          this.form.amenities = res.data.data.amenities;
          this.form.videoUrl = res.data.data.videoUrl;
          this.form.virtualTourUrl = res.data.data.virtualTourUrl;
          this.form.slug = res.data.data.slug;
          this.form.age = res.data.data.age;
          
          this.images = res.data.data.images;
          this.banners = res.data.data.bannerImages;
          this.mobileBanners = res.data.data.bannerImagesMobile;
          console.log(res.data.data.bannerImagesMobile)

          for (const image of this.images) {
            let url = `${this.prodEnv}images/${image}`;
            this.urls.push(url);
          }

          for (const banner of this.banners) {
            let url = `${this.prodEnv}images/${banner}`;
            this.urlsBanner.push(url);
          }

          for (const banner of this.mobileBanners) {
            let url = `${this.prodEnv}images/${banner}`;
            this.urlsBannerMobile.push(url);
          }
        })
        .catch((error) => console.log(error));
    },
    editProperty() {
      this.$http
        .put(`property/${this.id}`, this.form)
        .then((res) => {
          this.$store.commit("SNACKBAR", {
            text: "Propiedad editada con exito",
            type: "success",
            isShow: true
          });
          this.$router.replace("/properties");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addImage(e) {
      const formData = new FormData();

      this.selectedFile = e.target.files[0];

      formData.append("image", this.selectedFile)

      this.$http
        .put(`property/addImage/${this.id}`, formData)
        .then((res) => {
          this.onImageEdit('Imagen agregada con exito');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeImage(index) {
      this.$http
        .put(`property/removeImage/${this.id}`, null, { params: { image: this.images[index] }})
        .then((res) => {
          this.onImageEdit('Imagen eliminada con exito');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addBanner(e) {
      this.bannerLoading = true
      
      const formData = new FormData();

      this.selectedFileBanner = e.target.files[0];
      formData.append("image", this.selectedFileBanner)

      this.$http
        .put(`property/addBannerImage/${this.id}`, formData)
        .then((res) => {
          this.onImageEdit('Imagen agregada con exito');  
          this.bannerLoading = false        
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeBanner(index) {
      this.$http
        .put(`property/removeBannerImage/${this.id}`, null, { params: { image: this.banners[index] }})
        .then((res) => {
          this.onImageEdit('Imagen eliminada con exito');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addBannerMobile(e) {
      this.bannerMobileLoading = true
      
      const formData = new FormData();

      this.selectedFileBannerMobile = e.target.files[0];
      formData.append("image", this.selectedFileBannerMobile)

      this.$http
        .put(`property/addBannerImageMobile/${this.id}`, formData)
        .then((res) => {
          this.onImageEdit('Imagen agregada con exito');  
          this.bannerMobileLoading = false        
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeBannerMobile(index) {
      this.$http
        .put(`property/removeBannerImageMobile/${this.id}`, null, { params: { image: this.mobileBanners[index] }})
        .then((res) => {
          this.onImageEdit('Imagen eliminada con exito');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onImageEdit(text) {
      this.$store.commit("SNACKBAR", {
        text: text,
        type: "success",
        isShow: true
      });
      
      this.urls = [];
      this.urlsBanner = [];
      this.urlsBannerMobile = [];

      this.getProperty();
      this.getDevelopments();
      
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
  height: 100%;
  width: 100%;
  border-radius: 4px;
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
