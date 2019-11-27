<template>
  <div class="touzhurecord">
      <titlebar title="投注记录"></titlebar>
  <times title="投注记录"></times>
  <button class="topupbtn" >查询</button>
  <recordList :zhonglei=true :searchpop=true></recordList>
  </div>
</template>

<script>

import titlebar from "@/components/NavBar";
import times from '@/components/recordTime'
import recordList from '@/components/recordList'

export default {
    components:{
        times,
        titlebar,
        recordList
    }
}
</script>

<style>
.touzhurecord{
     display: flex;
    flex-direction: column;
    align-content: center;
}
.topupbtn{
    margin: 1rem;
    height: 2rem;
    border: none;
    border-radius: 8px;
}
</style>