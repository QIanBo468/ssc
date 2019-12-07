<template>
  <div class="my_address">
    <titlebar title="地址簿" right='添加地址' url='newAddress'></titlebar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="get_address">
      <van-swipe-cell :on-close="onClose" v-for="(item,index) in list" :key="index">
        <div class="address_list"  @click="employ(item)">
          <!--<img :src="item.auther" alt="">-->
          <div class="list_address">
            <span>姓名：{{item.name}}</span>
            <span>地址钱包：{{item.address}}</span>
          </div>
          <!-- <input type="radio" name="radios" :value="1" v-model="param" /> -->
        </div>
        <template slot="right">
          <van-button square type="danger" text="立即删除" @click="deletes(item.id)" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

import { Dialog } from "vant";

export default {
  components: {
    titlebar
  },
   data () {
    return {
      // list: ''
      lastId: '',
      page: 1,
      loading: false,
      finished: false,
      list: [
      ]
      // param: '1'
    }
  },
   methods: {
     employ(item) {
         Dialog.confirm({
          confirmButtonColor: "#ffdd00",
          cancelButtonColor: "#cdaa6f",
          // title: "标题",
          message: "是否使用当前地址"
        })
          .then(() => {
            window.console.log(item)
            this.$router.push({path:'deposit',query:{address: item.address}})
          })
          .catch(() => {});
     },
    onClickLeft () {
      this.$router.go(-1)
    },
    deletes (id) {
      this.$dialog
        .confirm({
          title: '',
          message: '确认删除此地址？'
        })
        .then(() => {
          // 确定
          this.$axios.fetchPost('/portal/Digiccy', {
            interface: '1004',
            module: 'Address',
            source: 'web',
            version: 'v1',
            data: {
              id: id
            }
          })
            .then(res => {
              window.console.log(res)
              if (res.code == 0) {
                this.$toast(res.message)
                this.lastId = 0;
                this.page = 1;
                this.get_address()
                this.$router.go(0)
              }
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    // clickPosition 表示关闭时点击的位置
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          break
      }
    },
    onClickRight () {
      this.$router.push('newAddress')
    },
    get_address () {

      var lastid = ''
      if (this.lastId) {
        lastid = this.lastId
      } else {
        lastid = 0
      }
      var page = this.page++
      setTimeout(() => {
        this.$axios
          .fetchPost('/portal/Digiccy', {
            interface: '1000',
            module: 'Address',
            source: 'web',
            version: 'v1',
            data: {
              lastId: lastid,
              page: page,
            }
          })
          .then(res => {
            window.console.log('我的地址', res)
            this.lastId = res.data.lastId
            if (res.code == 0) {
              if (res.data.list.length == 0) {
                this.finished = true
              } else {
                var ret = res.data.list
                if (page == 1) {
                  this.list = ret
                } else {
                  for (var x in ret) {
                    this.list.push(ret[x])
                  }
                }
              }
            } else {
              this.finished = true
            }
            this.loading = false
          })
      }, 500)
    }
  },
  created () {
   // this.get_address()
  }
};
</script>

<style lang='less' scope>

.van-button--danger{   /*滑块的颜色 */
  background: #EC5218;
  height: 100%;
}
.my_address {
  height: 100vh;
}
.address_list {
  padding: 15px;
  background: #AF53D1;
  
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.address_list > img{
  width: 33px;
  height: 33px;
  margin-right: 5px;
}
.list_address {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.list_address > span:nth-child(1) {
 color: #ffffff;
  font-size: 15px;
}
.list_address > span:nth-child(2) {
  color: #ffffff;
  font-size: 13px;
  margin-top: 5px;
}
// .my_address >>> .van-button--normal {
//   height: 100%;
// }
.van-button__text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>