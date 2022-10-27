
<template>
  <div class="content">
    <ReservasCard_Header></ReservasCard_Header>
    <div class="container-fluid">
      <div class="row">
        <ReservasCard></ReservasCard>
      </div>
    </div>
  </div>
</template>
<script>
import ReservasCard_Header from "./Reservas/ReservasCard_Header.vue";
import ReservasCard from "./Reservas/ReservasCard.vue";
export default {
  components: {
    ReservasCard,
    ReservasCard_Header,
  },
};
</script>
