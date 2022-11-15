
<template>
  <div class="content">
    <ReservasCard_Header></ReservasCard_Header>
    <div class="container-fluid">
      <div class="row">
        <ReservasCard_user></ReservasCard_user>
      </div>
    </div>
  </div>
</template>
<script>
import ReservasCard_Header from "./Reservas/ReservasCard_Header.vue";
import ReservasCard_user from "./Reservas/ReservasCard_user.vue";
export default {
  components: {
    ReservasCard_user,
    ReservasCard_Header,
  },
};
</script>
