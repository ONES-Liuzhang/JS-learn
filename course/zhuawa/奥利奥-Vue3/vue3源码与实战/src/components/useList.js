import { reactive, effect } from 'vue'

const get = params => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      code: 200,
      total: 100,
      list: Array(100).fill(0).map((_, index) => ({
        name: 'name',
        id: 1 + index,
        age: index,
        address: Math.random()
      }))
    })
  }, 1000);
})

export default function useList(keywords) {
  const data = reactive({ list: [] })
  
 /* watch(keywords, (newVal, oldVal) => {
    if () {
      
    }
  }, { immediate: true }) */
  
  /* const runner = */ effect(() => {
    get({ keywords: keywords.value }).then(res => {
      if (res.code === 200) {
        data.list = res.list
      }
    }) 
  }/* , { lazy: true } */)
  
  return { data }
  
}