<template>
  <Html2PDFDemo :incidentData="this.data" :agentID="this.agentId"></Html2PDFDemo>
</template>
<script>

import Html2PDFDemo from "./reports/Html2PDFDemo";

export default {
  name: "TestDummy",
  data: function () {
    return {
      agentId: new URLSearchParams(window.location.search).get("id"),
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
  beforeMount() {
  }
};
</script>
<style lang="scss">
</style>
