<template>
  <div class="topup">
    <titlebar title="充值记录"></titlebar>
    <times ref="headerChild" title="充值记录"></times>
    <button class="topupbtn" @click="submit">查询</button>
    <recordList :pantData=pantData></recordList>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import times from "@/components/recordTime";
import recordList from "@/components/recordList";

export default {
  components: {
    times,
    titlebar,
    recordList
  },
  data() {
    return {
        lastId:0,
        page:1,
        pantData:''
    };
  },
  methods: {
    submit() {
      let timeArry = [this.$refs.headerChild.start, this.$refs.headerChild.end];
      this.$axios.fetchPost("portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1002",
        data: {
          timeRange:timeArry,
          lastId: this.lastId,
            page:this.page
        }
      }).then(res=>{
          this.pantData = res.data.list
          this.lastId = res.lastId
          window.console.log(res)
      })
    }
  }
};
</script>

<style>
.topup {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.topupbtn {
  margin: 1rem;
  height: 2rem;
  border: none;
  border-radius: 8px;
}
</style>