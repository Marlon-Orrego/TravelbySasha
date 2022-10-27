<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1">
          
          <EditProfileFormVue></EditProfileFormVue>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "./UserProfile/UserCard.vue";
import EditProfileFormVue from "./UserProfile/EditProfileForm.vue";
export default {
  components: {
    UserCard,
    EditProfileFormVue
  },
};
</script>
<style></style>
