<template>
  <div class="newaddress">
    <titlebar title="添加地址"></titlebar>
    <div class="new_add">
      <div class="add">
        <div class="adds">
          <p>姓名</p>
          <input type="text" placeholder="请输入姓名" v-model="name" />
        </div>
        <div class="adds">
          <p>地址</p>
          <input type="text" placeholder="请输入有效地址" v-model="address" />
        </div>
      </div>
      <div class="sure">
        <button class="sure-btn" @click="submit">保存</button>
      </div>
    </div>
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
      name: "",
      address: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      if (this.name == "") {
        this.$toast({
          message: "姓名不可为空",
          duration: 1000
        });
        return false;
      }
      if (this.address == "") {
        this.$toast({
          message: "地址不可为空",
          duration: 1000
        });
        return false;
      }

      this.$axios
        .fetchPost("/portal/Digiccy", {
          interface: "1001",
          module: "Address",
          source: "web",
          version: "v1",
          data: {
            name: this.name,
            address: this.address
          }
        })
        .then(res => {
        //   console.log(res);
          if (res.code == 0) {
            this.$toast({
              message: res.message,
              duration: 1000
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$toast(res.message);
          }
        });
    }
  }
};
</script>

<style lang='less' scope>
.newaddress {
  width: 100%;
  height: 100%;
}
.new_add {
  margin-top: 10px;
  height: 100%;
  position: relative;
}
.add {
  padding: 20px;
}
.adds > p {
  color: #AF53D1;
  font-size: 14px;
}
.adds > input {
  width: 100%;
  height: 40px;
  border: none;
  // background: #d3b787;
  /* border: 1px solid #d8d8d8; */
  border-bottom: 1px solid #AF53D1;
  // border-radius: 4px;
  padding: 0 0 0 7px;
  color: #AF53D1;
  margin-bottom: 2rem;
}
// .adds >>> input::placeholder {
//   color: #999999;
//   font-size: 15px;
// }
.sure {
  /* padding: 15px; */
  /* margin-top: 55px; */
  width: 100%;
  /* background: #ffffff; */
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
}
.sure-btn {
  background: #AF53D1;
  width: 95%;
  border: none;
  height: 45px;
  /* padding: 15px; */
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
  line-height: 45px;
}

</style>