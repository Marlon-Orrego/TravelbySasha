<template>
  <div>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }">
      <CCol xs v-for="d in data" @click="consultarUsuario(d)">
        <stats-card style="width: 23rem; height: 13rem">
          <div slot="header" class="icon-success">
            <i class="nc-icon nc-send"></i>
          </div>
          <div slot="content">
            <p class="card-tittle">Nombre: {{ d.nombre }}</p>
            <h4 class="card-title">Capacidad: {{ d.capacidad }}</h4>
            <h4 class="card-category">Tipo: {{ d.tipo }}</h4>
            <table>
              <tr>
                <td>
                  <button class="btn btn-light" v-on:click="consultarAvion(d)">
                    Editar
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger" v-on:click="borrarAvion(d)">
                    Eliminar
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </stats-card>
      </CCol>
    </CRow>
  </div>
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
import Swal from "sweetalert2";
import StatsCard from "src/components/Cards/StatsCard.vue";
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
    async consultarAvion(d) {
      let url = "http://localhost:8000/aviones/" + d._id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };
      let response = await fetch(url, { headers });
      let promise = await response.json();
      let datos = promise.info;
    },
    async borrarAvion(id) {
      let url = "http://localhost:8000/aviones/" + id._id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };
      let response = await fetch(url, {
        method: "DELETE",
        headers,
      });
      let data = await response.json();
      if (data.message == "0") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo elimina el avión!",
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "Modificación Realizada",
          text: "avión eliminado!",
        });
        location.reload();
      }
    },
  },
  async mounted() {
    let url = "http://localhost:8000/aviones";
    let token = localStorage.getItem("user-token");
    token = token.slice(1, -1);
    const headers = { authorization: `Bearer ${token}` };
    let response = await fetch(url, { headers });
    let promise = await response.json();
    let datos = promise.info;
    this.data = datos;
  },
};
</script>
