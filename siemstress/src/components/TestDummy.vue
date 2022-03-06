<template>
  <Html2PDFDemo :incidentData="this.data" :agentID="1"></Html2PDFDemo>
</template>
<script>

import Html2PDFDemo from "./reports/Html2PDFDemo";

export default {
  name: "TestDummy",
  data: function () {
    return {
      data: [{'code': "RUS", 'incidentCount': 20}, {'code': "USA", 'incidentCount': 14}, {
        'code': "CAN",
        'incidentCount': 11
      }]

    }
  },
  components: {
    Html2PDFDemo
  }
};
</script>
<style lang="scss">
</style>
