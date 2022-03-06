<template>
  <Html2PDFDemo :incidentData="this.data" :agentID="1"></Html2PDFDemo>
</template>
<script>

import Html2PDFDemo from "./reports/Html2PDFDemo";

export default {
  name: "TestDummy",
  data: function () {
    return {
      data: {
        countries: {},
        users: {},
        totalRequests: 0
      }
    }
  },
  components: {
    Html2PDFDemo
  },
  async beforeCreate() {

  }
};
</script>
<style lang="scss">
</style>
