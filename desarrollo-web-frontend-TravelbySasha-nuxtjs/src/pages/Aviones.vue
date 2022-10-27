
<template>
  <div class="content">
    <AvionesCard_Header></AvionesCard_Header>
    <div class="container-fluid">
      <div class="row">
        <AvionesCard></AvionesCard>
      </div>
    </div>
  </div>
</template>
<script>
import AvionesCard_Header from "./Aviones/AvionesCard_Header.vue";
import AvionesCard from "./Aviones/AvioneCard.vue";
export default {
  components: {
    AvionesCard,
    AvionesCard_Header,
  },
};
</script>