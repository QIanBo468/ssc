<template>
      <van-nav-bar class="nav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="30px" height="20px" src="@/assets/back.png" alt />
      </slot>
      <slot slot="title" >{{title}}</slot>
    </van-nav-bar>
</template>

<script>

export default {
    props:{
      title: {
         type: String
      }
    },
    data() {
        return{

        }
    },
    methods:{
        onClickLeft() {
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>