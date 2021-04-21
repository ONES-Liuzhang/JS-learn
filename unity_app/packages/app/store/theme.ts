import Vue from 'vue';

export let state = Vue.observable({
  primaryColor: '#EA5404', // #FF5938-#FF8626
  primaryColor2: '',

  subColor1: '#FF4A23', // 辅助色1 
  subColor2: '#13CE66', // 辅助色2 
  subColor3: '#20A0FF', // 辅助色3 
  subColor4: '#EFF3FB', // 辅助色3 
  subColor5: '#F8F8F8', // 辅助色3 

  importantFontColor: '#EA5404', // 重要字体色
  fontColor: '#333333', // 默认字体
  subFontColor: '#666666', // 辅助字体
  noteFontColor: '#999999', // 注释字体
});

export let mutations = {
  setPrimaryColor(c: string) {
    state.primaryColor = c
  },
}

export default {
  state,
  mutations,
}
