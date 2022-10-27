<template>
  <center>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
      <CCol xs v-for="d in data" @click="consultarUsuario(d)">
        <stats-card>
          <div slot="header" class="icon-success">
            <i class="nc-icon nc-send"></i>
          </div>
          <div slot="content">
            <p class="card-tittle">Id Vuelo: {{ d.IdVuelo }}</p>
            <h4 class="card-title">Reserva: {{ d.IdUsuario }}</h4>
            <h4 class="card-category">{{ d.precio }}$</h4>
            <button v-on:click="eliminarReserva(d._id)">Eliminar</button>
          </div>
        </stats-card>
      </CCol>
    </CRow>
  </center>
</template>
<script>
import StatsCard from "src/components/Cards/StatsCard.vue";
import Swal from "sweetalert2";
import {
  CRow,
  CCard,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardFooter,
} from "@coreui/bootstrap-vue";
export default {
  components: {
    CRow,
    CCard,
    CCol,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardFooter,
    StatsCard,
  },
  data() {
    return {
      registerActive: false,
      emptyFields: false,
      data: [],
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
    async consultarReserva(d) {
      let url = "http://localhost:8000/reservas/" + d._id;
      let response = await fetch(url);
      let promise = await response.json();
      let datos = promise.info;
    },
    async eliminarReserva(idReserva) {
      let url = "http://localhost:8000/reservas/" + idReserva;
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      let data = await response.json();
      if (data.message == "0") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo elimina la reserva!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Modificación Realizada",
          text: "reserva eliminada!",
        });
      }
    },
  },
  async mounted() {
    let url = "http://localhost:8000/reservas";
    let response = await fetch(url);
    let promise = await response.json();
    let datos = promise.info;
    this.data = datos;
    console.log(datos);
  },
};
</script>
