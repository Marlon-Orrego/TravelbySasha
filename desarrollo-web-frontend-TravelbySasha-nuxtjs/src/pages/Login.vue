<template>
  <card>
    <div id="app">
      <div class="login-page">
        <transition name="fade">
          <div v-if="!registerActive" class="wallpaper-login"></div>
        </transition>
        <div class="wallpaper-register"></div>

        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
              <div
                v-if="!registerActive"
                class="card login"
                v-bind:class="{ error: emptyFields }"
              >
                <center><h1>Iniciar Sesión</h1></center>
                <form class="form-group">
                  <input
                    v-model="idLogin"
                    type="Cuenta de Usuario"
                    class="form-control"
                    placeholder="Cuenta de Usuario"
                    required
                  />
                  <input
                    v-model="passwordLogin"
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    required
                  />
                  <input
                    type="submit"
                    class="btn btn-primary"
                    @click="doLogin"
                  />
                  <p>
                    No tienes una cuenta?
                    <a
                      href="#"
                      @click="
                        (registerActive = !registerActive),
                          (emptyFields = false)
                      "
                      >Registrate aquí.</a
                    >
                  </p>
                </form>
              </div>

              <div
                v-else
                class="card register"
                v-bind:class="{ error: emptyFields }"
              >
                <Center><h1>Registrate</h1></Center>
                <form class="form-group">
                  <input
                    v-model="idReg"
                    type="email"
                    class="form-control"
                    placeholder="C.C"
                    required
                  />
                  <input
                    v-model="nameReg"
                    type="name"
                    class="form-control"
                    placeholder="Nombre Completo"
                    required
                  />
                  <input
                    v-model="passwordReg"
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    required
                  />
                  <input
                    v-model="confirmReg"
                    type="password"
                    class="form-control"
                    placeholder="Confirmar Contraseña"
                    required
                  />

                  <input
                    type="submit"
                    class="btn btn-primary"
                    @click="doRegister"
                  />
                  <p>
                    Ya tienes una cuenta?
                    <a
                      href="#"
                      @click="
                        (registerActive = !registerActive),
                          (emptyFields = false)
                      "
                      >Inicia sesión aquí</a
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";

export default {
  components: {
    Card,
  },
  data() {
    return {
      registerActive: false,
      idLogin: "",
      passwordLogin: "",
      idReg: "",
      passwordReg: "",
      confirmReg: "",
      nameReg: "",
      emptyFields: false,
    };
  },
  methods: {
    doLogin() {
      if (this.idLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        alert("You are now logged in");
      }
    },

    doRegister() {
      if (
        this.idReg === "" ||
        this.passwordReg === "" ||
        this.confirmReg === ""
      ) {
        this.emptyFields = true;
      } else {
        alert("You are now registered");
      }
    },
  },
};
</script>
<style></style>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
<style></style>
