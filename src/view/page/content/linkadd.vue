<template>
  <div class="linkadd">
    <titlebar title="邀请好友"></titlebar>
    <van-tabs
      v-model="active"
      :border="false"
      background="transparent"
      color="#d3b787"
      title-inactive-color="#fff"
      title-active-color="#d3b787"
    >
      <van-tab title="推广设定">
        <div class="linkcontent">
          <button class="linkbtn" @click="submit">生成链接</button>
          <p>
            未满18周岁禁止购买
            <br />Copyright © LOTTERY |彩金彩| 版权所有
          </p>
        </div>
      </van-tab>
      <van-tab title="链接管理">
        <div class="linkcontent-link">
          <div>
            <p>编号</p>
            <p>操作</p>
          </div>
          <div>
            <p>{{link.num}}</p>
            <p>
              <span @click="showPop(0)">获取链接 |</span> 
              <span @click="showPop(1)">删除</span>
            </p>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show">
      <div class="clear" v-if="showlink">
        <div class="clear-header">
          <h3>删除注册链接</h3>
          <p @click="show = false">X</p>
        </div>
        <div class="clear-content">
          <p>上级用户:</p>
          <span>123123</span>
        </div>
        <div class="clear-content">
          <p>返点:</p>
          <span>0</span>
        </div>
        <div class="clear-content">
          <p>加入时间:</p>
          <span>2019-11-27</span>
        </div>
        <van-button class="clear-btn">确认删除</van-button>
      </div>
      <div class="clear" v-else>
        <div class="clear-header">
          <h3>获取注册链接</h3>
          <p @click="showPop">X</p>
        </div>
        <div class="clear-content">
          <p>上级用户:</p>
          <span>123</span>
        </div>
        <div class="clear-content">
          <p>推广链接:</p>
          <span>http://localhost:8080/#/linkadd</span>
        </div>
        <div class="clear-content">
          <p>操作:</p>
          <button class="contentbtn">复制</button>
        </div>
        <div class="clear-content">
          <p>推广链接:</p>
          <span>http://localhost:8080/#/linkadd111111111111111111111111111111</span>
        </div>
        <div class="clear-content">
          <p>操作:</p>
          <button class="contentbtn">复制</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import { Dialog } from "vant";
export default {
  components: {
    titlebar
  },
  data() {
    return {
      active: 0,
      show: false,
      showlink: false,
      link: {
        num: null,
        a: ""
      }
    };
  },
  methods: {
    submit() {
      if (this.link.num) {
        Dialog.alert({
          title: "提示",
          message: "链接已存在",
          confirmButtonColor: "#d3b787"
        }).then(() => {
          // on close
        });
      } else {
        this.link.num = 123;
        this.link.a = 123;
        Dialog.alert({
          title: "提示",
          message: "链接生成成功",
          confirmButtonColor: "#d3b787"
        }).then(() => {
          this.active = 1;

          window.console.log(this.active);
        });
      }
    },
    showPop(type) {

      this.show = !this.show;
      window.console.log(this.showlink)
      if( type == 1 ){
          this.showlink = true
      } else {
this.showlink = false
      }
    }
  }
};
</script>

<style lang='less' scope>
.linkadd {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.linkcontent {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #fff;
    text-align: center;
    margin-top: 8rem;
    font-size: 0.8rem;
  }
}
.linkbtn {
  //   background: transparent;
  border: none;
  background: #d3b787;
  width: 80%;
  margin-top: 6rem;
  height: 4rem;
  border-radius: 6px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
}
.linkcontent-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d3b787;
  margin-top: 1rem;
  padding: 0.5rem;
  div {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  p {
    flex: 1;
    color: #fff;
    text-align: center;
    margin: 0.5rem;
  }
}
.clear {
  width: 100%;
  display: flex;
  flex-direction: column;
  .clear-header {
    display: flex;
    justify-content: space-between;
    background: #d3b787;
    padding: 1rem;
    box-sizing: border-box;
  }
  .clear-content {
    display: flex;
    justify-content: space-between;

    padding: 1rem;
    box-sizing: border-box;

    span{
       width: 80%;
       text-align: center;
       overflow-x: auto;
       
    }
    .contentbtn{
        width: 4rem;
           border: none;
       }
  }
}
.van-dialog__message {
  font-size: 1rem;
}
.van-popup--center {
  width: 100%;
}
</style>