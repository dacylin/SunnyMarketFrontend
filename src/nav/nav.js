/* 這裡用來儲存導覽列資料，router設置要放在index.js */

const navData = [
  {
    id: 1,
    name: "線上商城",
    link: "ProductPage", //要跟index.js 的 name 相同
    active: true,
  },
  {
    id: 2,
    name: "關於我們",
    link: "AboutUs", //要跟index.js 的 name 相同
    active: false,
  },
];

export default navData;
