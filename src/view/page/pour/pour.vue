<template>
  <div class="downPour" @click.stop="kjRecord = false">
    <titlebar :title=" type== 0 ? '北京PK拾':'幸运飞艇'"></titlebar>
    <!-- 开奖区 -->
    <div class="header">
      <div class="header-text">
        <p>金币: {{jinbi}}</p>
        <p>当前流水: {{jiangliushui}}</p>
      </div>

      <div class="qihaoimg">
        <p>最新开奖结果</p>
        <div  @click.stop="$router.push({path:'JinQi',query:{type:playtype}})">
          开奖记录
          <img src="@/assets/more@3x.png" alt />
        </div>
      </div>
      <!-- <div class="logo">
        <img class="logoimg" :src="type ==0 ? logo : logo1" alt />
        <div class="kai">
          <div class="qihao">
            <div class="qihaonum">
              {{type ==0 ? '北京PK拾': '幸运飞艇'}}
              <span>{{qihao}}</span> 期
            </div>
            
          </div>
          <div class="jiang">
            <div class="jianghao" v-if="daojishi">
              <transition v-for="(item,index) of num" :key="index">
                <img :src="item.src1" alt />
              </transition>
            </div>
            <div class="jianghint" v-else>
              <transition-group>
                <span class="one" :key="1">正</span>
                <span class="one" :key="2">在</span>
                <span class="one" :key="3">开</span>
                <span class="one" :key="4">奖</span>
                <span class="one" :key="5">中</span>
              </transition-group>
            </div>
          </div>
        </div>
      </div>-->

      <!-- 期号 -->
      <div class="issue">
        <div class="issue-jiang">
          第{{current}}期开奖号码
          <ul>
            <li v-for="(item,index) of num " :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="issue-feng">
          <p  v-if="querenTime">
              {{qihao}} 期封盘时间:
          <van-count-down @finish="finished" :time="time+(times*(time-1000))" />
          </p>
        
          <p v-else style="font-size:16px;margin-top:.5rem; color:#f00">开奖中</p>
        </div>
      </div>
    </div>

    <!-- 选号 -->
    <div class="xuanhao">
      <div class="xuanhao-title">
        <h3>冠军</h3>

        <div @click="tzRecordes">
          投注记录
          <img src="@/assets/more@3x.png" alt />
        </div>
      </div>
      <!-- <p>请选择号码</p> -->
      <ul>
        <li
          :class="item.flg ? 'xuanzhong':''"
          v-for="item of arry"
          :key="item.num"
          @click="xuanzhong(item)"
        >{{item.num}}</li>
      </ul>
    </div>

    <!-- 倍率 -->
    <div class="beilv">
      <p v-if="beilv">共4注，金额{{beishu*4* +price}}.00元</p>
      <p v-else>请选择四位数字</p>

      <div class="touzhu">
        <div class="stepper">
          <span>元</span>模式
          <div class="stepper-cont">
            <span>倍数:</span>

            <p @click="jianhao" style="margin-right:5px;"> - </p>
            <input onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" type="text" v-model="beishu" />
            <p @click="beishu++" style="margin-left:5px;"> + </p>
          </div>
        </div>
        <button @click="pourzhus">添加投注</button>
      </div>

      <div class="pours">
        <div v-if="pourzhu">
          <p>[4注]</p>
          <p>{{beishu* 4 * +price}}.00元</p>
          <p>{{beishu}}倍</p>
          <p>元模式</p>
          <van-icon name="close" @click="pourzhu = false"></van-icon>
        </div>
      </div>
    </div>

    <!-- 确认投注 -->
    <div class="affirm">
      <div class="affirm-content">
        <!-- <div>
          <p>总注数4注</p>
          <div @click="tzRecordes">
            <img src="@/assets/iconfont-2jilu.png" alt />投注记录
          </div>
        </div>
        <h3 v-if="pourzhu">总金额 {{beishu*4* +price}}.00 元</h3>-->
        <van-button class="affirm-btn" @click="submit">确认投注</van-button>
      </div>
    </div>

    <!-- 开奖记录 -->
    <van-popup class="kjRecord" v-model="kjRecord">
      <div class="kjRecord-content">
        <h3>近期开奖</h3>
        <ul>
          <li v-for="item of kjRecords" :key="item.qihao">
            <p>{{item.thirdNumberPeriods}}</p>
            <span>{{item.thirdNumber}}</span>
          </li>
        </ul>
        <div @click="kjRecord = !kjRecord">关闭</div>
      </div>
    </van-popup>
    <!-- 投注记录 -->
    <van-popup class="tzRecord" v-model="tzRecord">
      <div class="pops">
        <!-- <div> -->
          <ul class="pop-title">
            <!-- <li>编号</li> -->
            <li>期号</li>
            <li>倍数</li>
            <!-- <li>模式</li> -->
            <li>状态</li>
            <li>操作</li>
          </ul>
          <ul class="pop-content">
            <li v-for="item of tzRecords" :key="item.bianhao" @click="tzxq(item)">
              <!-- <span>{{item.id}}</span> -->
              <span>{{item.number_periods}} 期</span>
              <span>{{item.multiple}}</span>
              <!-- <span>{{item.typeName}}</span> -->
              <span>{{item.isWinName}}</span>
              <span>{{item.is_win ==0 ? '撤单': '不可操作'}}</span>
            </li>
            <!-- <li class="wu">没有更多了</li> -->
          </ul>
          <div class="btn-box">
            <van-button class="btn" @click="tzRecord = false">关闭</van-button>
          </div>
        <!-- </div> -->
      </div>
    </van-popup>

    <van-popup class="Tzxiangqing" v-model="touzhuxiangqing">
      <div class="tzxq-cont">
        <h3>投注信息</h3>
        <div>
          <p>购买金额: <span> {{TZXQ.amount}}</span></p>
          <p>期号:<span>{{TZXQ.numberPeriods}}</span> </p>
        </div>
        <div>
          <p>中奖金额:<span>{{TZXQ.winAmount}}</span> </p>
          <p>投注时间:<span>{{TZXQ.createdAt}}</span> </p>
        </div>
        <div>
          <p>订单状态:<br><span> {{TZXQ.isWinName}}</span></p>
          <p>开奖时间:<span> {{TZXQ.lotteryTime}}</span></p>
        </div>
        <div class="tzxq-cont-down">购买盈亏:<span> {{TZXQ.profit}}</span></div>
        <div class="tzxq-cont-down">开奖号码:<span>{{TZXQ.winNumber}}</span> </div>
        <div class="tzxq-cont-down">投注内容:<span style="margin-right:40px;"> {{TZXQ.number}}</span></div>

        <van-button v-if="TZXQ.isWinName =='未开奖'" @click="revocation(TZXQ)">撤单</van-button>
        <van-button @click="touzhuxiangqing = false">关闭</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
    return {
      type: 0,
      touzhuxiangqing: false,
      TZXQ: {},
      qihao: "",
      jinbi: "0.00",
      jiangliushui: 0,
      kjRecord: false, //开奖记录
      tzRecord: false, // 投注记录
      time: 2000, //倒计时
      times:'',
      daojishi: true,
      logo: require("../../../assets/bj_pk10.png"),
      logo1: require("../../../assets/tw_pk10.png"),
      num: [
        // 上期中奖号码
        // { nums: "01", src1: require("../../../assets/m_c_01.png") },
        // { nums: "03", src1: require("../../../assets/m_c_03.png") },
        // { nums: "02", src1: require("../../../assets/m_c_02.png") },
        // { nums: "04", src1: require("../../../assets/m_c_04.png") },
        // { nums: "05", src1: require("../../../assets/m_c_05.png") },
        // { nums: "06", src1: require("../../../assets/m_c_06.png") },
        // { nums: "07", src1: require("../../../assets/m_c_07.png") },
        // { nums: "08", src1: require("../../../assets/m_c_08.png") },
        // { nums: "09", src1: require("../../../assets/m_c_09.png") },
        // { nums: "10", src1: require("../../../assets/m_c_10.png") }
      ],
      arry: [
        // 选择奖号
        { num: "01", flg: false },
        { num: "02", flg: false },
        { num: "03", flg: false },
        { num: "04", flg: false },
        { num: "05", flg: false },
        { num: "06", flg: false },
        { num: "07", flg: false },
        { num: "08", flg: false },
        { num: "09", flg: false },
        { num: "10", flg: false }
      ],
      kjRecords: [],
      tzRecords: [
        // { number_periods: 20191206073, multiple: 10, isWinName: "未开奖" }
      ],
      number: [], //选择的奖号
      sums: -1,
      temp: "",
      pitch: ["06", "04", "03", "02", "01", "05", "07", "08", "09", "10"],
      beilv: false,
      pourzhu: false, //添加投注 显示
      beishu: 1, //当前选择倍数
      lastId: 0,
      page: 1,
      playtype: "", // 玩法类型
      price: "", //单价
      current: "",
      querenTime:true
    };
  },
  created() {
    this.type = this.$route.query.type;
    if (this.type == 0) {
      this.playtype = "1";
    } else if (this.type == 1) {
      this.playtype = "2";
    }
    // console.log(this.num);
    this.zhushubefore();
    this.singular();
    this.dangqian();
    this.jinqikaijiang();
    this.liushui();
  },

  methods: {
    finished() {
      this.querenTime = false
      // console.log("时间结束");
      // this.$router.go(0)
      setTimeout(()=>{
        this.finishedss()
      },38000)
    },
    finishedss() {
      setTimeout(()=>{
        if (this.times>=0) {
            this.$router.go(0)
        } 
        // 
      },2000)
      if (this.time) {
        // 
      }
    },
    //钱包流水
    liushui() {
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1000"
        })
        .then(res => {
          this.jinbi = res.data.creditList.credit_2.value;
          this.jiangliushui = res.data.prize;
          window.console.log("钱包信息", res);
        });
    },
    zhushubefore() {},
    //单注价格
    singular() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1000",
          data: {
            type: this.playtype
          }
        })
        .then(res => {
          this.price = res.data.price;
          // window.console.log(typeof this.price);
        });
    },
    dangqian() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "10001",
          data: {
            type: this.playtype
          }
        })
        .then(res => {
          window.console.log(res);
          // this.price = res.data.price;
          this.qihao = res.data.qishu;
        
          this.times = res.data.fengpan+20;
          
           window.console.log(res.data.fengpan)
          // this.times =20;
        });
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
          this.current = res.data.list[0].numberPeriods;
          this.pitch = res.data.list[0].thirdNumber;
          this.num = this.pitch.split(",");
          window.console.log("近期开奖", this.num);
        });
      let that = this,
        // sum = 0,
        temp;

      // console.log(this.type);
      // console.log(this.num);

      // 根据数组，进行排序
      this.pitch.forEach(item => {
        that.sums++;
        that.num.findIndex((value, index) => {
          if (value.nums == item) {
            temp = that.num[index];
            that.num[index] = that.num[that.sums];
            that.num[that.sums] = temp;
          }
        });
      });
    },
    tzRecordes() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1003",
          data: {
            timeRange: "",
            lastId: this.lastId,
            page: this.page,
            type: this.playtype,
            status:""
          }
        })
        .then(res => {
          this.tzRecords = res.data.list;

          window.console.log("投注记录", res);
        });
      this.tzRecord = true;
    },
    submit() {
      if (this.number.length < 4) {
        this.$toast("请选择冠军号码");
        return;
      }
      if (!this.pourzhu) {
        this.$toast("请添加投注");
        return;
      }
      if (!this.querenTime) {
          this.$toast('封盘中，请稍后...')
          return
      }
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1002",
          data: {
            number: this.number.join(","), //下注号码
            price: this.price, //价格
            quantity: "4",
            multiple: this.beishu.toString(),
            type: this.playtype
          }
        })
        .then(res => {
          this.$toast(res.message);
          if (res.code == 0) {
            setTimeout(() => {
              window.location.reload();
            }, 500)((this.this.number = [])),
              (this.beishu = "");
          }
          window.console.log(res);
        });
    },
    revocation(item) {
      let that = this;
      if (item.isWinName == "未开奖") {
        Dialog.confirm({
          confirmButtonColor: "#ffdd00",
          cancelButtonColor: "#cdaa6f",
          // title: "标题",
          message: "是否撤销"
        })
          .then(() => {
            that.$axios
              .fetchPost("/portal", {
                source: "web",
                version: "v1",
                module: "Lottery",
                interface: "1006",
                data: {
                  id: item.id.toString()
                }
              })
              .then(res => {
                that.$toast(res.message);
                if (res.code == 0) {
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
                window.console.log(res);
              });
          })
          .catch(() => {});
      }
    },
    tzxq(item) {
      this.touzhuxiangqing = true;
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1007",
          data: {
            id: item.id.toString()
          }
        })
        .then(res => {
          this.TZXQ = res.data;
          window.console.log(res);
        });
    },

    jianhao() {
      if (this.beishu <= 1) {
        return;
      } else {
        this.beishu--;
      }
    },
 
    // 选择号码
    xuanzhong(item) {
      let sum = 0;
      // 循环当前选中个数
      this.arry.forEach(e => {
        if (e.flg && sum <= 3) {
          sum += 1;
          this.beilv = false;
        }
        if (sum > 3 && !item.flg) {
          this.$toast("最多可选四个数");
          // sum = 3
          this.beilv = true;
          // return;
        }
      });
      // 如果是未选项和总数不到4个 可以选中  且将其添加到选中数组
      if (!item.flg && sum <= 3) {
        if (sum > 2) {
          //当总数为4个的时间显示下方的标注
          this.beilv = true;
        }
        item.flg = !item.flg;
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        if (a != -1) {
          this.number.splice(a, 1);
          return;
        } else {
          this.number.push(item.num);
          return;
        }
      }

      // 如果 是已经选中 则将其变为未选中  且从选中数组中删除
      if (item.flg) {
        item.flg = !item.flg;
        sum--;
        if (sum <= 3) {
          this.beilv = false;
        }
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        if (a != -1) {
          this.number.splice(a, 1);

          return;
        }
      }
    },
    // 下注提示
    pourzhus() {
      if (this.beilv) {
        this.pourzhu = true;
      } else if (!this.beilv) {
        Dialog.alert({
          confirmButtonColor: "#ffdd00",
          cancelButtonColor: "#cdaa6f",
          // title: "标题",
          message: "请选择4位数字"
        }).then(() => {});
      }
    }
  }
};
</script>

