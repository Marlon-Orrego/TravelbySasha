
<template>
    <div>
      <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
        <CCol xs v-for="d in data" @click="consultarUsuario(d)">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-send"></i>
            </div>
            <div slot="content">
              <p class="card-tittle">{{ d.nombre }}</p>
              <h4 class="card-title">Capacidad{{ d.capacidad }}</h4>
              <h4 class="card-category">{{ d.tipo }}</h4>
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
      async consultarUsuario(d) {
        let url = "http://localhost:8000/aviones/" + d._id;
        let response = await fetch(url);
        let promise = await response.json();
        let datos = promise.info;
      },
    },
    async mounted() {
      let url = "http://localhost:8000/aviones";
      let response = await fetch(url);
      let promise = await response.json();
      let datos = promise.info;
      this.data = datos;
      console.log(datos);
    },
  };
  </script>