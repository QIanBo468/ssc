<template>
  <div class="downPour">
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
            <div class="qihaoimg">
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
      type: 0,
      jiang: {
        qihao: 741635,
        jinbi: "0.00",
        liushui: 0
      },
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
      number: [],
      sums: -1,
      temp: "",
      pitch: ["06", "04", "03", "02", "01", "05", "07", "08", "09", "10"]
    };
  },
  created() {
    let that = this,
      sum=0,
      temp;
    this.type = this.$route.query.type;
    console.log(this.type);
console.log(this.num);
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
    console.log(this.num);
  },


  methods: {
    finish() {
      console.log("时间结束");
    },
    xuanzhong(item) {
      let sum = 0;
      this.arry.forEach(e => {
        if (e.flg && sum <= 4) {
          sum += 1;
        }
        if (sum > 3 && !item.flg) {
          this.$toast("最多可选四个数");
          return;
        }
      });
      if (sum < 4) {
        item.flg = !item.flg;
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        console.log(a);
        if (a != -1) {
          this.number.splice(a, 1);
          console.log(this.number);
          return;
        } else {
          this.number.push(item);
          console.log(this.number);
          return;
        }
      }
      if ((sum = 4 && item.flg)) {
        item.flg = !item.flg;
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        if (a != -1) {
          this.number.splice(a, 1);
          console.log(this.number);
          return;
        }
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
      width: 110px;
      height: 78px;
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
        font-size: 15px;
        span {
          color: #ecc788;
        }
        .qihaoimg {
          font-size: 13px;
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
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
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
}

// 倒计时颜色
.van-count-down {
  color: #f00;
}
</style>