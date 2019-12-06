<template>
  <div class="edSwitch">
    <titlebar title="额度转换"></titlebar>
    <UserXq :wallet=false></UserXq>

    <div class="wallet-switch">
      <van-field
        readonly
        clickable
        label="转换类型:"
        :value="leixing"
        placeholder="请选择类型"
        @click="showPicker = true"
      />
    </div>
    <div class="wallet-switch">
      <van-field label="转换金额:" v-model="jine" placeholder="请输入金额" type="number" />
    </div>

    <div class="btn" @click="submit">提交</div>

    <ul class="switch-hint">
      <li>温馨提示:</li>
      <li>
        <span>*</span>中心钱包转金币钱包每日首次加赠5%
      </li>
      <li>
        <span>*</span>金币钱包转中心钱包投注流水大于30%
      </li>
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
import UserXq from "@/components/UserXq";

export default {
  components: {
    titlebar,
    UserXq
  },
  data() {
    return {
      leixing: "中心钱包转金币",
      jine: "",
      showPicker: false,
      columns: [
        "中心钱包转金币",
        "金币钱包转中心",
        "盈利钱包转中心",
        "收益钱包转中心"
      ],
      user: {
        // avatar: require("../../../assets/avatar.jpg"),
        // name: "zhangsan",
        // id: "5259",
        // level: "0",
        // money: 180000,
        // progress: 50
      },
      wallet: {},
      credit_1: "",
      credit_2: "",
      credit_3: "",
      credit_4: ""
    };
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
          window.console.log(this.user.levelPercent);
        } else {
          this.$toast(res.message);
        }
      });
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000"
      })
      .then(res => {
        this.credit_1 = res.data.creditList.credit_1.value;
        this.credit_2 = res.data.creditList.credit_2.value;
        this.credit_3 = res.data.creditList.credit_3.value;
        this.credit_4 = res.data.creditList.credit_4.value;
        window.console.log("钱包信息", res);
      });
  },
  methods: {
    onConfirm(Avalue) {
      window.console.log(Avalue);
      this.leixing = Avalue;
      this.showPicker = false;
    },
    qianbao() {
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1000"
        })
        .then(res => {
          this.credit_1 = res.data.creditList.credit_1.value;
          this.credit_2 = res.data.creditList.credit_2.value;
          this.credit_3 = res.data.creditList.credit_3.value;
          this.credit_4 = res.data.creditList.credit_4.value;
          window.console.log("钱包信息", res);
        });
    },
    submit() {
      window.console.log(this.values);
      let zhuanchu, zhuanru;
      if (this.leixing == "中心钱包转金币") {
        zhuanchu = "credit_1";
        zhuanru = "credit_2";
      }
      if (this.leixing == "金币钱包转中心") {
        zhuanchu = "credit_2";
        zhuanru = "credit_1";
      }
      if (this.leixing == "盈利钱包转中心") {
        zhuanchu = "credit_3";
        zhuanru = "credit_1";
      }
      if (this.leixing == "收益钱包转中心") {
        zhuanchu = "credit_4";
        zhuanru = "credit_1";
      }
      // let that = this
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "4001",
          data: {
            fromCredit: zhuanchu,
            toCredit: zhuanru,
            amount: this.jine,
            safeword: ""
          }
        })
        .then(res => {
          this.$toast(res.message);
          window.console.log(res);
          if (res.code == 0) {
            this.jine = "";
            this.qianbao();
            setTimeout(() => {
              window.location.reload();
            }, 500);
            //
          }
        });
    }
  }
};
</script>

<style lang='less' scope>
.edSwitch {
 
/deep/.van-field__control{
  color: #AF53D1 !important;
}

  .wallet-switch {
    padding: 1.5rem;
    span {
      color: #333;
      font-size: 1rem;
    }
    input {
      // border: 1px solid #f2e5ca;
      padding: 0.2rem;
    }
  }
  .btn {
    width: 12rem;
    height: 2.5rem;
    // background: url(../../../assets/btn_save.png) no-repeat;
    background: #AF53D1;
    background-size: 100%;
    margin: 2rem auto;
    text-align: center;
    line-height: 2.5rem;
    color: #fff;
    border-radius: 20px;
  }
  .switch-hint {
    padding-left: 2rem;
    color: #333;
    li{
        font-size: 13px;
    }
  
    span {
      color: #f00;
      margin-right: 5px;

    }
    li {
      margin-bottom: 0.2rem;
    }
  }
}
</style>