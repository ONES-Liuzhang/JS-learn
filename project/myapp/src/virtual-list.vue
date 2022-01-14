<template>
  <div class="infinite-list-container" @scroll="handleScroll" ref="list">
    <div class="to-top" @click="scrollToTop">Top</div>
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemHeight }"
      >
        <div class="left">{{ item.title[0] }}</div>
        <div class="right">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Faker from "faker";

const ITEM_SIZE = 100;

let lock = false;

export default {
  name: "InfiniteList",
  data() {
    return {
      listData: [],
      scrollTop: 0,
    };
  },
  computed: {
    // 列表总高度
    listHeight() {
      return this.listData.length * ITEM_SIZE;
    },
    // 列表可显示项
    visibleCount() {
      return Math.ceil(this.visibleHeight / ITEM_SIZE);
    },
    // 可视区域高度
    visibleHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    startIndex() {
      return Math.floor(this.scrollTop / ITEM_SIZE);
    },
    endIndex() {
      return this.startIndex + this.visibleCount;
    },
    visibleData() {
      return this.listData.slice(this.startIndex, this.endIndex);
    },
    // 列表的偏移量
    startOffset() {
      return this.scrollTop - (this.scrollTop % ITEM_SIZE);
    },
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    itemHeight() {
      return ITEM_SIZE + "px";
    },
  },
  methods: {
    handleScroll(e) {
      if (!lock) {
        requestAnimationFrame(() => {
          this.scrollTop = this.$refs.list.scrollTop;
          if (this.endIndex > this.listData.length) {
            this.listData = this.listData.concat(this.getTenData());
          }
          lock = false;
        });
        lock = true;
      }
    },
    getTenData() {
      if (this.listData.length > 100) {
        return [];
      }
      return new Array(10).fill({}).map((item) => ({
        id: Faker.datatype.uuid(),
        title: Faker.name.title(),
        content: Faker.random.words(),
      }));
    },
    scrollToTop() {
      this.$refs.list.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    this.listData = this.getTenData();
  },
};
</script>
<style lang="scss" scoped>
.to-top {
  position: fixed;
  border-radius: 50%;
  background-color: burlywood;
  right: 20px;
  bottom: 20px;
  height: 60px;
  width: 60px;
  z-index: 1;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.infinite-list-container {
  padding-top: 10px;
  height: 99%;
  overflow: scroll;
  position: relative;
  -webkit-overflow-scrolling: touch;

  .infinite-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
    &-item {
      background: white;
      box-shadow: 0 0 10px rgba(144, 144, 144, 0.15);
      border-radius: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
      /* padding: 10px; */
      margin-top: 10px;

      .left {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 25px;
        font-weight: bold;
        color: white;
        background: #6ab6fc;
        border-radius: 10px;
      }

      .right {
        height: 100%;
        margin-left: 20px;
        flex: 1;
      }
    }
  }

  .title {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    height: 14px;
  }

  .desc {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    height: 12px;
  }

  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
}
</style>
