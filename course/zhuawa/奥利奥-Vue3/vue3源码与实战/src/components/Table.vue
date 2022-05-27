<template>
  <n-data-table :columns="columns" :data="data.list" />
</template>

<script>
import { h, reactive, ref } from 'vue'
import useList from './useList'

export default {
  setup(props, context) {
    debugger
    const keyword = ref('')
    
    const { data } = useList(keyword)
    
    
    const columns = [{
      title: 'Name',
      key: 'name'
    }, {
      title: 'Age',
      key: 'age'
    }, {
      title: 'Address',
      key: 'Address'
    }, {
      title: '操作',
      render(row) {
        return h('button', {
          onClick() {
            
          }
        }, '删除')
      }
    }];
    
    // const data = reactive({ list: [] })
    
    
    return {
      columns,
      data
    }
  }
}
</script>

<style>
</style>
