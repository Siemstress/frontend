<template>
  <div class="container p-3 px-5">
    <!-- user list (cards) -->
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div v-for="user in users" :data-user-id="user.id" class="col">
        <div class="card">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
}
</script>