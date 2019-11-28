<template>
  <div class="downPour" @click.stop="kjRecord = false">
    <titlebar :title=" type== 0 ? '北京PK拾':'幸运飞艇'"></titlebar>
    <!-- 开奖区 -->
    <div class="header">
      <!-- logo区 -->
      <div class="logo">
        <img class="logoimg" :src="type ==0 ? logo : logo1" alt />
        <div class="kai">
          <div class="qihao">
            <div class="qihaonum">
              {{type ==0 ? '北京PK拾': '幸运飞艇'}}
              <span>{{jiang.qihao}}</span> 期
            </div>
            <div class="qihaoimg" @click.stop="kjRecord = !kjRecord">
              <img src="@/assets/louhao.png" alt />近期开奖
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
      </div>

      <!-- 期号 -->
      <div class="issue">
        <div>
          {{jiang.qihao}} 期 &nbsp;
          <span></span> &nbsp;
          <van-count-down :time="time" />
        </div>

        <p>金币: {{jiang.jinbi}} 当前流水: {{jiang.liushui}}</p>
      </div>
    </div>

    <!-- 选号 -->
    <div class="xuanhao">
      <h3>冠军</h3>

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
      <p v-if="beilv">共4注，金额{{beishu*8}}.00元</p>
      <p v-else>请选择四位数字</p>

      <div class="touzhu">
        <div>
          <span>元</span>
          <input onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" type="text" v-model="beishu" />倍
        </div>
        <button @click="pourzhus">添加投注</button>
      </div>

      <div class="pours">
        <div v-if="pourzhu">
          <p>[4注]</p>
          <p>{{beishu*8}}.00元</p>
          <p>{{beishu}}倍</p>
          <p>元模式</p>
          <van-icon name="close" @click="pourzhu = false"></van-icon>
        </div>
      </div>
    </div>

    <!-- 确认投注 -->
    <div class="affirm">
      <div class="affirm-content">
        <div>
          <p>总注数4注</p>
          <div @click="tzRecord = true">
            <img src="@/assets/iconfont-2jilu.png" alt />投注记录
          </div>
        </div>
        <h3>总金额 {{8*beishu}}.00 元</h3>
        <van-button class="affirm-btn">确认投注</van-button>
      </div>
    </div>

    <!-- 开奖记录 -->
    <div class="kjRecord" v-if="kjRecord">
      <div class="kjRecord-content">
        <h3>近期开奖</h3>
        <ul>
          <li v-for="item of kjRecords" :key="item.qihao">
            <p>{{item.qihao}}</p>
            <span>{{item.number}}</span>
          </li>
        </ul>
        <div @click="kjRecord = !kjRecord">关闭</div>
      </div>
    </div>
    <!-- 投注记录 -->
    <van-popup class="tzRecord" v-model="tzRecord">
      <div class="pops">
        <div>
          <ul class="pop-title">
            <li>编号</li>
            <li>期号</li>
            <li>倍数</li>
            <li>模式</li>
            <li>状态</li>
            <li>操作</li>
          </ul>
          <ul class="pop-content">
            <li v-for="item of tzRecords" :key="item.bianhao">
              <span>{{item.bianhao}}</span>
              <span>{{item.qihao}}</span>
              <span>{{item.beishu}}</span>
              <span>{{item.moshi}}</span>
              <span>{{item.zhangtai}}</span>
              <span>{{item.caozuo}}</span>
            </li>
            <li class="wu">没有更多了</li>
          </ul>
          <button class="btn" @click="tzRecord = false">关闭</button>
        </div>
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
      jiang: {
        qihao: 741635,
        jinbi: "0.00",
        liushui: 0
      },
      kjRecord: false,
      tzRecord: false,
      time: 5 * 60 * 1000,
      daojishi: true,
      logo: require("../../../assets/bj_pk10.png"),
      logo1: require("../../../assets/tw_pk10.png"),
      num: [
        { nums: "01", src1: require("../../../assets/m_c_01.png") },
        { nums: "03", src1: require("../../../assets/m_c_03.png") },
        { nums: "02", src1: require("../../../assets/m_c_02.png") },
        { nums: "04", src1: require("../../../assets/m_c_04.png") },
        { nums: "05", src1: require("../../../assets/m_c_05.png") },
        { nums: "06", src1: require("../../../assets/m_c_06.png") },
        { nums: "07", src1: require("../../../assets/m_c_07.png") },
        { nums: "08", src1: require("../../../assets/m_c_08.png") },
        { nums: "09", src1: require("../../../assets/m_c_09.png") },
        { nums: "10", src1: require("../../../assets/m_c_10.png") }
      ],
      arry: [
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
      kjRecords: [
        { qihao: 741725, number: "03-05-04-07-02-06-10-08-01" },
        { qihao: 741724, number: "03-05-04-07-02-06-10-08-01" },
        { qihao: 741723, number: "03-05-04-07-02-06-10-08-01" },
        { qihao: 741722, number: "03-05-04-07-02-06-10-08-01" },
        { qihao: 741721, number: "03-05-04-07-02-06-10-08-01" },
        { qihao: 741720, number: "03-05-04-07-02-06-10-08-01" },
        { qihao: 741719, number: "03-05-04-07-02-06-10-08-01" }
      ],
      tzRecords: [
        {
          bianhao: 0,
          qihao: 741725,
          beishu: 4,
          moshi: "幸运飞艇",
          zhangtai: "未开奖",
          caozuo: "已投注"
        },
        {
          bianhao: 1,
          qihao: 741725,
          beishu: 4,
          moshi: "幸运飞艇",
          zhangtai: "未开奖",
          caozuo: "已投注"
        },
        {
          bianhao: 2,
          qihao: 741725,
          beishu: 4,
          moshi: "幸运飞艇",
          zhangtai: "未开奖",
          caozuo: "已投注"
        },
        {
          bianhao: 3,
          qihao: 741725,
          beishu: 4,
          moshi: "幸运飞艇",
          zhangtai: "未开奖",
          caozuo: "已投注"
        }
      ],
      number: [],
      sums: -1,
      temp: "",
      pitch: ["06", "04", "03", "02", "01", "05", "07", "08", "09", "10"],
      beilv: false,
      pourzhu: false,
      beishu: 1
    };
  },
  created() {
    let that = this,
      // sum = 0,
      temp;
    this.type = this.$route.query.type;
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
    // console.log(this.num);
  },

  methods: {
    finish() {
      // console.log("时间结束");
    },

    // 选择号码
    xuanzhong(item) {
      let sum = 0;
      this.arry.forEach(e => {
        if (e.flg && sum <= 4) {
          sum += 1;

          this.beilv = false;
        }
        if (sum > 3 && !item.flg) {
          this.$toast("最多可选四个数");
          this.beilv = true;
          // return;
        }
      });
      if (sum >= 3) {
        this.beilv = true;
        // console.log(this.beilv);
      }
      if (sum < 4) {
        item.flg = !item.flg;
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        // console.log(a);
        if (a != -1) {
          this.number.splice(a, 1);
          // console.log(this.number);
          return;
        } else {
          this.number.push(item);
          // console.log(this.number);
          return;
        }
      }
      // console.log(sum);

      if (sum == 4 && item.flg) {
        item.flg = !item.flg;
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        if (a != -1) {
          this.number.splice(a, 1);
          // console.log(this.number);
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
    border-bottom: 1px solid #ffce6f;
    .logoimg {
      width: 6.8rem;
      height: 4.8rem;
    }
    .logo {
      display: flex;

      .kai {
        width: 100%;
      }
      .qihao {
        width: 100%;
        display: flex;
        justify-content: space-around;
        color: #ffc000;
        font-size: 0.8rem;
        span {
          color: #ecc788;
        }
        .qihaoimg {
          font-size: 0.5rem;
          color: #e8673e;
        }
      }
      .jiang {
        .jianghao {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow: hidden;
          img {
            // flex: 1;
            width: 2.7rem;
            height: 1.7rem;
            margin-right: 8px;
            margin-top: 5px;
          }
        }
        .jianghint {
          color: #ecc788;
          display: flex;
          width: 100%;
          overflow: hidden;
          .one {
            display: inline-block;
            height: 50px;
            width: 50px;
            border: 1px solid #ecc788;
            text-align: center;
            line-height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
    .issue {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #f00;
      margin-top: 30px;
      div {
        display: flex;
        align-items: center;
        font-size: 18px;
      }
      span {
        width: 24px;
        height: 24px;
        background: url(../../../assets/iconfont-wodedingdan10.png);
        background-size: 100%;
      }
      p {
        margin-top: 20px;
        color: #ad8460;
        margin-bottom: 10px;
      }
    }
  }

  .xuanhao {
    margin-bottom: 10px;
    h3 {
      color: #ffc000;
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
        background: url("../../../assets/m_yuan2.png");
        background-size: 100%;
        color: #fff;
      }
    }
  }

  .beilv {
    border-top: 1px solid #ad8460;

    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-bottom: 20px;
      color: #ffc000;
    }
    .touzhu {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      span {
        display: inline-block;
        color: #fff;
        height: 25px;
        width: 25px;
        text-align: center;
        border-radius: 6px;
        background: #ecc788;
        margin-right: 5px;
      }
      input {
        width: 80px;
        height: 25px;
        border: none;
        border-radius: 8px;
        color: #000;
        font-weight: bold;
        text-align: center;
      }
      button {
        background: #cdaa6f;
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
      background: #949494;
      height: 40px;
      div {
        line-height: 40px;
        background: #a4a4a4;
        align-items: center;
        width: 100%;
        display: flex;
        justify-content: space-around;
        p {
          margin: 0;
          padding: 0;
          color: #fff;
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
    background: #161618;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      p {
        color: #dcbf88;
        font-size: 16px;
        font-weight: bold;
      }
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
      background: #cdaa6f;
      color: #fff;
      border: none;
    }
  }
}
.kjRecord {
  height: 100%;

  width: 100%;

  .kjRecord-content {
    width: 100%;
    position: fixed;
    top: 15%;
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
  height: 400px;
  background: transparent;
  padding: 15px;
  box-sizing: border-box;
  .pops {
    background: #cdaa6f;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      align-self: flex-end;
      border: none;

    }
    .pop-title {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      background: #48382b;
      height: 30px;
      align-items: center;
      color: #fff;
      font-size: 15px;
    }
    .pop-content {
      li {
        display: flex;
        font-size: 12px;
        color: #fff;
        justify-content: space-around;
        text-align: center;
        border-bottom: 1px solid #48382b;

        span {
          display: inline-block;
          flex: 1;
          border-right: 1px solid #48382b;
          box-sizing: border-box;
          padding-bottom: 3px;
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
// 倒计时颜色
.van-count-down {
  color: #f00;
}
</style>