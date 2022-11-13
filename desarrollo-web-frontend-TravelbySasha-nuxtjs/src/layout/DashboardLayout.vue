<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-planet"></i>
        <p>Inicio</p>
      </sidebar-link>

      <sidebar-link to="/admin/aviones">
        <i class="nc-icon nc-air-baloon"></i>
        <p>Aviones</p>
      </sidebar-link>
      <sidebar-link to="/admin/reservas">
        <i class="nc-icon nc-email-83"></i>
        <p>Reservas</p>
      </sidebar-link>
      <sidebar-link to="/admin/usuarios">
        <i class="nc-icon nc-badge"></i>
        <p>Usuarios</p>
      </sidebar-link>

      <sidebar-link to="">
        <div @click="cerrarSesion()">
          <i class="nc-icon nc-simple-remove"></i>
          <p>Salir</p>
        </div>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click="toggleSidebar"> </dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    cerrarSesion() {
      localStorage.clear();
      console.log("sesion cerrada");
      window.location.href = "/";
    },
  },
};
</script>
