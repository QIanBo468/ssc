<template>
  <div class="notice">
    <titlebar title="公告"></titlebar>
    <div class="notice-content">
      <h3>公告列表</h3>
      <ul>
        <li v-for="(item, index) of notice" :key="index">
          <div>
            <p>{{item.id}}</p>
            <p>
              <van-icon name="clock-o" />
              {{item.title}}
            </p>
          </div>
          <button @click="showPop(item)">查看</button>
        </li>
      </ul>
    </div>

    <van-popup class="pop" v-model="show">
      <div>
        <h3>{{noticeing.title}}</h3>
        <p v-html="noticeing.content"></p>
        <van-button class="showBtn" @click="show = false">关闭</van-button>
      </div>
    </van-popup>
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
      show: false,
      notice: [],
      noticeing:{

      }
    };
  },
  created() {
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "3000",
        data: {
          lastId: 0,
          page: 1
        }
      })
      .then(res => {
        if (res.code == 0) {
          this.notice = res.data.list;
        }
        
      });
  },
  methods: {
    showPop(item) {
      this.$axios.fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "3001",
        data: {
          id:item.id
        }
      }).then(res=>{
        this.noticeing = res.data
window.console.log(res);
      })
      this.show = true;
      this.shows = item;
    }
  }
};
</script>

<style lang='less' scope>
.notice {
  width: 100%;
  height: 100%;
  .notice-content {
    padding: 1rem;
    h3 {
      color: #AF53D1;
    }
    ul {
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        color: #fff;
        background: #AF53D1;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 8px;
        button {
          border: none;
          width: 5rem;
          height: 2rem;
          font-size: 0.8rem;
          background: #fff;
          border-radius: 8px;
          color: #333;
        }
        p {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .pop {
    width: 100%;
    height: 30rem;
    background: transparent;
    padding: 1rem;
    box-sizing: border-box;
    div {
      width: 100%;
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      h3 {
        color: #ff6600;
        font-size: 1.5rem;
      }
      p {
        background: #f8fafb;
        width: 100%;
        text-align: center;
        padding: 1rem;
        box-sizing: border-box;
        border: 1px solid #eee;
      }
      .showBtn {
        align-self: flex-end;
        margin-right: 2rem;
        background: #ff632c;
        color: #eee;
        border-radius: 6px;
      }
    }
  }
}
</style>