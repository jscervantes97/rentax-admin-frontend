<template>
  <div class="add-property">
    <v-container>
      <h2 class="grey--text">Recompensa Rentax</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-radio-group
                  row
                  v-model="content"
                >
                  <v-radio
                    label="Imagen"
                    :v-bind="true"
      
                  ></v-radio>
                  <v-radio
                    label="Texto"
                    :v-bind="false"
     
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="12" v-if="content">
                <tiptap-vuetify
                    v-html
                    v-model="form.description"
                    :extensions="extensions"
                  />
              </v-col>
              <v-col cols="12" v-else>
                <v-row>
                  <v-col cols="6">
                    <div
                      v-if="!sideImageDesktop"
                      style="height:144px;width:100%;"
                      class="grey lighten-3"
                    >
                    <input
                      id="sideImgDesktop"
                      class="mb-4 add-image-btn"
                      type="file"
                      block
                      @change="addSideImgDesktop"
                    />
                    <label for="sideImgDesktop" class="grey lighten-3">
                      <span>
                        <v-icon>mdi-cloud-upload</v-icon>
                      </span>
                      <br />Agregar imagen lateral escritorio
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
                        @click="removeSideImgDesktop"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-img :src="sideImageDesktop" max-height="400px"></v-img>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div
                      v-if="!sideImageMobile"
                      style="height:144px;width:100%;"
                      class="grey lighten-3"
                    >
                      <input
                        id="sideImgMobile"
                        class="mb-4 add-image-btn"
                        type="file"
                        block
                        @change="addSideImgMobile"
                      />
                      <label for="sideImgMobile" class="grey lighten-3">
                        <span>
                          <v-icon>mdi-cloud-upload</v-icon>
                        </span>
                        <br />Agregar imagen lateral movil
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
                        @click="removeSideImgMobile"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-img :src="sideImageMobile" max-height="400px"></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  label="Términos y condiciones"
                  v-model="form.term"
                  rows="3"
                  row-height="40"
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
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History, Image } from 'tiptap-vuetify'

export default {
  components: { TiptapVuetify },
  data: () => ({
    selectedFile: null,
    image: "",
    form: {
      title: null,
      description: null,
      term: null
    },
    loading: false,
    valid: true,
    imageValid: false,
    imageRule: false,
    rules: {
      title: [v => !!v || "Nombre del desarrollo requerido"],
      description: [v => !!v || "Descripción requerida"]
    },
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
      Image
    ],
    items: [{ type: 'Banner principal', value: 'Main banner' }, { type: 'Banner de promociones', value: 'Promo banner' }, { type: 'Banner recompensa', value: 'Reward banner' }],
    content: false,
    selectedFileD: null,
    selectedFileM: null,
    sideImageDesktop: "",
    sideImageMobile: "",
  }),
  mounted() {
    this.getReward();
  },
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
    addSideImgDesktop(e) {
      this.selectedFileD = e.target.files[0];
      this.sideImageDesktop = URL.createObjectURL(this.selectedFileD);
    },
    addSideImgMobile(e) {
      this.selectedFileM = e.target.files[0];
      this.sideImageMobile = URL.createObjectURL(this.selectedFileM);
    },
    removeSideImgDesktop() {
      this.selectedFileD = null;
      this.sideImageDesktop = "";
    },
    removeSideImgMobile() {
      this.selectedFileM = null;
      this.sideImageMobile = "";
    },
    getReward() {
      this.$http
      .get('reward/housesinReward')
      .then((res) => {

        this.form.description = res.data.data.description;
        this.form.term = res.data.data.term;
        this.content = res.data.data.contentType;

        // this.image = `http://localhost:5000/${res.data.data.image}`;
        this.image = `http://housesin.esoft.com.mx:45205/${res.data.data.image}`;
        this.sideImageDesktop = `http://housesin.esoft.com.mx:45205/${res.data.data.sideImgDesktop}`;
        this.sideImageMobile = `http://housesin.esoft.com.mx:45205/${res.data.data.sideImgMobile}`;
      })
      .catch((error) => console.log(error));
    },
    saveReward() {
      this.loading = true;

      const formData = new FormData();
      formData.append("description", this.form.description);
      formData.append("term", this.form.term);
      formData.append("contentType", this.content);

      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }

      if (this.selectedFileD) {
        formData.append("sideImgDesktop", this.selectedFileD);
      }
      
      if (this.selectedFileM) {
        formData.append("sideImgMobile", this.selectedFileM);
      }

      this.$http
        .put("reward/", formData)
        .then((res) => {
          this.loading = false;

          this.selectedFile = null;

          this.$store.commit("SNACKBAR", {
            text: "Guardado con exito",
            type: "success",
            isShow: true
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async validate() {
      await this.$refs.form.validate();

      // if (!this.selectedFile) {
      //   this.imageValid = false
      //   this.imageRule = true
      // } else {
      //   this.imageValid = true
      //   this.imageRule = false
      // }
      if (!this.valid) {
        return;
      } else {
        this.saveReward();
      }


      // if (!this.valid || !this.imageValid) {
      //   return;
      // } else {
      //   this.saveReward();
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
