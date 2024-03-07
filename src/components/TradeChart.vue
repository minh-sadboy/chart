<template>
  <div>
    <trading-vue
      :title-txt="tooloptions.selectedticker"
      :toolbar="true"
      :overlays="overlays"
      :data="chart"
      :width="this.width"
      :height="this.height"
      :color-back="colors.colorBack"
      :color-grid="colors.colorGrid"
      :color-text="colors.colorText"
      :color-title="colors.tvTitle"
      :color-cross="colors.cross"
      :color-candle-dw="colors.candle_dw"
      :color-wick-dw="colors.wick_dw"
      :index-based="true"
      :id="id"
      :ref="id"
    ></trading-vue>
  </div>
</template>
<script>
import TradingVue from "trading-vue-js";
import { DataCube } from "trading-vue-js";
import store from "@/store.json";

let tempdata = {
  chart: {
    type: "Candles",
    tf: "15m",
    data: [],
  },
  onchart: [],
  offchart: [],
  tools: [
    {
      type: "LineTool",
      settings: {
        color: "#35c460",
      },
    },
    {
      type: "LineTool:Extended",
      settings: {
        color: "#3186c4",
      },
    },
    {
      type: "LineTool:Ray",
      settings: {
        color: "#c43169",
      },
    },
  ],
};

export default {
  components: { TradingVue },
  name: "trade-chart",
  data() {
    return {
      storeData: store,
      id: "trade-chart-1",
      dta: tempdata,
      chart: new DataCube(tempdata),
      colors: {
        // colorBack: "#fff",
        // colorGrid: "#eee",
        // colorText: "#000",
      },
      overlays: [],
      /*config: {
                DEFAULT_LEN: 200,
                TB_BORDER: 5,
                CANDLEW: 0.9,
                GRIDX: 200,
                VOLSCALE: 0.5
            }*/
    };
  },
  computed: {
    height() {
      return this.storeData.config.height;
    },
    width() {
      return this.storeData.config.width;
    },
    tooloptions() {
      return {
        selectedticker: this.storeData.config.name,
        selectedperiod: "1 day",
        selectedrange: "15 mins",
        selectedmovavgs: [],
      };
    },
  },
  mounted() {},
  watch: {
    "storeData.chartData": {
      handler: function (after, before) {
        this.chart.data.chart.data = after;
      },
      deep: true,
    },
  },
};
</script>
