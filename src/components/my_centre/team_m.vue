<template>
  <div class="team">
    <van-nav-bar
      class="team-title"
      title="团队管理"
      right-text="查看全部"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 展示 -->

    <div class="team-head">
      <div class="team-contnet-head-left">团队总人数(人)</div>
      <div class="team-contnet-head-cont">{{teamNum}}</div>
      <!-- <div class="team-contnet-head-right"></div> -->
    </div>
    <div class="team-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in teamList" :key="item.index">
          <van-row type="flex" justify="space-between">
            <van-col
              span="6"
              class="acea-row row-center-wrapper row-column"
              style="position:relative  ;heigh:3rem;"
            >
              <van-image
                class="team-item-head row-center-wrapper acea-row"
                round
                width="80%"
                height="auto"
                src="../../../static/images/head.png"
              />
              <div class="font-white">昵称</div>
              <div class="font-yellow">{{item.name}}</div>
            </van-col>
            <van-col span="8" class="acea-row row-center-wrapper row-column">
              <div class="font-white">手机</div>
              <div class="font-yellow">{{item.phoneNum}}</div>
            </van-col>
            <van-col span="5" class="acea-row row-center-wrapper row-column">
              <div class="font-white">状态</div>
              <div v-if="item.type==1" style="color:#00FFFF;">已激活</div>
              <div v-else style="color:#FF5A5A">未激活</div>
            </van-col>
            <van-col
              span="5"
              class="acea-row row-center-wrapper row-column team-item-btn"
              style="position: relative;
    top: -0.4rem;"
            >
              <div class="bg-yellow">激活码</div>
              <div class="font-yellow">排单币</div>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teamNum: 11,
      teamList: [
        { id: 0, name: "小傻子", phoneNum: "12345678910", type: 1 },
        { id: 1, name: "小傻子1", phoneNum: "12345678910", type: 0 },
        { id: 2, name: "小傻子2", phoneNum: "12345678910", type: 1 }
      ],
      loading: false,
      finished: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push('/teamall')
    },

    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.teamList.push(this.teamList.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.teamList.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 500);
    }
  }
};
</script>
<style lang='less' scope>
.font-white {
  color: #ffffff;
}
.font-yellow {
  color: #f2c684;
}
.team {
  padding: 0 1rem;
}
.van-nav-bar {
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
     font-size:20px;
  }
  .van-nav-bar__right {
    .van-nav-bar__text {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.team-head {
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("../../../static/images/titleBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 1rem;
  .team-contnet-head-left {
    position: absolute;
    top: 1rem;
    left: 0.5rem;
  }
  .team-contnet-head-cont {
    font-size: 50px;
    font-family: Microsoft YaHei UI;
    font-weight: bold;
    color: rgba(11, 11, 31, 1);
  }
}
.team-list {
  .van-list {
    padding: 1rem 0;
    .van-cell {
      height: 5.2rem;
      background: url("../../../static/images/teamBg.png");
      background-size: 100% 100%;
      margin-top: 3.6rem;
      padding: 1.3rem 0.5rem 0.5rem 1rem;
      overflow: visible;
      .van-cell__value {
        height: 4rem;
        overflow: visible;
      }
      .team-item-head {
        position: absolute;
        bottom: 3rem;
        left: 0.5rem;
      }
      .team-item-btn {
        .font-yellow,
        .bg-yellow {
          height: 50%;
          width: 100%;
          text-align: center;
        }
        .font-yellow {
          border: 0.05rem solid #f2c684;
          box-sizing: border-box;
          border-radius: 0px 0px 5px 5px;
        }
        .bg-yellow {
          background: #f2c684;
          border-radius: 5px 5px 0px 0px;
        }
      }
    }
  }
}
</style>