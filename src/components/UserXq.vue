<template>
  <div class="Userbox">
    <img :src="user.avatar" alt />
    <div class="Userbox-cent">
      <p>{{user.account}}</p>
      <p>ID：{{user.id}}</p>
      <h3 v-if="wallet">中心钱包：{{tixian.credit_1}}</h3>
      <div v-else class="morewallet">
        <div>
          <p>￥{{tixian.credit_3}}</p>
          <p>盈利钱包</p>
        </div>
        <div>
          <p>￥{{tixian.credit_4}}</p>
          <p>收益钱包</p>
        </div>
        <div>
          <p>￥{{tixian.credit_1}}</p>
          <p>中心钱包</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wallet"],
  data() {
    return {
      user: "",
      tixian: {
        credit_1: "",
        credit_2: "",
        credit_3: "",
        credit_4: ""
      }
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
        this.tixian.credit_1 = res.data.creditList.credit_1.value;
        this.tixian.credit_2 = res.data.creditList.credit_2.value;
        this.tixian.credit_3 = res.data.creditList.credit_3.value;
        this.tixian.credit_4 = res.data.creditList.credit_4.value;
        window.console.log("钱包信息", res);
      });
  }
};
</script>

<style lang='less' scope>
.Userbox {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  background: rgb(149, 34, 190);
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 8px;
  .morewallet {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  img {
    width: 43px;
    height: 43px;
    // border: 1px solid #f2e5ca;
    border-radius: 50%;
    // margin-right: 20px;
  }
  .Userbox-cent {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    p {
      font-size: 14px;
      color: #fff;
      margin: 0;
      padding: 0;
    }
    h3 {
      // color: #e1cc9e;
      color: #fff;
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
  }
}
</style>