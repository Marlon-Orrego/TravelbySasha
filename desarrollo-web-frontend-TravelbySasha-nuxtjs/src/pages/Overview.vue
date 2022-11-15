
<template>
  <div class="content">
    <VuelosCard_Header></VuelosCard_Header>
    <center>
      <button class="btn btn-light" @click="formAñadir()">+ Añadir</button>
    </center>
    <br><br>
    <div class="container-fluid">
      <div class="row" v-show="!formVuelo">
        <VuelosCard></VuelosCard>
      </div>
      <div class="row" v-show="formVuelo">
        <form>
          <div class="row">
            <div class="col-md-5">
              <base-input type="text" label="Id del avion" placeholder="id avion" v-model="dataRegistro.IdAvion"
                list="aviones">
              </base-input>
              <datalist id="aviones">
                
              </datalist>
            </div>
            <div class="col-md-3">
              <base-input type="text" label="nombre del piloto" placeholder="Nombre del piloto" v-model="dataRegistro.IdPiloto">
              </base-input>
            </div>
            <div class="col-md-4">
              <base-input type="date" label="Fecha de despegue" placeholder="Fecha de despegue"
                v-model="dataRegistro.FechaDespegue">
              </base-input>
            </div>
            <div class="col-md-4">
              <base-input type="date" label="Fecha de aterrizaje" placeholder="Fecha de aterrizaje"
                v-model="dataRegistro.FechaAterrizaje">
              </base-input>
            </div>
            <div class="col-md-4">
              <base-input type="number" label="Tiempo de vuelo" placeholder="Tiempo de vuelo"
                v-model="dataRegistro.Tiempo">
              </base-input>
            </div>
          </div>
          <center>
            <div class="text-center">
              <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="registrarVuelo()">
                Registrar vuelo
              </button>
            </div>
          </center>
          <div class="clearfix"></div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import VuelosCard_Header from "./Vuelos/VuelosCard_Header.vue";
import VuelosCard from "./Vuelos/VuelosCard.vue";
import Swal from "sweetalert2";
export default {
  components: {
    VuelosCard,
    VuelosCard_Header,
  },
  data() {
    return {
      formVuelo: false,
      dataRegistro: {
        IdPiloto: "",
        IdAvion: "",
        FechaAterrizaje: "",
        FechaDespegue: "",
        Tiempo: 0,
      },
      
      pilotos: []
    }
  },
  methods: {
    async formAñadir() {
      this.formVuelo = true
      let url = "http://localhost:8000/aviones";
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        }
      });
      response = await response.json()
      response=response.info
      let aviones=document.getElementById("aviones")
      response.forEach(element => {
        aviones.innerHTML+=`
        <option value="${element._id}">${element.nombre}</option>
        `
      });
      console.log(response)
    },
    async registrarVuelo() {
      let url = "http://localhost:8000/vuelos";
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.dataRegistro),
      });
      console.log(response);
      let info = await response.json();
      console.log(info)
      if (info.message == "Vuelo creado.") {
        await Swal.fire({
          icon: "success",
          title: "Excelente",
          text: "Vuelo registrado con éxito!",
        });
        location.reload();
      } else {
        await Swal.fire({
          icon: "error",
          title: "oh no...",
          text: "Ha ocurrido un error registrando el vuelo",
        });
      }
      this.formVuelo = false
      console.log(await response.json());
    }
  },

};
</script>