<template>
  <div class="online">
    <titlebar title="联系客服n"></titlebar>
    <!-- <img src="../../assets/111.png" alt=""> -->
    <van-cell-group>
      <van-field v-model="leave" placeholder="请留言" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="phone" type="number" placeholder="您的手机号" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="name" placeholder="您的称呼" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="QQ" type="number" placeholder="请输入QQ账户" />
    </van-cell-group>

    <button class="onlinesubmit">提交</button>
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
      leave: "",
      phone: null,
      name: "",
      QQ: null
    };
  }
};
</script>

<style>
.online{
  display: flex;
  flex-direction: column;
}
.onlinesubmit {
  width: 80%;
  height: 2.5rem;
  margin: 5rem auto;
  border: none;
  background: #d3b787;
}
</style>