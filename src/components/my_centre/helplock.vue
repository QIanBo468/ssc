<template>
  <div class="helplock">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="帮助记录">帮助记录</slot>
    </van-nav-bar>

    <van-tabs
      class="helptab"
      type="card"
      background="none"
      title-active-color="#000"
      color="#F2C684"
    >
      <van-tab title="提供帮助">
        <div class="help-content" v-for="item of usestate" :key="item.id">
          <div class="cont-top">
            <img class="arrow" width="80px" height="80px" src="../../../static/images/14x.png" alt />
            <div class="cont-left">
              <img width="58px" height="58px" :src="item.oneimg" alt />
              <div class="seter">
                <div>
                  <div class="g"></div>
                  <span>{{item.useone}}</span>
                </div>
                <div class="clear">
                  <div class="g"></div>
                  <span>{{item.onephone}}</span>
                </div>
              </div>
            </div>
            <div class="cont-right">
              <img width="58px" height="58px" :src="item.twoimg" alt />
              <div class="seter">
                <div>
                  <span>{{item.usetwo}}</span>
                  <div class="g"></div>
                </div>
                <div class="clear">
                  <span>{{item.twophone}}</span>
                  <div class="g"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cont-bottom">
            <div class="useid">
              <p>打款时间: {{item.dakuan}}</p>
              <div class="danhaotime">
                <div>单号：{{item.danhao}}</div>
                <div>{{item.time}}</div>
              </div>
            </div>
            <div class="state">
              <div :class="[item.way == '已付款'? 'blue' : 'red']">{{item.way}}</div>
              <div>详细资料</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="接受帮助">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usestate: [
        {
          id: 0,
          useone: "小太阳",
          onephone: 1581001247,
          usetwo: "王的人",
          twophone: 1234567895,
          oneimg: "./static/images/17.png",
          twoimg: "./static/images/17-s.png",
          dakuan: "0天08:20:20",
          danhao: "20181028123456",
          time: "2018-10-27 18:18:18",
          way: "已付款"
        },
        {
          id: 1,
          useone: "小太阳",
          onephone: 1581001247,
          usetwo: "王的人",
          twophone: 1234567895,
          oneimg: "./static/images/17.png",
          twoimg: "./static/images/17-s.png",
          dakuan: "0天08:20:20",
          danhao: "20181028123456",
          time: "2018-10-27 18:18:18",
          way: "未付款"
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
        this.$router.go(-1)
    }
  }
};
</script>

<style lang='less' scope>
.helplock {
  padding: 0 11px;
}
// 内容样式
.van-tabs__content {
  width: 100%;
}
.help-content {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .cont-top {
    width: 100%;
    height: 100px;
    position: relative;

    display: flex;
    .arrow {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      margin: auto;
      z-index: 9;
    }
    .cont-left {
      margin-right: 10px;
      width: 50%;
      position: relative;
      background: #1c1c51;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: space-around;
      border-radius: 3px;
      img {
        position: absolute;
        top: -27px;
        left: 8px;
      }
      .g {
        width: 2px;
        height: 8px;
        background: #ffddaa;
        margin-right: 10.5px;
      }

      .seter {
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        div {
          font-size: 14px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .clear {
          margin-top: 16px;
        }
      }
    }
    .cont-right {
      width: 50%;
      position: relative;
      background: #1c1c51;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: space-around;
      border-radius: 3px;
      align-items: flex-end;
      img {
        position: absolute;
        top: -27px;
        right: 8px;
      }
      .g {
        width: 2px;
        height: 8px;
        background: #ffddaa;
        margin-left: 10.5px;
      }
      .seter {
        padding-top: 16px;
        display: flex;
        flex-direction: column;

        div {
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          //   margin-top: 16px;
        }
        .clear {
          margin-top: 16px;
        }
      }
    }
  }
  .cont-bottom{
      background: #1c1c51;
      width: 100%;
      margin-top: 2px;
      border-radius: 4px;
      display: flex;
      height: 78px;
      padding: 14px 9px;
      box-sizing: border-box;
      .useid{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          p{
              font-size: 12px;
              margin: 0;
              padding: 0;
              color: #fff;
          }
          .danhaotime{
              div:first-child{
                  color: #ffddaa;
                  font-size: 12px;
                  margin-top: 14px;
              }
              div:last-child{
                  color: #fff;
                  font-size: 12px;
              }
          }
      }
      .state{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          div{
            width: 60px;
            height: 25px;
            border-radius: 12.5px; 
            background: #ffddaa;
            font-size: 12px;
            text-align: center;
            line-height: 25px;
            color: #0B0B1F;
          }
          .red{
              background:#f00;
          }
          .blue{
              background: aqua;
          }
      }
  }
}

// tab 样式
.helptab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.van-tab {
  border: none !important;
}
.van-tabs--card > .van-tabs__wrap {
  width: 200px;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  border-radius: 15px;
}
.van-tabs__nav--card {
  border-radius: 15px;
  border: 1px solid #000;
}

.jhnav {
  background: none;
  margin-bottom: 10px;
  .van-nav-bar__title {
    color: #ffddaa;
  }
}
[class*="van-hairline"]::after {
  border: none;
}
.van-hairline--bottom::after {
  border: none;
}
</style>