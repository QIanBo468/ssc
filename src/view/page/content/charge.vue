<template>
  <div class="charge">
    <titlebar :title="active==0 ? '充值': '提现'"></titlebar>
    <van-tabs
      v-model="active"
      background="transparent"
      color="#e1cc9e"
      title-active-color="#e1cc9e"
      title-inactive-color="#fff"
    >
      <van-tab title-style="font-size:18px" title="充值">
        <div class="user">
          <img src="@/assets/avatar.jpg" alt />
          <div>
            <p>{{user.account}}</p>
            <p>ID：{{user.id}}</p>
            <h3>中心钱包：{{tixian.credit_1.value}}</h3>
          </div>
        </div>

        <div class="wallet" @click="$router.push('qrCharge')">
          <div class="walletone">
            <img src="@/assets/cz_1.png" alt />
            <span>USDT</span>
          </div>
          <img src="@/assets/cz_icon.png" alt />
        </div>

        <ul>
          <li>充值步骤：</li>
          <li>1.在火币网购买USDT</li>
          <li>2.从法币账户转入币币账户</li>
          <li>3.点击提笔输入USDT复制彩金彩钱包地址，输入提笔数量确定</li>
          <li>4后台提交褪影的USDT数量，就会有折合人民币的提示，输入姓名提交</li>
          <li>重要提示：请每次充值时务必核对最新的二维码钱包地址信息!平台会用不定期更换新的二维码钱包地址。如因本人原因造成的损失平台概不负责！</li>
          <li>温馨提示：人民币提现每日仅限1次，金额5000元以内。</li>
          <li>USDT提现无上限</li>
        </ul>
      </van-tab>

      <van-tab title="提现">
        <div class="user">
          <img src="@/assets/avatar.jpg" alt />
          <div>
            <p>{{user.name}}</p>
            <p>ID{{user.id}}</p>
            <!-- <h3>中心钱包：{{user.wallet}}</h3> -->
          </div>
        </div>

        <div class="walletshouyi">
          <div>
            <p>盈利钱包</p>
            <span>{{tixian.yingli}}</span>
          </div>
          <div>
            <p>收益钱包</p>
            <span>{{tixian.shouyi}}</span>
          </div>
          <div>
            <p>中心钱包</p>
            <span>{{tixian.zhongxin}}</span>
          </div>
        </div>

        <div class="wallet" @click="$router.push({path:'deposit',query:{item:0}})">
          <span>中心钱包提现</span>
          <img src="@/assets/cz_icon.png" alt />
        </div>
        <div class="wallet" @click="$router.push({path:'deposit',query:{item:1}})">
          <span>收益钱包提现</span>
          <img src="@/assets/cz_icon.png" alt />
        </div>
        <div class="wallet" @click="$router.push({path:'deposit',query:{item:2}})">
          <span>盈利钱包提现</span>
          <img src="@/assets/cz_icon.png" alt />
        </div>

        <ul>
          <li>温馨提示</li>
          <li>
            <span>1.</span>出款需达到兑换金币30%流水
          </li>
          <li>
            <span>2.</span>盈利钱包，收益钱包提现无手续费，中心钱包提现手续费10%
          </li>
          <li>
            <span>3.</span>每日提现时间为00:00至23:59
          </li>
          <li>
            <span>4.</span>人民币提现5000元以内，每日限一次
          </li>
          <li>
            <span>5.</span>USDT提现无上限
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  data() {
    return {
      active: 0,
      user: {
      },
      tixian: {
        yingli: "0.00",
        shouyi: "0.00",
        zhongxin: "0.00"
      }
    };
  },

  components: {
    titlebar
  },
  created() {
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "User",
        interface: "1000"
      })
      .then(res => {
        if (res.code == 0) {
          this.user = res.data;
        } else {
          this.$toast(res.message);
        }
        window.console.log(res);
      });

    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000"
      })
      .then(res => {
        this.tixian = res.data.creditList;
        window.console.log("钱包信息", res);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scope>
.charge {
  background: transparent;
  width: 100%;
  height: 100%;
  .user {
    margin: 10px 0;
    display: flex;
    padding-left: 50px;
    img {
      width: 83px;
      height: 83px;
      border: 1px solid #f2e5ca;
      border-radius: 50%;
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p {
        font-size: 18px;
        color: #f2e5ca;
        margin: 0;
        padding: 0;
      }
      h3 {
        color: #e1cc9e;
        margin: 0;
        padding: 0;
      }
    }
  }
  .wallet {
    padding: 0;
    height: 40px;
    display: flex;
    justify-content: space-around;
    background: transparent;
    align-items: center;
    .walletone {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
      }
    }
    span {
      //   line-height: 60px;
      margin-left: 5px;
      color: #e1cc9e;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
  ul {
    padding: 20px;
    li {
      color: #ff6600;
      font-size: 14px;
      margin-bottom: 10px;
    }
    span {
      color: #f00;
    }
  }

  .walletshouyi {
    display: flex;
    padding: 10px;
    border: 1px solid #f2e5ca;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    p {
      font-size: 16px;
      color: #e1cc9e;
    }
    span {
      font-size: 16px;
      color: #e1cc9e;
      font-weight: bold;
    }
  }
}
</style>