<template>
  <div>
      <titlebar title="提现"></titlebar>
      <h2>您还未设定银行卡，请先设定好您的银行卡</h2>
  </div>
</template>

<script>

import titlebar from "@/components/NavBar";

export default {
    components:{
        titlebar
    },
    created() {
        // let item = this.$route.query.item
    }
}
</script>

<style lang='less' scope>
h2{
    margin-top: 20px;
    text-align: center;
    color: #e1cc9e;
}
</style>