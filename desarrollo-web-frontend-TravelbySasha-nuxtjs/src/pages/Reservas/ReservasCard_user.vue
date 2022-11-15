<template>
  <center>
    <CRow :xs="{ cols: 1, gutter: 1 }" :md="{ cols: 2 }" v-show="!reservaEdit">
      <CCol xs v-for="d in data">
        <stats-card style="width: 30rem; height: 15rem">
          <div slot="header" class="icon-success">
            <i class="nc-icon nc-send"></i>
          </div>
          <div slot="content">
            <p class="card-tittle">Id Vuelo: {{ d.IdVuelo }}</p>
            <p class="card-title">Reserva: {{ d.IdUsuario }}</p>
            <p class="card-tittle">Cantidad de sillas: {{ d.cantidadSillas }}</p>
          </div>
          <div slot="footer">
            <button class="btn btn-light" v-on:click="consultarReserva(d)">
              Editar
            </button>
            <button class="btn btn-danger" v-on:click="eliminarReserva(d._id)">
              Eliminar
            </button>
          </div>
        </stats-card>
      </CCol>
    </CRow>
    <div v-show="reservaEdit">
      <h4 slot="header" class="card-title">Editar Reserva</h4>
      <form>
        <div class="row">
          <div class="col-md-5">
            <base-input type="text" label="Id del vuelo" disabled placeholder="id vuelo" v-model="dataEdit.IdVuelo">
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input type="text" label="IdUsuario" disabled placeholder="id del usuario" v-model="dataEdit.IdUsuario">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="number" label="cantidad de sillas" placeholder="cantidad*" v-model="dataEdit.cantidadSillas">
            </base-input>
          </div>
        </div>
        <center>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill float-right"
              @click.prevent="updateReserva(dataEdit._id)">
              Actualizar reserva
            </button>
          </div>
        </center>
        <div class="clearfix"></div>
      </form>
    </div>
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
      reservaEdit: false,
      emptyFields: false,
      data: [],
      dataBack:[],
      dataEdit: {
        _id: "",
        IdVuelo: "",
        IdUsuario: "",
        cantidadSillas: 0,
      },
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
      this.reservaEdit = true;
      this.dataEdit.IdUsuario = d.IdUsuario;
      this.dataEdit.IdVuelo = d.IdVuelo;
      this.dataEdit.cantidadSillas = d.cantidadSillas;
      this.dataEdit._id = d._id;
      
    },
    async eliminarReserva(idReserva) {
      let url = "http://localhost:8000/reservas/" + idReserva;
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
          text: "no se pudo elimina la reserva!",
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "Modificación Realizada",
          text: "reserva eliminada!",
        });
        location.reload();
      }
    },
    async updateReserva(id) {
      let url = "http://localhost:8000/reservas/" + id;
      let token = localStorage.getItem("user-token");
      token = token.slice(1, -1);
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.dataEdit),
      });
      let info = await response.json();
      if (info.message == "Reserva actualizada.") {
        await Swal.fire({
          icon: "success",
          title: "Excelente",
          text: "Reserva editada con éxito!",
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
  },
  async mounted() {
    let user=localStorage.getItem("user-logged")
    user=JSON.parse(user)._id
    
    let url = "http://localhost:8000/reservas/usuarios/"+user;
    let token = localStorage.getItem("user-token");
    token = token.slice(1, -1);
    const headers = { authorization: `Bearer ${token}` };
    let response = await fetch(url, { headers });
    let promise = await response.json();
    let datos = await promise.info;
    this.data = datos; 
  },
};
</script>
