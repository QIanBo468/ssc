<template>
  <div class="touzhurecord">
    <titlebar title="投注记录"></titlebar>
    <!-- <times ref="headerChild" title="投注记录"></times> -->
    <!-- <button @click="submit(type,status)" class="topupbtn">查询</button> -->
    <!-- <recordList @showSubmit='submit' :zhonglei="true" :pantData="pantData" ></recordList> -->
    <div class="zhonglei">
      <div class="zlName">
        <!-- <p>彩种名称</p> -->
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item @change="xialaone" v-model="cainame" :options="cai1" />
        </van-dropdown-menu>
      </div>
      <!-- <div class="zlActive">
        <p>彩种状态</p>
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item @change="xialatwo" v-model="caiactive" :options="cai2" />
        </van-dropdown-menu>
      </div> -->
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="kjRecord-content">
        <!-- <h3>近期开奖</h3> -->
        <ul>
          <li v-for="item of kjRecords" :key="item.qihao">
            <div class="kjRecord-content-item">
              <p>{{playtype == 1 ? '北京赛车' : '幸运游艇'}}</p>
              <span>第{{item.number_periods}}期</span>
              <div class="kjRecord-content-one">
                <p>{{item.number}}</p>
              </div>
            </div>
            <h3 :class="[item.is_win == 1? 'red': '']" >{{item.isWinName}}</h3>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
// import times from "@/components/recordTime";
// import recordList from "@/components/recordListTou";

export default {
  components: {
    // times,
    titlebar
    // recordList
  },
  data() {
    return {
      lastId: 0,
      page: 1,
      type: "",
      pantData: "",
      status: "",
      loading: false,
      finished: false,
      kjRecords:'',
      playtype:1,
      cai1: [
        { text: "全部彩种", value: 0 },
        { text: "北京PK拾", value: 1 },
        { text: "幸运飞艇", value: 2 }
      ],
      cainame:0,
    };
  },
  mounted() {
    this.submit();
  },
  methods: {
    onLoad() {},
    xialaone(){
        this.submit()
    },
  
    submit() {
      window.console.log(this.cainame);
      let timeArry = "";
      // if(this.$refs.headerChild.start !="" && !this.$refs.headerChild.end !=""){
      //     timeArry = [this.$refs.headerChild.start,this.$refs.headerChild.end];
      // }  else{
      //     timeArry=''
      // }
      // if (!status) {
      //   status = "";
      // }
      // if (!type) {
      //   type = "";
      // }
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          interface: "1003",
          module: "Lottery",
          data: {
            timeRange: timeArry,
            lastId: this.lastId,
            page: this.page,
            type: this.cainame,
            status: status
          }
        })
        .then(res => {
          //  this.tzRecords = res.data.list;
          if (res.code == 0) {
            this.lastId = res.data.lastId;
            this.kjRecords = res.data.list;
            (this.loading = false), (this.finished = true);
          } else {
            this.$toast(res.message);
          }

          window.console.log("投注记录", res);
        });
    }
  }
};
</script>

<style lang='less' scope>
.touzhurecord {
  display: flex;
  flex-direction: column;
  align-content: center;
  ul {
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  li {
    // background: #333;
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #f8f8f8;
  .kjRecord-content-item{
    // flex: 1;
  }
    p {
      font-size: 14px;
      color: #000;
      margin-bottom: 0.2rem;
    }
    span {
      color: #333;
      margin-bottom: 0.2rem;
    }
    .kjRecord-content-one {
      display: flex;
      align-items: center;
      
      p {
        color: #999;
        font-size: 12px;
        margin-right: 0.5rem;
      }
    }
    h3 {
      // flex: 1;
      color: #999;
      font-size: 14px;
      
    }
  }
   .zhonglei {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    background: transparent;
    margin-bottom: 1rem;
    .zlName {
      display: flex;
      align-items: center;
      color: #666;
    }
    .zlActive {
      display: flex;
      align-items: center;
      color: #666;
    }
  }
}
}
.topupbtn {
  margin: 1rem;
  height: 2rem;
  border: none;
  border-radius: 8px;
}
.red{
  color: #f00 !important;
}
</style>