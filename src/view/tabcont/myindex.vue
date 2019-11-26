<template>
  <div class="myindex">
    <van-nav-bar title="我的" :border="false" />
    <div class="userdata">
      <div class="user">
        <div class="avatar">
          <img :src="user.avatar" alt />
          <div class="level">
            <span>{{user.name}}</span>
            <span>id: {{user.id}}</span>
          </div>
        </div>
        <div class="level">
          <span>级别</span>
          <span>VIP{{user.level}}</span>
        </div>
      </div>
      <!-- <div class="index-jindu"> -->
        <div class="jindu">
          <span>VIP{{user.level}}</span>
          <span>VIP{{user.level+1}}</span>
        </div>
        <van-progress stroke-width="8" track-color="#000" color="#ffc000" pivot-text :percentage="user.progress" />
        <p>距离升级还需要{{user.money}}流水</p>
      <!-- </div> -->
    </div>

    <div class="wallet">
      <div>
        <p>中心钱包</p>
        <span>￥{{wallet.zhongxin}}</span>
      </div>
      <div>
        <p>金币钱包</p>
        <span>￥{{wallet.jinbi}}</span>
      </div>
      <div>
        <p>盈利钱包</p>
        <span>￥{{wallet.yingli}}</span>
      </div>
      <div>
        <p>收益钱包</p>
        <span>￥{{wallet.shouyi}}</span>
      </div>

    </div>

    <div class="index-btn">
        <img src="@/assets/chongzhi.png" alt=""  @click="$router.push('charge')">
 
        <img src="@/assets/btn_change.png" @click="$router.push('edSwitch')" alt="">
    </div>
      <ul class="list">
        <li><router-link to=""><img src="@/assets/btn-1.png" alt=""></router-link></li>
        <li><router-link to="notice"><img src="@/assets/btn-2.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-3.png" alt=""></router-link></li>
        <li><router-link to="setting"><img src="@/assets/btn-4.png" alt=""></router-link></li>
        <li><router-link to="topUp"><img src="@/assets/btn-5.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-6.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-7.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-8.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-9.png" alt=""></router-link></li>
        <li><router-link to="addpople"><img src="@/assets/btn-10.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-11.png" alt=""></router-link></li>
        <li><router-link to=""><img src="@/assets/btn-12.png" alt=""></router-link></li>
      </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatar: require("../../assets/avatar.jpg"),
        name: "zhangsan",
        id: "5259",
        level: "0",
        money: 180000,
        progress: 50
      },
      wallet:{
        zhongxin:0.00,
        jinbi:111,
        yingli:222,
        shouyi:333
      }
    };
  }
};
</script>

<style lang='less' sceop>
.myindex {
  width: 100%;
  height: 100%;
  background: url(../../assets/myBg.jpg);
  .userdata {
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    .user {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .avatar {
        display: flex;
        img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid #ffc000;
        }
      }
    }
      .jindu {
        width: 80%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        span{
          color: #f2e5ca;
        }
      // }
    }
    p{
      color: #f2e5ca;
      font-size: 14px;
      text-align: center;
      margin: 0;
      padding: 0;
    }
  }
  .level {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 10px;
    span {
      font-size: 16px;
      color: #f2e5ca;
    }
  }
}

// 钱包
.wallet{
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-top: 1px solid #504339;
  border-bottom: 1px solid #504339;
  margin-top: 10px;
  div{
    width: 88px;
    height: 55px;
    background: url(../../assets/wallet_bg.png) no-repeat ;
    background-size: 88px 55px;
    p{
      font-size: 15px;
      margin: 0;
      padding: 0;
      color: #756142;
      text-align: center;
      margin-bottom: 10px;

    }
    span{
      display: block;
      font-size: 15px;
      color:#ffc000;
       text-align: center;
    }
  }
}

.index-btn{
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      img{
          width: 130px;
          height: 50px;
          margin-bottom: 20px;
      }
  }


.list{
  padding:0 27px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  justify-content: center;
  li{
    width: 4rem;
    height: 4rem;
    margin:0.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.van-progress{
  margin-top: 10px;
  width: 80%;
  border: 1px solid #f2e5ca;
  margin: 0 auto;
}

</style>