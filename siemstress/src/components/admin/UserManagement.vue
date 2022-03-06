<template>
  <div class="container p-3 px-5">
    <!-- user list (cards) -->
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div v-for="user of this.users" v-bind:key="user" class="col">
        <div class="card">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  props: {
    userID: Number,
    userRole: String,
  },
  data() {
    return {
      users: null
    };
  },
  async beforeMount() {
    // this.USERS = [
    //   {id: 1, username: "pmehlb", name: "Pat Mehlbaum", email: "pmehlb@gmail.com"},
    //   {id: 2, username: "cze", name: "Zach Kroesen", email: "cgrabda@gmail.com"},
    //   {id: 3, username: "cgrabda", name: "Chris Grabda", email: "zach@zachkroesen.com"},
    //   {id: 4, username: "zjw4373", name: "Zack Wake", email: "zjw4373@g.rit.edu"},
    // ];

  },
  mounted() {
    // this.users =
  },
  beforeUpdate() {

  },
}
</script>