<style lang='less' scope>
.downPour {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .header-text {
      width: 100%;
      display: flex;
      border-bottom: 10px solid #f8f8f8;
      padding-bottom: 0.8rem;
      p {
        flex: 1;
        text-align: center;
      }
    }
    .qihaoimg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0.5rem;
      p {
        font-size: 15px;
        color: #999;
      }
      img {
        width: 18px;
        height: 18px;
      }
      div {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #999;
      }
    }
    .issue {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.5rem;
      .issue-jiang {
        font-size: 14px;
        color: #999;
        margin-bottom: 5px;
        ul {
          display: flex;
          li {
            margin-right: 5px;
            background: #af53d1;
            color: #fff;
            border-radius: 50%;
            font-size: 12px;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
          }
        }
      }
      .issue-feng {
        display: flex;
        color: #999;
        font-size: 14px;
        p{
          display: flex;
          align-items: center;
          font-size: 14px;
          
        }

      }
    }
  }

  .xuanhao {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .xuanhao-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      img {
        width: 18px;
        height: 18px;
      }
      div {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #999;
      }
    }
    h3 {
      color: #999;
      margin: 10px 15px 0;
    }
    ul {
      width: 60%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      li {
        // flex: 1;
        border: 1px solid #999;
        background: #fff;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        font-size: 1rem;
        font-weight: bold;
        color: #7b7b7b;
        margin: 10px 0px;
      }
      .xuanzhong {
        // background: url("../../../assets/m_yuan2.png");
        // background-size: 100%;
        background: #af53d1;
        color: #fff;
      }
    }
  }

  .beilv {
    // border-top: 1px solid #ad8460;

    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-bottom: 20px;
      color: #666;
      font-weight: bold;
    }
    .touzhu {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      // color: #fff;.

      .stepper {
        display: flex;
        align-items: center;
        font-size: 13px;
        .stepper-cont {
          display: flex;
          align-items: center;
          margin-left: 1rem;
          font-size: 13px;
          p {
            background: #af53d1;
            color: #fff;
            border-radius: 50%;
            // padding-left: 5px;
            // padding-right: 5px;
            width: 1.4rem;
            height: 1.4rem;
            text-align: center;
            line-height: 1.4rem;
            margin: 0;
            font-size: 16px;
          }
          span {
            background: transparent;
            color: #666;
            width: 50px;
          }
        }
      }
      span {
        display: inline-block;
        color: #fff;
        height: 25px;
        width: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: 6px;
        background: #af53d1;
        margin-right: 5px;
      }
      input {
        width: 40px;
        height: 25px;
        border: none;
        border-radius: 8px;
        color: #000;
        font-weight: bold;
        text-align: center;
        border: 1px solid #999;
      }
      button {
        background: #af53d1;
        color: #fff;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 8px;
      }
    }
    .pours {
      box-sizing: border-box;
      width: 100%;
      margin-top: 10px;
      padding: 0 15px;
      // background: #949494;
      height: 40px;
      div {
        line-height: 40px;
        // background: #a4a4a4;
        align-items: center;
        width: 100%;
        display: flex;
        justify-content: space-around;
        p {
          margin: 0;
          padding: 0;
          color: #af53d1;
        }
      }
    }
  }
}

