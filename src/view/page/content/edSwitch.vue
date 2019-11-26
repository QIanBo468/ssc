<template>
  <div class="edSwitch">
    <titlebar title="额度转换"></titlebar>
    <div class="userdata">
      <div class="user">
        <div class="avatar">
          <img :src="user.avatar" alt />
          <div class="level">
            <span>{{user.name}}</span>
            <span>id: {{user.id}}</span>
          </div>
        </div>
        <div class="level">
          <span>级别</span>
          <span>VIP{{user.level}}</span>
        </div>
      </div>
      <!-- <div class="index-jindu"> -->
      <div class="jindu">
        <span>VIP{{user.level}}</span>
        <span>VIP{{user.level+1}}</span>
      </div>
      <van-progress
        stroke-width="8"
        track-color="#000"
        color="#ffc000"
        pivot-text
        :percentage="user.progress"
      />
      <p>距离升级还需要{{user.money}}流水</p>
      <!-- </div> -->
    </div>

    <div class="wallet">
      <div>
        <p>中心钱包</p>
        <span>￥{{wallet.zhongxin}}</span>
      </div>
      <div>
        <p>金币钱包</p>
        <span>￥{{wallet.jinbi}}</span>
      </div>
      <div>
        <p>盈利钱包</p>
        <span>￥{{wallet.yingli}}</span>
      </div>
      <div>
        <p>收益钱包</p>
        <span>￥{{wallet.shouyi}}</span>
      </div>
    </div>

    <div class="wallet-switch">
      <van-field
        readonly
        clickable
        label="转换类型:"
        :value="value"
        placeholder="请选择类型"
        @click="showPicker = true"
      />
    </div>
    <div class="wallet-switch">
      <van-field
        label="转换金额:"
        :values="value"
        placeholder="请输入金额"
        type='number'
      />
    </div>

    <div class="btn"></div>

    <ul class="switch-hint">
        <li>温馨提示:</li>
        <li><span>*</span>中心钱包转金币钱包每日首次加赠5%</li>
        <li><span>*</span>金币钱包转中心钱包投注流水大于30%</li>
    </ul>


    <!-- 类型选择 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
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
      value: "",
      values:'',
      showPicker: false,
      columns: [
        "中心钱包转金币",
        "金币钱包转中心",
        "盈利钱包转中心",
        "收益钱包转中心"
      ],
      user: {
        avatar: require("../../../assets/avatar.jpg"),
        name: "zhangsan",
        id: "5259",
        level: "0",
        money: 180000,
        progress: 50
      },
      wallet: {
        zhongxin: 0.0,
        jinbi: 111,
        yingli: 222,
        shouyi: 333
      }
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>

<style lang='less' scope>
.edSwitch {
  .userdata {
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    .user {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .avatar {
        display: flex;
        img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid #ffc000;
        }
      }
    }
    .jindu {
      width: 80%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      span {
        color: #f2e5ca;
      }
      // }
    }
    p {
      color: #f2e5ca;
      font-size: 14px;
      text-align: center;
      margin: 0;
      padding: 0;
    }
  }
  .level {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 10px;
    span {
      font-size: 16px;
      color: #f2e5ca;
    }
  }

  // 钱包
  .wallet {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    border-top: 1px solid #504339;
    border-bottom: 1px solid #504339;
    margin-top: 10px;
    div {
      width: 88px;
      height: 55px;
      background: url(../../../assets/wallet_bg.png) no-repeat;
      background-size: 88px 55px;
      p {
        font-size: 15px;
        margin: 0;
        padding: 0;
        color: #756142;
        text-align: center;
        margin-bottom: 10px;
      }
      span {
        display: block;
        font-size: 15px;
        color: #ffc000;
        text-align: center;
      }
    }
  }
  .wallet-switch {
      padding: 1.5rem;
      border-bottom:1px solid #504339;
      span{
          color: #f2e5ca;
          font-size: 1rem;
      }
      input{
          border:1px solid #f2e5ca;
          padding: 0.2rem;
      }
      
  }
  .btn{
      width: 12rem;
      height: 2.5rem;
      background: url(../../../assets/btn_save.png)no-repeat;
      background-size: 100%;
      margin: 2rem auto;
  }
    .switch-hint{
        padding-left: 2rem;
        color: #ff6600;
        font-size: 0.9rem;
        span{
            color: #f00;
            margin-right: 5px;
        }
        li{
            margin-bottom: 0.2rem;
        }
    }
}
</style>