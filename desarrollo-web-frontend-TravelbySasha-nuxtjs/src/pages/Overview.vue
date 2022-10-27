
<template>
  <div class="content">
    <VuelosCard_Header></VuelosCard_Header>
    <div class="container-fluid">
      <div class="row">
        <VuelosCard></VuelosCard>
      </div>
    </div>
  </div>
</template>
<script>
import VuelosCard_Header from "./Vuelos/VuelosCard_Header.vue";
import VuelosCard from "./Vuelos/VuelosCard.vue";
export default {
  components: {
    VuelosCard,
    VuelosCard_Header,
  },
};
</script>