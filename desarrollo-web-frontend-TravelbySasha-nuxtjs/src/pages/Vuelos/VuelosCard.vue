<template>
  <center>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }" v-show="!vuelosEdit">
      <CCol xs v-for="d in data" @click="consultarUsuario(d)">
        <stats-card style="width: 23rem; height: 16rem;">
          <div slot="header" class="icon-success">
            <i class="nc-icon nc-map-big"></i>
          </div>
          <div slot="content">
            <p class="card-tittle">{{ d.IdAvion }}</p>
            <h4 class="card-title">Tiempo: {{ d.Tiempo }}</h4>
            <h4 class="card-category">{{ d.FechaDespegue }}</h4>
            <h4 class="card-category">{{ d.FechaAterrizaje }}</h4>
          </div>
          <div slot="footer">
            <button class="btn btn-light" v-on:click="consultarVuelo(d)">Editar</button>
                <button class="btn btn-danger" v-on:click="borrarVuelo(d)">Eliminar</button>
                <button class="btn btn-info" v-on:click="hacerReserva(d)">Reservar</button>
             
          </div>
        </stats-card>
      </CCol>

    </CRow>
    <div v-show="vuelosEdit">
      <form>
        <div class="row">
          <div class="col-md-5">
            <base-input type="text" label="Id del avion" placeholder="id avion" v-model="dataEdit.IdAvion">
            </base-input>
          </div>
          <div class="col-md-3">
            <base-input type="text" label="Id del piloto" placeholder="id del piloto" v-model="dataEdit.IdPiloto">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="date" label="Fecha de despegue" placeholder="Fecha de despegue"
              v-model="dataEdit.FechaDespegue">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="date" label="Fecha de aterrizaje" placeholder="Fecha de aterrizaje"
              v-model="dataEdit.FechaAterrizaje">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="number" label="Tiempo de vuelo" placeholder="Tiempo de vuelo" v-model="dataEdit.tiempo">
            </base-input>
          </div>
        </div>
        <center>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateVuelo(dataEdit._id)">
              Actualizar vuelo
            </button>
          </div>
        </center>
        <div class="clearfix"></div>
      </form>
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
      vuelosEdit: false,
      emptyFields: false,
      data: [],
      dataEdit: {
        _id: "",
        IdPiloto: "",
        IdAvion: "",
        FechaAterrizaje: "",
        FechaDespegue: "",
        tiempo: 0
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
    async consultarVuelo(d) {
      this.vuelosEdit = true
      let url = "http://localhost:8000/vuelos/" + d._id;
      let response = await fetch(url);
      let promise = await response.json();
      let datos = promise.info;
      this.dataEdit._id = datos._id
      this.dataEdit.IdPiloto = datos.IdPiloto
      this.dataEdit.IdAvion = datos.IdAvion
      this.dataEdit.FechaDespegue = datos.FechaDespegue
      this.dataEdit.FechaAterrizaje = datos.FechaAterrizaje
      this.dataEdit.tiempo=datos.Tiempo
    },
    async updateVuelo(id) {
      let url = "http://localhost:8000/vuelos/" + id;
      console.log(this.dataEdit)
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.dataEdit)
      });
      console.log(response)
      let info = await response.json()
      if (info.message == 'Vuelo actualizado.') {
        await Swal.fire({
          icon: 'success',
          title: 'Excelente',
          text: 'Vuelo editado con éxito!',

        })
        location.reload()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'oh no...',
          text: 'Ha ocurrido un error actualizando el vuelo',

        })
      }
      console.log(await response.json())
    },
    async borrarVuelo(id) {
      let url = "http://localhost:8000/vuelos/" + id._id;
      let response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }

      });
      let data = await response.json();
      if (data.message == "0") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo elimina el vuelo!",
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "Modificación Realizada",
          text: "vuelo eliminado!",
        });
        location.reload()
      }
    }
  },
  async mounted() {
    let url = "http://localhost:8000/vuelos";
    let response = await fetch(url);
    let promise = await response.json();
    let datos = promise.info;
    this.data = datos;
    console.log(datos);
  },
};
</script>