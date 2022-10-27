<template>
  <div>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
      <CCol xs v-for="d in data" @click="consultarUsuario(d)">
        <stats-card>
          <div slot="header" class="icon-success">
            <i class="nc-icon nc-map-big"></i>
          </div>
          <div slot="content">
            <p class="card-tittle">{{ d.IdAvion }}</p>
            <h4 class="card-title">Tiempo: {{ d.Tiempo }}</h4>
            <h4 class="card-category">{{ d.FechaDespegue }}</h4>
            <h4 class="card-category">{{ d.FechaAterrizaje }}</h4>
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
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
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
    async consultarUsuario(d) {
      let url = "http://localhost:8000/vuelos/" + d._id;
      let response = await fetch(url);
      let promise = await response.json();
      let datos = promise.info;
    },
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
