<template>
  <div class="main">
    <header>
      <router-link to="/">首页</router-link>
      <router-link to="/table">表格</router-link>
    </header>
    <main>
      <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;"
          >海淀桥</n-layout-sider
        >
        <n-layout>
          <n-layout-header bordered>颐和园路</n-layout-header>
          <n-layout-content content-style="padding: 24px;">
              <router-view></router-view>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </main>
  </div>
</template>

<script>

export default {
  setup() {
    return {  }
  },
}
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
}
header {
  background-color: #fff;
  height: 50px;
}
main {
  height: calc(100vh - 50px);
}
main > .n-layout--static-positioned {
  height: 100%;
}
.n-layout-sider{
  padding: 14px;
  background-color: #ccc;
}
.n-layout-sider {
  width: 100px !important;
}
.n-layout-content {
 height: (100% - 50px); 
}
</style>