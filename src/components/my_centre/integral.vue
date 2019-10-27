<template>
  <div class="integral">
    <van-nav-bar class="integralnav" title="弘信积分" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 展示 -->
    <div class="integral-contnet">
      <div class="integral-contnet-head">
        <div class="integral-contnet-head-left">宏信积分个数(个)</div>
        <div class="integral-contnet-head-cont">{{integral}}</div>
        <div class="integral-contnet-head-right"></div>
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="peopleId"
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="转入宏信积分到"
            placeholder="输入对方账户"
          />
        </van-cell-group>
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="peopleNum"
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="转入宏信积分数量"
            placeholder="输入数量"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="integral-btn">
      <van-button size="large" color="#ffddaa">保存</van-button>
    </div>
    <div class="intergral-record">
      <div class="intergral-record-title">
        <div class="intergral-record-title-left">
          <div style="width:0px;height:10px; border:1px solid #fff; margin-right:10px;"></div>
          <div>
            <p style="color:#FFF;">近五次排单币交易记录</p>
          </div>
        </div>
        <div>
          <p style="color:#ffddaa;">全部交易记录</p>
        </div>
      </div>
      <div v-if="integralList.length>0" class="intergral-record-list">
        <!-- 居中 -->
        <van-row type="flex" justify="center" align="center" class="intergral-record-item">
          <van-col span="8">时间</van-col>
          <van-col span="8">接受账号</van-col>
          <van-col span="8">数量</van-col>
        </van-row>
        <!-- 居中 -->
        <van-row
          type="flex"
          justify="center"
          align="center"
          class="intergral-record-item-con intergral-record-item"
          v-for="item of integralList"
          :key="item"
        >
          <van-col span="8">{{item.time}}</van-col>
          <van-col span="8">{{item.id}}</van-col>
          <van-col span="8">{{item.num}}</van-col>
        </van-row>
      </div>
      <div v-else class="intergral-record-none">
        <div class="intergral-record-none-imgbox">
          <van-image src="../../../static/images/norecord.png" />
        </div>
        <div class="intergral-record-none-text">
          <p style="color:#FFF;">无交易记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      integral: 10,
      peopleId: 10123,
      peopleNum: 1001010,
      integralList: [
        { time: "2019.10.02", id: "21232454668", num: "125" },
        { time: "2019.10.02", id: "2123468", num: "123" },
        { time: "2019.10.02", id: "2468", num: "125" },
        { time: "2019.10.02", id: "212324", num: "12245" },
        { time: "2019.10.02", id: "2123245465468", num: "123245" }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
    // onClickRight() {
    //   Toast('按钮');
    // }
  }
};
</script>

<style lang='less' scope>


.integral {
  padding: 0 20px;
}
.integralnav {
  background: transparent;
}
.van-nav-bar__title {
  color: #f2c684;
  border: 0;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(242, 198, 132, 1);
}
.integral-contnet {
  .integral-contnet-head {
    background: url("../../../static/images/titleBg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 85px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    .integral-contnet-head-left {
      position: absolute;
      top: 20px;
      left: 10px;
      font-size: 16px;
    }
    .integral-contnet-head-cont {
      display: flex;
      align-items: center;
      font-size: 50px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
    }
  }
  // 输入框
  .van-cell-group {
    background: transparent;
    .van-cell {
      background: transparent;
      padding: 10px;
      .van-field__control {
        color: #ffffff;
      }
      border: 0.5px solid #ffddaa;
      border-top: 0;
    }
  }

  //   .van-cell__value {
  //     width: 30%;
  //   }
}
// 按钮
.integral-btn {
  margin: 30px 0;
}
.integral-input-text {
  color: #ffddaa;
}
.van-field__body {
  display: flex;
  justify-content: flex-end;
}
.van-button {
  // background: transparent;
  color: #000 !important ;
}
.intergral-record {
  .intergral-record-title {
    display: flex;
    justify-content: space-between;
    .intergral-record-title-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .intergral-record-none {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    .intergral-record-none-text {
      display: flex;
      justify-content: center;
    }
    .intergral-record-none-imgbox {
      display: flex;
      justify-content: center;
      .van-image {
        width: 152px;
        height: 135px;
      }
    }
  }
  .intergral-record-list {
    .intergral-record-item {
      border: 0.01rem solid #f2c684;
      color: #ffffff;
      height: 2.5rem;
      > div {
        display: flex;
        justify-content: center;
      }
    }
    .intergral-record-item:not(:first-child) {
      border-top: 0;
    }
  }
}
</style>