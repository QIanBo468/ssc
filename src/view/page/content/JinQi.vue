<template>
  <div class="JinQi">
    <titlebar title="开奖记录"></titlebar>
    <!-- <van-popup class="kjRecord" v-model="kjRecord"> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="kjRecord-content">
        <!-- <h3>近期开奖</h3> -->
        <ul>
          <li v-for="item of kjRecords" :key="item.qihao">
            <p>{{playtype == 1 ? '北京赛车' : '幸运游艇'}}</p>
            <span>{{item.thirdNumber}}</span>
            <div>
                <p>{{item.lotteryTime}}</p>
                <p>第{{item.thirdNumberPeriods}}期</p>
            </div>
            
          </li>
        </ul>
      </div>
    </van-list>
    <!-- </van-popup> -->
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
      return{
          lastId:0,
          page:1,
          loading:false,
          finished:false,
          kjRecords:[
              {}
          ],
          playtype:''
      }
  },
  created() {
      this.playtype = this.$route.query.type
      this.jinqikaijiang()
  },
  methods: {
      onLoad() {

      },
        jinqikaijiang() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1004",
          data: {
            lastId: this.lastId,
            page: this.page,
            type: this.playtype
          }
        })
        .then(res => {
          this.kjRecords = res.data.list;
        //   this.current = res.data.list[0].numberPeriods;
        //   this.pitch = res.data.list[0].thirdNumber;
        //   this.num = this.pitch.split(",");
          window.console.log("近期开奖", res);
          if (res.code == 0) {
                this.loading=false,
          this.finished=true
          }
        });
    }
  },
};
</script>

<style lang='less' scope>
.JinQi{
    height: 100%;
    ul{
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        li{
            // background: #333;
            display: flex;
            flex-direction: column;
            font-size: 13px;
            margin-bottom: .5rem;
            border-bottom: 1px solid #f8f8f8;
            p{
                font-size: 14px;
                color: #000;
                margin-bottom: .2rem;
            }
            span{
                color: #333;
                margin-bottom: .2rem;
            }
            div{
                display: flex;
                align-items: center;
               
                p{
                    color: #999;
                     font-size: 12px;
                     margin-right: .5rem;
                }
            }
        }
    }
}
</style>