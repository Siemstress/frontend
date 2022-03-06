<template>
  <div class="container p-3 px-5">
    <form class="row g3">
      <!-- pfp -->
      <div class="col-12 col-md-6">
        <img class="border border-4 rounded-circle" src="https://via.placeholder.com/300/222/fff" />
      </div>

      <!-- username -->
      <div class="col-6 col-md-3">
        <label class="form-label" for="username">Username<span class="text-danger">*</span></label>
        <input id="username" name="username" class="form-control" type="text" minlength="6" value="" placeholder="{{USERNAME}}" required>
      </div>

      <!-- email -->
      <div class="col-6 col-md-3">
        <label class="form-label" for="email">Email<span class="text-danger">*</span></label>
        <input id="email" name="email" class="form-control" type="email" value="" placeholder="{{EMAIL}}" required>
      </div>

      <!-- name -->
      <div class="col-6">
        <label class="form-label" for="name">Name<span class="text-danger">*</span></label>
        <input id="name" name="name" class="form-control" type="text" value="" placeholder="{{FULL_NAME}}" required>
      </div>

      <!-- job title / description -->
      <div class="col-6">
        <label class="form-label" for="description">Job Title/Description</label>
        <input id="description" name="description" class="form-control" type="text" value="" placeholder="{{DESCRIPTION}}">
      </div>

      <!-- save -->
      <div class="col-12">
        <button type="submit" class="btn btn-block btn-success btn-block">Update Profile</button>
      </div>
    </form>

    <!-- security/administration -->
    <!-- change password -->
    <!-- view/edit user group -->
  </div>
</template>


<script>
export default {
  name: "Profile",
}
</script>