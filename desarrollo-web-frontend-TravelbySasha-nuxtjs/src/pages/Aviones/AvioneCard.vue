<template>
  <center>
  <div>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }" v-show="!avionEdit">
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
    <div v-show="avionEdit">
      <h4 slot="header" class="card-title">Editar Avión</h4>
      <form>
        <div class="row">
          <div class="col-md-5">
            <base-input type="text" label="Nombre" placeholder="Nombre" v-model="dataEdit.nombre">
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input type="number" label="Capacidad" placeholder="Capacidad" v-model="dataEdit.capacidad">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="text" label="Tipo" placeholder="Tipo" v-model="dataEdit.tipo">
            </base-input>
          </div>
        </div>
        <center>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill float-right"
              @click.prevent="updateAvion(dataEdit._id)">
              Actualizar avion
            </button>
          </div>
        </center>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
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
      dataEdit: {nombre: "", capacidad: 0, tipo: "",_id:""},
      avionEdit: false,
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
    async updateAvion(id) {
      let url = "http://localhost:8000/aviones/" + id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      this.dataEdit.capacidad = parseInt(this.dataEdit.capacidad,10)
      console.log(this.dataEdit);
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.dataEdit),
      });
      let info = await response.json();
      if (info.message == "Avion actualizado.") {
        await Swal.fire({
          icon: "success",
          title: "Excelente",
          text: "Avion editado con éxito!",
        });
        location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "oh no...",
          text: "Ha ocurrido un error actualizando la reserva",
        });
      }
      console.log(await response.json());
    },
    async consultarAvion(d) {
      this.avionEdit = true
      let url = "http://localhost:8000/aviones/" + d._id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };
      let response = await fetch(url, { headers });
      let promise = await response.json();
      let datos = promise.info;
      this.dataEdit.capacidad = datos.capacidad
      this.dataEdit.nombre = datos.nombre
      this.dataEdit.tipo = datos.tipo
      this.dataEdit._id = datos._id
    },
    async borrarAvion(id) {
      let urlVuelos = "http://localhost:8000/vuelos/avion/" + id._id
      let url = "http://localhost:8000/aviones/" + id._id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      const headers = { authorization: `Bearer ${token}` };
      let responseVuelos = await fetch(urlVuelos, {
        method: "GET",
        headers,
      });
      responseVuelos = await responseVuelos.json()
      responseVuelos = responseVuelos.info
      if (responseVuelos <= 0) {
        let response = await fetch(url, {
          method: "DELETE",
          headers,
        });
        let data = await response.json();
        if (data.message == "0") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "no se pudo eliminar el avión!",
          });
        } else {
          await Swal.fire({
            icon: "success",
            title: "Modificación Realizada",
            text: "avión eliminado!",
          });
          location.reload();
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo eliminar el avión!",
        });
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
