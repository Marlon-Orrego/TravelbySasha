
<template>
  <div class="content">
    <AvionesCard_Header v-show="!registro"></AvionesCard_Header>
    <center>
      <button v-show="!registro" class="btn btn-light" @click="anadir()">+ Añadir</button>
    </center>
    <br>
    <div class="container-fluid">
      <div class="row" v-show="!registro">
        <AvionesCard></AvionesCard>
      </div>
      <div v-show="registro">

        <card>

          <h4 slot="header" class="card-title">Registrar Avión</h4>
          <form>
            <div class="row">
              <div class="col-md-5">
                <base-input type="text" label="Nombre" placeholder="Nombre" v-model="nombre">
                </base-input>
              </div>
              <div class="col-md-3">
                <base-input type="text" label="Capacidad" placeholder="Capacidad" v-model="Capacidad">
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input type="text" label="Tipo" placeholder="Tipo" v-model="tipo">
                </base-input>
              </div>
            </div>
            <center>
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right" @click="RegistrarAvion()">
                  Registrar
                </button>
              </div>
            </center>
            <div class="clearfix"></div>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import AvionesCard_Header from "./Aviones/AvionesCard_Header.vue";
import AvionesCard from "./Aviones/AvioneCard.vue";
import Swal from "sweetalert2";
export default {
  components: {
    AvionesCard,
    AvionesCard_Header,

  },
  data() {
    return {
      registro: false,
      nombre: "",
      Capacidad: "",
      tipo: ""
    }

  },
  methods: {
    anadir() {
      this.registro = true
    },
    async RegistrarAvion() {
      let user = {
        "nombre": this.nombre,
        "capacidad": this.Capacidad,
        "tipo": this.tipo
      }
      let url = "http://localhost:8000/aviones"
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      let promise=await response.json()
      if (promise.message=="1"){
        await Swal.fire({
          icon: "success",
          title: "Enhorabuena",
          text: "Has creado un avión.",
        });
        window.location.reload()
      }else{
        Swal.fire({
          icon: "error",
          title: "oh no...",
          text: "Ha ocurrido un error creando el avión.",
        });
      }
    }
  }
};
</script>