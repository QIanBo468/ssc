<template>
  <div class="notice">
    <titlebar title="公告"></titlebar>
    <div class="notice-content">
      <h3>公告列表</h3>
      <ul>
        <li v-for="(item, index) of notice" :key="index">
          <div>
            <p>{{item.title}}</p>
            <p>
              <van-icon name="clock-o" />
              {{item.time}}
            </p>
          </div>
          <button @click="showPop(item)">查看</button>
        </li>
      </ul>
    </div>

    <van-popup class="pop" v-model="show">
      <div>
        <h3>{{shows.title}}</h3>
        <p>1312321321321321</p>
        <van-button class="showBtn" @click="show = false">关闭</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
    return {
      show: false,
      shows: {},
      notice: [
        { title: "彩金彩123", time: "2019-10-21  00:00:00" },
        { title: "彩金彩132", time: "2019-10-21  00:00:00" },
        { title: "彩金彩231", time: "2019-10-21  00:00:00" },
        { title: "彩金彩321", time: "2019-10-21  00:00:00" }
      ]
    };
  },
  methods: {
    showPop(item) {
      this.show = true;
      this.shows = item;
    }
  }
};
</script>

<style lang='less' scope>
.notice {
  width: 100%;
  height: 100%;
  .notice-content {
    padding: 1rem;
    h3 {
      color: #ff6600;
    }
    ul {
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        color: #fff;
        background: #ddc887;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 8px;
        button {
          border: none;
          width: 5rem;
          height: 2rem;
          font-size: 0.8rem;
          background: #ff6600;
          border-radius: 8px;
        }
      }
    }
  }
  .pop {
    width: 100%;
    height: 30rem;
    background: transparent;
    padding: 1rem;
    box-sizing: border-box;
    div {
      width: 100%;
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      h3{
          color: #ff6600;
          font-size: 1.5rem;
      }
      p{
          background: #f8fafb;
          width: 100%;
          text-align: center;
          padding: 1rem;
          box-sizing: border-box;
          border: 1px solid #eee;
      }
      .showBtn{
          align-self: flex-end;
          margin-right: 2rem;
          background: #FF632C;
          color: #eee;
          border-radius: 6px;
      }
    }
  }
}
</style>