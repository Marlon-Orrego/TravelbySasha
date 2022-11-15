<template>
  <card class="background">
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
                <center>
                  <h3>Iniciar Sesión</h3>
                  <hr />
                </center>
                <form class="form-group">
                  <input
                    v-model="idLogin"
                    type="email"
                    class="form-control"
                    placeholder="Correo"
                    required
                  />
                  <input
                    v-model="passwordLogin"
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    required
                  />
                  <center>
                    <input
                      type="submit"
                      class="btn btn-primary"
                      @click="doLogin"
                    />
                  </center>
                  <center>
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
                  </center>
                </form>
              </div>

              <div
                v-else
                class="card register"
                v-bind:class="{ error: emptyFields }"
              >
                <Center>
                  <h3>Registrate</h3>
                  <hr />
                </Center>
                <form class="form-group">
                  <input
                    v-model="correoReg"
                    type="email"
                    class="form-control"
                    placeholder="Correo*"
                    required
                  />
                  <input
                    v-model="idReg"
                    type="number"
                    class="form-control"
                    placeholder="C.C"
                    required
                  />
                  <input
                    v-model="nameReg"
                    type="text"
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

                  <center>
                    <input
                      type="submit"
                      class="btn btn-primary"
                      @click="doRegister"
                    />
                  </center>

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
import Swal from "sweetalert2";
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
      correoReg: "",
      emptyFields: false,
    };
  },
  methods: {
    async doLogin() {
      event.preventDefault();
      Swal.fire({
        icon: "info",
        text: "Iniciando sesión...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      if (this.idLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        let user = {
          correo: this.idLogin,
          contraseña: this.passwordLogin,
        }; 

        let url = "http://localhost:8000/login";
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(user),
        });
        

        let data = await response.json();
        
        if (data.message == "1") {
          localStorage.setItem("user-logged", JSON.stringify(data.info));
          localStorage.setItem("user-token", JSON.stringify(data.info.token));

          Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: "has iniciado sesión!",
          });
          
          this.$router.push({ path: "/home" });
          window.location.reload()
        } else if (data.message == "2") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "correo o contraseña incorrecta!",
          });
        } else if (data.message == "3") {
          Swal.fire({
            icon: "info",
            title: "No tienes una cuenta?",
            text: "Resgistrate para ingresar.",
          });
        }
      }
    },

    async doRegister() {
      event.preventDefault();
      if (
        this.idReg === "" ||
        this.passwordReg === "" ||
        this.confirmReg === ""
      ) {
        this.emptyFields = true;
      } else {
        let user = {
          IdUsuario: this.idReg,
          nombre: this.nameReg,
          tipo: "user",
          correo: this.correoReg,
          contraseña: this.passwordReg,
          create_by:this.nameReg
        };
        let url = "http://localhost:8000/usuario";
        let token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZlZGEzN2FkNzg2ZTBlMjlmZjZkZDIiLCJJZFVzdWFyaW8iOiIxMDAwNDEzNzQxIiwibm9tYnJlIjoiTWFybG9uIE9ycmVnbyIsInRpcG8iOiJ1c2VyIiwiY29ycmVvIjoibWFybG9ucmVzdHJlcG9AZ21haWwuY29tIiwiaWF0IjoxNjY4MjEwNTU5fQ.Pl9SdO_ZSYaQAZszVGZ4brB-woszU-gMec4LCqJw2eU";
        
        let response = await fetch(url, {
          method: "POST",
          headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
          body: JSON.stringify(user),
        });
        let data = await response.json();
        if (data.message == "Usuario no creado") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "usuario ya registrado!",
          });
        } else if (data.message == "1") {
          Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: "te has registrado!",
          });
        }
      }
    },
    
  },
  mounted() {
      let user=localStorage.getItem("user-logged")
      if(user!=null){
        this.$router.push({ path: "/home" });
      }
      
    }
};
</script>
<style></style>
<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>
<style></style>
