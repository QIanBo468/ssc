<template>
  <div>
      <titlebar title="充值记录"></titlebar>
      <times title="充值记录"></times>
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

</style>