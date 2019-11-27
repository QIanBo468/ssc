<template>
<div class="depositrocrd">
  <titlebar title="提现记录"></titlebar>
  <times title="提现记录"></times>
  <button class="topupbtn" >查询</button>
  <recordList></recordList>
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
.depositrocrd{
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