<template>
  <div class="login">
    <v-card width="400" class="mx-auto mt-5 pa-4 mt-12" outlined>
      <v-card-title>
        <!-- <v-img
          class="mx-0 auto"
          src="@/assets/housesin-logo.png"
          max-height="196"
        ></v-img> -->
        <!-- <img src="@/assets/logo.svg" alt=""> -->
        <h1 class="display-1">Rentax Admin</h1>
      </v-card-title>

      <form @submit.prevent="login">
        <v-card-text class="mt-8">
          <v-text-field label="Usuario" prepend-icon="mdi-account-circle" v-model="user.email" :rules="emailRules"></v-text-field>
          <v-text-field type="password" label="Contraseña" prepend-icon="mdi-lock" v-model="user.password" :rules="passwordRules"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" depressed block >Ingresar</v-btn>
        </v-card-actions>
        <v-card-actions>
          <p class="error--text">{{ errorMessage }}</p>
        </v-card-actions>
      </form>
      
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    showPassword: false,
    user: {
      email: null,
      password: null
    },
    emailRules: [
      v => !!v || "Correo electrónico requerido",
      v => /.+@.+\..+/.test(v) || "Correo electrónico invalido"
    ],
    passwordRules: [v => !!v || "Contraseña requerida"],
    errorMessage: ""
  }),
  methods: {
    ...mapActions(["guardarToken", "updateUser"]),
    login() {
      this.loading = true;
      this.$http
        .post(`/user/login`, this.user)
        .then(response => {
          console.log(response)
          const data = response.data;
          this.updateUser(data);
          this.guardarToken(data.token);
          this.loading = false;
          this.$router.push({
            name: "developments"
          });
        })
        .catch(error => {
          const response = error.response;
          console.log(response)
          console.log(response.data.message)
          this.errorMessage = response.data.message;
          this.errorMessage = errors.translate(response.data.error);
          this.loading = false;
        });
    }
  }
}
</script>