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
import AvionesCard_Header from "./UserProfile/AvionesCard_Header.vue";
import AvionesCard from "./UserProfile/AvionesCard.vue";

export default {
  components: {
    AvionesCard,
    AvionesCard_Header,
  },
};
</script>
