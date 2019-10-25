<template>
  <div class="my_index">
    <van-nav-bar class="mi_nav" title="我的"></van-nav-bar>
    <div class="usetitle">
      <div class="useatuo">
        <img :src="usexg.auther" width="53px" height="53px" alt />
        <div class="usename">
          <span>{{usexg.name}}</span>
          <p>用户编号:{{usexg.bianhao}}</p>
        </div>
      </div>
      <div class="active">{{usexg.active}}</div>
    </div>
    <div class="indexitem">
      <span>资料管理</span>
      <van-grid :border="false" :column-num="3" class="ziliaoicon">
        <van-grid-item  text="资料查看">
          <van-image  width="30px" src="../../../static/my_index/Folder@3x.png" />
          资料查看
        </van-grid-item>
        <van-grid-item to="/mydata">
          <van-image width="30px" src="../../../static/my_index/Folder@3x.png" />
          资料修改
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/lock_2@3x.png" />
          密码修改
        </van-grid-item>
      </van-grid>
    </div>
    <div class="indexitem">
          <span>我的钱包</span>
      <van-grid :border="false" :column-num="5" class="ziliaoicon">
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/Ways_of_payment@3x.png" />
          排单币
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/Purse@3x.png" />
          动态钱包
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/Purse@3x.png" />
          静态钱包
        </van-grid-item>
        <van-grid-item >
          <van-image width="30px" src="../../../static/my_index/Сalendar@3x.png" />
          激活码管理
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/Page@3x.png" />
          帮助
        </van-grid-item>
      </van-grid>
    </div>
    <div class="indexitem">
          <span>财务管理</span>
      <van-grid :border="false" :column-num="4" class="ziliaoicon">
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/Ways_of_payment@3x.png" />
          财务明细
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/15@3x.png" />
          我的奖励
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/16@3x.png" />
          推荐奖励
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/Purse@3x.png" />
          激活码转账
        </van-grid-item>
      </van-grid>
    </div>
    <div class="indexitem">
          <span>其他项目</span>
      <van-grid :border="false" :column-num="3" class="ziliaoicon">
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/18@3x.png" />
          团队管理
        </van-grid-item>
        <van-grid-item>
          <van-image width="30px" src="../../../static/my_index/17@3x.png" />
          推广二维码
        </van-grid-item>
        <van-grid-item to="/gonggao">
          <van-image width="30px" src="../../../static/my_index/19@3x.png" />
          公告
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usexg: {
        name: "大林子",
        bianhao: 1234567,
        active: "会员",
        auther: "./static/my_index/auther.png"
      }
    };
  }
};
</script>

<style lang='less' scope>
.my_index {
  padding: 0 11px;
  .mi_nav {
    background: transparent;
    .van-nav-bar__title {
      color: #ffddaa;
    }
  }
  .usetitle {
    height: 80px;
    background: #ffddaa;
    border-radius: 3px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .useatuo {
      display: flex;
      align-items: center;
      height: 100%;
      .usename {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 53px;
        p {
          padding: 0;
          margin: 0;
          font-size: 12px;
          color: #0b0b1f;
        }
        span {
          padding: 0;
          margin: 0;
          font-size: 16px;
          color: #0b0b1f;
        }
      }
    }
    .active {
      background: #0b0b1f;
      border-top-left-radius: 13px;
      border-bottom-left-radius: 13px;
      color: #ffddaa;
      text-align: center;
      font-size: 12px;
      padding: 6px 12px;
    }
  }
  .indexitem {
    color: #ffddaa;
    span{
      color: #ffddaa;
      display: inline-block;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .ziliaoicon {
      border: 0.5px solid #ffddaa;
      height: 80px;
    }
    .van-grid-item__content {
      background: transparent;
      font-size: 8px;
      box-sizing: border-box;
      padding: 0;
    }
  }
}
</style>