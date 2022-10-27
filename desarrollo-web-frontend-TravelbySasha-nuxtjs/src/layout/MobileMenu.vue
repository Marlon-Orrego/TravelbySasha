<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <a class="nav-link" href="#/">
        
      </a>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'mobile-menu',
  
    methods: {
    cerrarSesion(){
      localStorage.removeItem("user")
      console.log("sesion cerrada")
    }}
  }
  
    
</script>
<style>
</style>
