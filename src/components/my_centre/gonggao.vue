<template>
  <div class="gonggao">
    <van-nav-bar class="ggnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="公告">公告</slot>
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="gg_content" v-for="(item, index) of list" :key="index">
        <div class="cont">
          <p>{{item.title}}</p>
          <span>{{item.time}}</span>
        </div>
        <router-link to>点击查看</router-link>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "买市区的小房子还是买郊区的大房子？",
          time: "2019.6.12  12:12:12"
        },
        {
          title: "买市区的小房子还是买郊区的大房子？",
          time: "2019.6.12  12:12:12"
        },
        {
          title: "买市区的小房子还是买郊区的大房子？",
          time: "2019.6.12  12:12:12"
        },
        {
          title: "买市区的小房子还是买郊区的大房子？",
          time: "2019.6.12  12:12:12"
        },
        {
          title: "买市区的小房子还是买郊区的大房子？",
          time: "2019.6.12  12:12:12"
        },
        {
          title: "买市区的小房子还是买郊区的大房子？",
          time: "2019.6.12  12:12:12"
        }
      ],
      loading: false,
      finished: false
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          console.log(this.list[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length > 5) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang='less' scope>
.gonggao{
    padding: 0 11px;
}
.ggnav {
  background: none;
  margin-bottom: 10px;
  .van-nav-bar__title {
    color: #ffddaa;
  }
}
.gg_content{
    height: 75px;
    background: #1C1C51;
    border-radius: 4px;
    padding: 0 8px 0 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    .cont{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
            padding: 0;
            margin: 0;
            font-size: 16px;
            color: #ffddaa;
        }
        span{
            color: #fff;
            font-size: 12px;
        }
    }
    a{
        color: #4594F0;
        font-size: 14px;
    }
}
.van-hairline--bottom::after {
  border: none;
}
</style>