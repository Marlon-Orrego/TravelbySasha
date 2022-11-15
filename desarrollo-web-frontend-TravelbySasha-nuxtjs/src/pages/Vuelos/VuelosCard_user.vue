<template>
  <center>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
      <CCol xs v-for="d in data" @click="consultarUsuario(d)">
        <stats-card style="width: 23rem; height: 20rem">
          <div slot="header" class="icon-success">
            <i class="nc-icon nc-map-big"></i>
          </div>
          <div slot="content">
            <p class="card-tittle">Avión: {{ d.IdAvion }}</p>
            <p class="card-tittle">piloto: {{ d.IdPiloto }}</p>
            <h4 class="card-category">Tiempo: {{ d.Tiempo }}</h4>
            <h4 class="card-category">Despegue: {{ d.FechaDespegue }}</h4>
            <h4 class="card-category">Aterrizaje: {{ d.FechaAterrizaje }}</h4>
          </div>
          <div slot="footer">
            <button class="btn btn-light" v-on:click="ReservarVueloForm(d)">
              Reservar
            </button>
          </div>
        </stats-card>
      </CCol>
    </CRow>


  </center>
</template>
<script>
import {
  CRow,
  CCard,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardFooter,
} from "@coreui/bootstrap-vue";
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import Swal from "sweetalert2";
export default {
  components: {
    CRow,
    CCard,
    CCol,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardFooter,
    ChartCard,
    LTable,
    StatsCard,
  },
  data() {
    return {
      cantidadSillasForm: false,
      emptyFields: false,
      data: [],
      datosReserva: {
        IdUsuario: "",
        IdVuelo: "",
        cantidadSillas: ""
      }
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-md col-md-offset-1";
      } else if (remainder === 2) {
        return "col-md";
      } else {
        return "col-md";
      }
    },
    async ReservarVueloForm(d) {
      await Swal.fire({
        title: 'Ingresa la cantidad de sillas',
        input: 'number',
        inputValidator: (value) => {
          this.datosReserva.cantidadSillas = value
          this.ReservarVuelo(d)
        }
      })
    },
    async ReservarVuelo(d) {
      let user = localStorage.getItem("user-logged")
      user = JSON.parse(user)
      this.datosReserva.IdUsuario = user._id
      this.datosReserva.IdVuelo = d._id
      if (this.datosReserva.cantidadSillas != "" && this.datosReserva.cantidadSillas != "e") {
        this.datosReserva.cantidadSillas = parseInt(this.datosReserva.cantidadSillas, 10)
        let url = "http://localhost:8000/reservas";
        let token = localStorage.getItem("user-token");
        token = token.slice(1, -1);
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(this.datosReserva),
        });
        response = await response.json()
        if (response.message == "1") {
          await Swal.fire({
            icon: "success",
            title: "Enhorabuena!",
            text: "Reserva realizada con éxito.",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Oh oh...",
            text: "Hubo algun error en tu reserva.",
          });
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Oh oh...",
          text: "Debes proporcionar la información requerida.",
        });
      }
      this.cantidadSillasForm = false
    }

  },
  async mounted() {
    let url = "http://localhost:8000/vuelos";
    let token = localStorage.getItem("user-token");
    token = token.slice(1, -1);
    const headers = { authorization: `Bearer ${token}` };
    let response = await fetch(url, { headers });
    let promise = await response.json();
    let datos = promise.info;
    this.data = datos;
    for (let i = 0; i < this.data.length; i++) {

      let url = "http://localhost:8000/aviones/" + this.data[i].IdAvion;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };
      let response = await fetch(url, { headers });
      let avion = await response.json()
      avion = avion.info
      this.data[i].IdAvion = avion.nombre

    }
  },
};
</script>
