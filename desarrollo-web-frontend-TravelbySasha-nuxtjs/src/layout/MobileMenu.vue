<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <a class="nav-link" onclick="cerrarSesion()"> </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: "mobile-menu",

  methods: {
    cerrarSesion() {
      localStorage.clear();
      console.log("sesion cerrada");
    },
  },
};
</script>
<style></style>
