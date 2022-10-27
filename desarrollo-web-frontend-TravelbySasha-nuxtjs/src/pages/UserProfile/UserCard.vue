<template>

  <ul>
    <li class="listado" v-for="d in data" @click="consultarUsuario(d)">
      {{ d.nombre }}
      
    </li>

  </ul>


</template>
<script>
import Card from 'src/components/Cards/Card.vue'
export default {
  components: {
    Card
  },
  data() {

    return {
      registerActive: false,
      emptyFields: false,
      data: []

    }
  },
  methods: {

    getClasses(index) {
      var remainder = index % 3
      if (remainder === 0) {
        return 'col-md-3 col-md-offset-1'
      } else if (remainder === 2) {
        return 'col-md-4'
      } else {
        return 'col-md-3'
      }
    },
    async consultarUsuario(d) {
      let url = "http://localhost:8000/usuarios/" + d._id
      let response = await fetch(url)
      let promise = await response.json()
      let datos = promise.info

    }
  },
  async mounted() {
    let url = "http://localhost:8000/usuarios"
    let response = await fetch(url)
    let promise = await response.json()
    let datos = promise.info
    this.data = datos
    console.log(datos)
  }
}

</script>
<style>
.listado {
  list-style: none;
  padding: 5%;
  background-color: #D1D1D1;
  margin-top: 5%;
  cursor: pointer;
  width: 100%;
}
</style>
