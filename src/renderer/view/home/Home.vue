<template>
  <div class="home-component">
    <main class="home-main">
      <aside class="home-aside-section">
        <header class="home-aside-section__header">
          <p>今日待办：</p>
          <p>新建</p>
        </header>
        <ul class="event-list scroll-view">
          <li
            v-for="(item, index) in eventList"
            :key="index"
            class="event-list-item">
            <p class="start-time">{{item.startTime}}</p>
            <p class="event-content">{{item.content}}</p>
            <p class="event-duration">{{item.duration}}</p>
          </li>
        </ul>
      </aside>
      <div class="home-content-section">
        <div class="active-time">
          <div class="active-time_hours">
            <div v-if="activeTime" class="active-time_hours-box">
              <i class="iconfont" :class="[`icon-shuzi${activeTime[0]}`]"></i>
              <!--<i class="iconfont" :class="[`icon-shuzi${activeTime[1]}`]"></i>-->
              <i class="iconfont icon-shuzi1"></i>
            </div>
          </div>
          <div class="active-time_minutes">
            <div v-if="activeTime" class="active-time_minutes-box">
              <i class="iconfont" :class="[`icon-shuzi${activeTime[3]}`]"></i>
              <i class="iconfont" :class="[`icon-shuzi${activeTime[4]}`]"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// eslint-disable-next-line
let timer = null
export default {
  name: 'Home',
  props: {},
  components: {},
  data () {
    return {
      activeTime: null,
      eventList: [
        {
          startTime: '09:00',
          endTime: '10:00',
          duration: '1小时',
          content: '检测报告模板编制'
        },
        {
          startTime: '10:00',
          endTime: '10:30',
          duration: '30分钟',
          content: '内部会议'
        },
        {
          startTime: '10:30',
          endTime: '11:00',
          duration: '30分钟',
          content: '需求讨论会'
        },
        {
          startTime: '11:00',
          endTime: '11:30',
          duration: '30分钟',
          content: '整理会议内容'
        },
        {
          startTime: '11:30',
          endTime: '13:30',
          duration: '2小时',
          content: '吃饭+午休'
        },
        {
          startTime: '13:30',
          endTime: '14:30',
          duration: '1小时',
          content: '学习一个css特性'
        },
        {
          startTime: '14:30',
          endTime: '17:00',
          duration: '2小时30分钟',
          content: '编写TP测试用例'
        }
      ]
    }
  },
  computed: {},
  watch: {
  },
  created () {
    timer = setInterval(() => {
      let time = this.$moment().format('HH:mm')
      if (time !== this.activeTime) {
        this.activeTime = time
      }
    }, 1000)
  },
  mounted () {
  },
  beforeDestroy () {
  },
  destroyed () {
    timer = null
  },
  methods: {}
}
</script>

<style lang="scss">
.home-component {
  height: 100%;
  .home-main {
    display: flex;
    height: 100%;
    .home-aside-section {
      width: 300px;
      height: inherit;
      background: #f7f7f7;
      .home-aside-section__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 10px;
      }
      .event-list {
        height: calc(100% - 40px);
        padding: 0 10px;
        .event-list-item {
          height: 100px;
          padding: 10px;
          background: #dfdfdf;
          border-radius: 4px;
          .start-time {
            font-size: 30px;
          }
          .event-content {
            margin-top: 5px;
          }
        }
        .event-list-item + .event-list-item {
          margin-top: 10px;
        }
      }
    }
    .home-content-section {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .active-time {
        display: flex;
        .active-time_hours,
        .active-time_minutes {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 400px;
          height: 400px;
          background: #f7f7f7;
          border-radius: 40px;
        }
        .active-time_hours-box,
        .active-time_minutes-box {
          margin-left: -20px;
        }
        .active-time_minutes {
          margin-left: 20px;
        }
      }
      i {
        display: inline-block;
        font-size: 200px;
        font-weight: 500;
      }
      i + i{
        letter-spacing: -20px;
        margin-left: -50px;
      }
    }
  }
}
</style>
