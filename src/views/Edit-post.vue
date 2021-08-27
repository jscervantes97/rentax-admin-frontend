<template>
  <div class="edit-property">
    <v-dialog v-model="categoryDialog" width="700">
      <v-card>
        <v-card-title>Categorias</v-card-title>
        <v-card-text>
          <v-text-field
              label="Categoría"
              v-model="newCategory"
          ></v-text-field>
          <v-btn color="primary" depressed @click="addCategory()">Agregar</v-btn>
          <v-divider class="grey my-3"></v-divider>
        </v-card-text>
        <v-card-text>
          <v-data-table
            :headers="categoryHeaders"
            :items="categories"
            :items-per-page="5"
            class="elevation-0"
            hide-default-footer
          >
            <template v-slot:item.actions="{ item }">
              <v-btn text small color="error" @click="deleteCategory(item._id)">Eliminar</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-container>
      <h2 class="grey--text">Editar publicación</h2>
      <v-card class="mx-auto mt-4 pa-4" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Título" v-model="form.title" :rules="rules.title" required></v-text-field>
              </v-col>
              <v-col cols="9" md="9">
                <v-select
                  :items="categories"
                  item-text="title"
                  item-value="_id"
                  label="Categoría"
                  :rules="rules.category"
                  v-model="form.category"
                ></v-select>
              </v-col>
              <v-col cols="3" md="3">
                <v-btn color="secondary" depressed class="ml-3" @click="categoryDialog = true">Categoría</v-btn>
              </v-col>
              <v-col cols="12" md="12">
                <tiptap-vuetify
                    v-model="form.description"
                    :extensions="extensions"
                  />
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
        @click="editPost"
        :loading="loading"
        depressed
      >Guardar</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
  components: { TiptapVuetify },
  data: () => ({
    localEnv: 'http://localhost:5000/',
    prodEnv: 'http://housesinadmin.housesin.mx:45205/',
    categoryDialog: false,
    categories: [],
    newCategory: null,
    loading: false,
    categoryHeaders: [
      { text: "Categoría", value: "title" },
      { text: "Acciones", value: "actions" }
    ],
    selectedFile: null,
    image: "",
    form: {
      title: null,
      category: null,
      description: null
    },
    loading: false,
    valid: true,
    imageValid: false,
    imageRule: false,
    rules: {
      title: [v => !!v || "Título requerido"],
      category: [v => !!v || "Descripción requerida"],
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
      HardBreak
    ],
  }),
  mounted() {
    this.getCategories();
    this.getEditPost();
  },
  methods: {
    getEditPost() {
      this.$http
        .get(`blog/${this.$route.params.id}`)
        .then((res) => {
          let post = res.data.data;

          this.form.title = post.title;
          this.form.description = post.description;

          let category = post.category;
          this.form.category = category._id;

          // Change local or prod
          this.image = `${this.prodEnv}${post.image}`;
        })
        .catch((error) => console.log(error));
    },
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
      this.imageRule = false
    },
    removeImage() {
      this.selectedFile = null;
      this.image = "";
    },
    editPost() {
      this.loading = true;
      const formData = new FormData();

      formData.append("title", this.form.title);
      formData.append("category", this.form.category);
      formData.append("description", this.form.description);

      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }

      this.$http
        .put(`blog/${this.$route.params.id}`, formData)
        .then((res) => {
          this.loading = false;
          
          this.$store.commit("SNACKBAR", {
            text: "Publicación agregada con exito",
            type: "success",
            isShow: true
          });
          this.$router.replace("/blog");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategories() {
      this.$http
        .get(`blogCategory/`)
        .then((res) => {
          this.categories = res.data.data;
        })
        .catch((error) => console.log(error));
    },
    addCategory() {
      let form = {
        title: this.newCategory
      }

      this.$http
        .post(`blogCategory/`, form)
        .then((res) => {
          this.newCategory = null;
          this.getCategories();
        })
        .catch((error) => console.log(error));
    },
    deleteCategory(item) {
      this.$http
        .delete(`blogCategory/${item}`)
        .then((res) => {
          this.newCategory = null;
          this.getCategories();
        })
        .catch((error) => console.log(error));
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