.affirm {
  display: flex;
  flex-direction: column;
  padding: 15px;
  .affirm-content {
    // background: #161618;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      // p {
      //   color: #dcbf88;
      //   font-size: 16px;
      //   font-weight: bold;
      // }
      div {
        color: #dcbf88;
        img {
          width: 16px;
          height: 20px;
        }
      }
    }
    h3 {
      text-align: center;
      color: #dcbf88;
      margin-bottom: 5px;
    }
    .affirm-btn {
      background: #af53d1;
      color: #fff;
      border: none;
      border-radius: 20px;
    }
  }
}
.kjRecord {
  height: 50%;

  width: 100%;

  .kjRecord-content {
    width: 100%;
    // position: fixed;
    // top: 15%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
  h3 {
    color: #7b7b7b;
    font-size: 15px;
  }
  ul {
    margin: 10px 0;
    width: 100%;
  }
  li {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #828282;
    border: 1px solid #828282;
    margin-top: 2px;
  }
  div {
    color: #f00;
  }
}
.tzRecord {
  width: 100%;
  height: 500px;
  background: transparent;
  padding: 15px;
  box-sizing: border-box;

  .pops {
    background: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    .btn-box {
      width: 91%;
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 20px;
      box-sizing: border-box;
      // left: 10%;
    }
    .btn {
      width: 100%;
      height: 3rem;;
      line-height: 30px;
      background: #af53d1;
      color: #fff;
        border-radius: 40px;
      // align-self: flex-end;
      // border: none;
    }
    .pop-title {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      // background: #48382b;
      height: 30px;
      align-items: center;
      color: #333;
      font-size: 15px;
      text-align: center;
      padding: 1rem;
      li{
        flex: 1;
        border: 1px solid #999;
      }
    }
    .pop-content {
      overflow-y: auto;
      li {
        display: flex;
        font-size: 14px;
        color: #999;
        justify-content: space-around;
        text-align: center;
        box-sizing: border-box;
        padding: 1rem;
        overflow-y: auto;
        // border: 1px solid #48382b;

        span {
          display: inline-block;
          flex: 1;
          // border-right: 1px solid #48382b;
          box-sizing: border-box;
          padding-bottom: 3px;
          text-align: center;
          // border: 1px solid #333;
        }
      }
      .wu {
        background: #48382b;
        margin-top: 20px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
      }
    }
  }
}
.Tzxiangqing {
  display: flex;
  flex-direction: column;
  .tzxq-cont {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
    h3 {
      font-size: 18px;
      margin-bottom: 1rem;
      color: #999;
    }
    div {
      display: flex;
      justify-content: space-around;
      
      font-size: 16px;
      border: 1px solid #999;
      // line-height: 18px;
      p {
        flex: 4;
        text-align: start;
        font-size: 15px;
        padding: 1rem;
        border-right: 1px solid #666;
        span{
          color: #666;
        }
      }
      p:last-child {
        flex: 6;
      }
    }
    .tzxq-cont-down{
      padding: .5rem;
      span{
        color: #666;
      }
    }
  }
  button{
    width: 80%;
    height: 3rem;
    background: #af53d1;
    border-radius: 20px;
    margin: 1rem auto;
    color: #fff;
  }
}
// 倒计时颜色
.van-count-down {
  color: #f00;
}
</style>