<template>
      <van-nav-bar class="nav"  left-arrow @click-left="onClickLeft" :right-text="right" @click-right="onClickRight">
      <!-- <slot slot="left" name="left">
        <img width="30px" height="20px" src="@/assets/back.png" alt />
      </slot> -->
      <slot slot="title" >{{title}}</slot>
    </van-nav-bar>
</template>

<script>

export default {
    props:["title","right","url"],
    data() {
        return{

        }
    },
    methods:{
        onClickLeft() {
            this.$router.go(-1)
        },
        onClickRight() {
          window.console.log(this.url)
          let _url = this.url
          this.$router.push(_url)
        }
    }
}
</script>

<style>
.van-nav-bar__text{
  color:#333;
}
.van-icon{
  color: black !important;
}
.van-nav-bar__title{
  color: black !important;
  font-size: 16px !important;
}
</style>