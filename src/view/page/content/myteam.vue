<template>
  <div>
    <titlebar title="我的团队"></titlebar>
    <div class="mydata">
      <h3>我的信息</h3>
      <div class="mydata-content">
        <div class="content">
          <p>用户名
          </p>
          <p>
          
            {{mydata.username}}
          </p>
        </div>
        <div class="content">
          <p>级别</p>
          <p>VIP{{mydata.level}}</p>
        </div>
        <div class="content">
          <p>总流水(万)</p>
          <p>{{mydata.prize/10000}}</p>
        </div>
        <div class="content">
          <p>人数</p>
          <p>{{mydata.number}}</p>
        </div>
      </div>
    </div>
    <div class="mydaili">
      <h3>代理等级</h3>
      <div class="mydata-content">
        <div class="content">
          <p>级别</p>
          <p>总流水(万)</p>
          <p>返佣金额</p>
        </div>
          <div class="content">
          <p>VIP0</p>
          <p>0</p>
          <p>0%</p>
        </div>
        <div class="content" v-for="(item,index) of configs" :key="index">
          <p>VIP{{item.level}}</p>
          <p>{{item.liushui/10000}}</p>
          <p>{{item.fanyong}}%</p>
        </div>
      </div>
    </div>

    <div class="mydaili">
      <h3>我的下级</h3>
      <div class="mydata-content">
        <div class="content">
          <p>用户名</p>
          <p>级别</p>
          <p>总流水(万)</p>
          <p>人数</p>
        </div>
        <div class="content" v-for="(item,index) of xiaji" :key="index">
          <p>{{item.username}}</p>
          <p>VIP{{item.level}}</p>
          <p>{{item.prize/10000}}</p>
          <p>{{item.count}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
    return {
      mydata: {
        yonghu: "",
        id: "",
        leavl: "",
        liushui: "",
        num: 0,
        configs:[]
      },
      dengji: [
        { le: "VIP0", liushui: 0, money: "0‰" },
        { le: "VIP1", liushui: 18, money: "5‰" },
        { le: "VIP2", liushui: 58, money: "10‰" },
        { le: "VIP3", liushui: 188, money: "15‰" },
        { le: "VIP4", liushui: 588, money: "20‰" },
        { le: "VIP5", liushui: 2088, money: "25‰" },
        { le: "VIP6", liushui: 6888, money: "30‰" }
      ],
      xiaji: [
        // { id: 123456, le: "VIP0", liushui: 0, money: 1 },
        // { id: 123456, le: "VIP1", liushui: 18, money: 2 },
        // { id: 123456, le: "VIP2", liushui: 58, money: 3 },
        // { id: 123456, le: "VIP3", liushui: 188, money: 3 },
        // { id: 123456, le: "VIP4", liushui: 588, money: 4 },
        // { id: 123456, le: "VIP5", liushui: 2088, money: 5 },
        // { id: 123456, le: "VIP6", liushui: 6888, money: 6 }
      ]
    }
  },
    created() {
        this.$axios.fetchPost('portal',{
          source: "web",
            version: "v1",
            module: "User",
            interface: "6000",
            data:{}
        }).then(res=>{
          //  debugger
          this.mydata = res.data.userinfo
          this.xiaji = res.data.list
         
          this.configs = res.data.config
          window.console.log(res)
        })

    }
};
</script>

<style lang='less' scope>
.mydata {
  display: flex;
  flex-direction: column;
  color: #999;
  h3 {
    margin: 0.5rem;
  }
  .mydata-content {
    display: flex;
    // justify-content: space-around;
    border: 1px solid #eee;

    // padding: 0.5rem;
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #eee;
      p {
        flex: 1;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        font-size: 0.8rem;
        text-align: center;
      }
    }
  }
}
.mydaili {
  display: flex;
  flex-direction: column;
  color: #999;
  margin-bottom: 1rem;
  h3 {
    margin: 0.5rem;
  }
  .mydata-content {
    display: flex;
    flex-direction: column;
    .content {
      display: flex;
      p {
        flex: 1;
        text-align: center;
        border: 1px solid #eee;
        box-sizing: border-box;
        padding: 0.5rem;
      }
    }
  }
}
</style>