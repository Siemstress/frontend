<template>
    <center>
        <div class="card">
            <div class="container">
                <img src="../assets/siemstress.png" width="20%">
                <form>
                    <label for="username">Username:</label><br>
                    <input type="text" id="fname" name="fname"><br>
                    <label for="password">Password:</label><br>
                    <input type="password" id="lname" name="lname"><br><br>
                    <input type="submit" value="Login">
                </form>
            </div>
        </div>
    </center>
</template>
<script>
export default {
  name: "loginPage",

  methods: {
  }
}
</script>
<style lang="scss">
</style>