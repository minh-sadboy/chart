<template>
  <div>
    <chart></chart>
  </div>
</template>

<script>
export default {
  components: {
    chart: () => import("@/components/TradeChart.vue"),
  },
};
</script>
