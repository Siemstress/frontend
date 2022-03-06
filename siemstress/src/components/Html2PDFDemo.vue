<template>
  <div>
    <div>
      <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="hee hee"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="800px"

          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
      >
        <section slot="pdf-content">
          <Worldmap/>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import Worldmap from "./WorldMap";

export default {
  name: "Html2PDFDemo",
  components: {
    Worldmap,
    VueHtml2pdf
  },
  methods: {
    generateReport() {
      setTimeout(() => {
        this.$refs.html2Pdf.generatePdf();
      }, 1000);
    },
    onProgress() {

    },
    hasStartedGeneration() {

    },
    hasGenerated() {

    }
  },
  mounted() {
    this.generateReport();
  }
}
</script>

<style scoped>

</style>
