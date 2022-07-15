<template>
  <div style="margin-top: 10px">
    <Charts></Charts>
  </div>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";
import Charts from "@/components/Charts";


@Component({
  components: {
    Charts,
  }
})
export default class BoardPieChart extends Vue {

  mounted() {
  }
};

</script>

