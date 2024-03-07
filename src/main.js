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

  addChart(value) {
    store.addChart = value;
  }
}

// const a = new TradeChart(document.body);
// a.setSize(500, 800);
// console.log(store);

// setInterval(() => {
//   a.addChart([
//     1621846900000, 130, 127.0073013305664, 125.94000244140625,
//     126.65499877929688, 11289029,
//   ]);
// }, 1000);
