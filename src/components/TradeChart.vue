<template>
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
</template>
<script>
import TradingVue from "trading-vue-js";
import { DataCube } from "trading-vue-js";
import store from "@/store.json";
import { EMA } from "technicalindicators";

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
    showEma5() {
      return this.storeData.indicators.ema5;
    },
    showEma10() {
      return this.storeData.indicators.ema10;
    },
  },
  mounted() {},
  watch: {
    "storeData.chartData": {
      handler: function (after, before) {
        this.chart.data.chart.data = after;

        const closeData = [];
        after.forEach((d) => closeData.push(d[4]));
        let onChartArray = [];

        if (this.showEma5) {
          const ema5Data = new EMA.calculate({ period: 5, values: closeData });
          const ema5 = [];
          after.forEach((d, i) => {
            const emad = i > 5 ? ema5Data[i - 5] : undefined;
            ema5.push([d[0], emad]);
          });

          onChartArray.push({
            name: "EMA 5",
            type: "EMA",
            data: ema5,
            settings: { color: "#FFA500" },
          });
        }

        if (this.showEma10) {
          const ema10Data = new EMA.calculate({
            period: 10,
            values: closeData,
          });
          const ema10 = [];
          after.forEach((d, i) => {
            const emad = i > 10 ? ema10Data[i - 10] : undefined;
            ema10.push([d[0], emad]);
          });

          onChartArray.push({
            name: "EMA 10",
            type: "EMA",
            data: ema10,
            settings: { color: "#c973ff" },
          });
        }

        this.chart.data.onchart = onChartArray;
      },
      deep: true,
    },
  },
};
</script>
