<template>
  <div class="zhongjian">
    <titlebar title="中奖记录"></titlebar>
    <times ref="headerChild" title="中奖记录"></times>
    <button @click="submit" class="topupbtn">查询</button>
    <recordList :pantData="pantData" :searchpop="true"></recordList>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import times from "@/components/recordTime";
import recordList from "@/components/recordListTou";

export default {
  components: {
    times,
    titlebar,
    recordList
  },
  data() {
    return {
        lastId: 0,
      page: 1,
      type: "",
      pantData: "",
      status:''
    };
  },
mounted() {
  this.submit()
},
  methods: {
    submit() {
       let timeArry;
        if(this.$refs.headerChild.start !="" && !this.$refs.headerChild.end !=""){
            timeArry = [this.$refs.headerChild.start,this.$refs.headerChild.end];
        }  else timeArry=''
      
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          interface: "1005",
          module: "Lottery",
          data: {
            timeRange: timeArry,
            lastId: this.lastId,
            page: this.page,
            type: 0,
          }
        })
        .then(res => {
          //  this.tzRecords = res.data.list;
          if (res.code == 0) {
            this.lastId = res.lastId;
            this.pantData = res.data.list;
          } else {
            this.$toast(res.message);
          }

          window.console.log(res);
        });
    }
  }
};
</script>

<style>
.zhongjian {
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