<template>
  <div class="content">
    <user-card_-header> </user-card_-header>
    <div class="container-fluid">
      <div class="col-md-8">
        </div>
      <div class="row">
        <user-card> </user-card>
      </div>
    </div>
  </div>
</template>
<script>
import UserCard_Header from "./UserProfile/UserCard_Header.vue";
import UserCard from "./UserProfile/UserCard.vue";
export default {
  components: {
    UserCard_Header,
    UserCard,
  },
};
</script>
<style></style>
 