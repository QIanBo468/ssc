<template>
  <div class="depositrocrd">
    <titlebar ref="headerChild" title="提现记录"></titlebar>
    <!-- <times title="提现记录"></times> -->
    <!-- <button class="topupbtn" @click="submit">查询</button> -->
    <recordList  :pantData="pantData" :topDes=1></recordList>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
// import times from "@/components/recordTime";
import recordList from "@/components/recordList";

export default {
  components: {
    // times,
    titlebar,
    recordList
  },
  data() {
    return {
      timeRange: "",
      lastId: 0,
      page: 1,
      pantData:[
      ]
    };
  },
  mounted() {
    this.submit()
  },
  methods: {
    submit() {
       let timeArry="";
      // if (this.$refs.headerChild.start != "" && !this.$refs.headerChild.end) {
      //   timeArry = [this.$refs.headerChild.start, this.$refs.headerChild.end];
          
      // } else {
      //   timeArry = "";
      //   window.console.log('1111')
      // }
      this.$axios
        .fetchPost("portal/Digiccy", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "2002",
          data: {
            timeRange: timeArry,
            lastId: this.lastId,
            page: this.page
          }
        })
        .then(res => {
          this.pantData = res.data.list;
          this.lastId = res.lastId;
          window.console.log(res);
        });
    }
  }
};
</script>

<style>
.depositrocrd {
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