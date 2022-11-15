<template>
  <div class="content">
    <user-card_-header> </user-card_-header>
    <div class="container-fluid">
      <div class="col-md-8">
        </div>
      
        <user-card> </user-card>
      
    </div>
  </div>
</template>
<script>
import UserCard_Header from "./UserProfile/UserCard_Header_user.vue";
import UserCard from "./UserProfile/UserCard_user.vue";
export default {
  components: {
    UserCard_Header,
    UserCard,
  },
};
</script>
<style></style>
 