<template>
  <div id="login">
    <div class="redlogin">
    <van-cell-group>
      <van-field v-model="userName" placeholder="请输入用户名" />
    </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        userName: ''
      }
    }
}
</script>

<style lang='less' scope>
    #login{
      
    }
</style>