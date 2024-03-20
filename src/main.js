import Vue from "vue";
import App from "./App.vue";
import store from "@/store.json";

export default class TradeChart {
  constructor(element) {
    const app = new Vue({
      render: (h) => h(App),
    }).$mount();
    element.appendChild(app.$el);
  }

  setSize(height, width) {
    store.config.height = height;
    store.config.width = width;
  }

  setName(name) {
    store.config.name = name;
  }

  setChartData(value) {
    store.chartData = value;
  }

  showEMA5(value) {
    store.indicators.ema5 = value;
  }

  showEMA10(value) {
    store.indicators.ema10 = value;
  }
}

// const a = new TradeChart(document.body);
// a.setSize(500, 800);
// console.log(store);

// let i = 0;
// const ab = [];
// setInterval(() => {
//   ab.push([
//     1621846900000, 130, 127.0073013305664, 125.94000244140625,
//     126.65499877929688, 11289029,
//   ]);
//   a.setChartData(ab);
//   i += 1;
// }, 10);


// setTimeout(() => {
//   a.showEMA10(true)
// }, 1000);