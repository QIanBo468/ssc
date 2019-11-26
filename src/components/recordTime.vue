<template>
  <div class="recodTime">
    <h3>{{title}}</h3>
    <div class="date">
      <van-cell-group class="timestamp">
        <van-field readonly v-model="start" placeholder="选择起始时间" @click="timeShow(0)" />
      </van-cell-group>
      <img src="@/assets/iconfont-wodedingdan10.png" alt="">
      <van-cell-group class="timestamp">
        <van-field readonly v-model="end" placeholder="选择结束时间" @click="timeShow(1)" />
      </van-cell-group>
    </div>

    <van-popup position="bottom" v-model="show">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :max-date="maxDate"
        :min-date="minDate"
        :formatter="formatter"
        @confirm="confirms"
        @cancel="show = false"
      />

      <!-- <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
      />-->
    </van-popup>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type: String
    }
  },
  data() {
    return {
      start: "",
      end: "",
      show: false,
      showtype: null,
      minHour: 10,
      maxHour: 60,
      minDate: new Date(2009, 12, 1),
      maxDate: new Date(),
      currentDate: new Date()
    };
  },
  methods: {
    formatter(type, value) {
      switch (type) {
        case "year":
          value = `${value}年`;
          break;
        case "month":
          value = `${value}月`;
          break;
        case "day":
          value = `${value}日`;
          break;
        case "hour":
          value = `${value}时`;
          break;
        case "minute":
          value = `${value}分`;
          break;
      }
      return value;
    },
    timeShow(type) {
      this.show = true;
      this.showtype = type;
    },
    confirms(value) {
      let date = value;
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      if (this.showtype == 0) {
        this.start = y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
        this.minDate = value
      } else {
        this.end = y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }

      this.show = false;
      // console.log(date)
    }
  }
};
</script>

<style lang='less' scope>
.recodTime {
  h3 {
    color: #fff;
    margin: 1rem 0 .5rem 1rem;
  }
  .date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
    box-sizing: border-box;
    img{
      width: 1.5rem;
      height: 1.5rem;
    }
    .timestamp {
      border: 1px solid #eee;
    }
  }
  input{
    font-size: .9rem;
  }
}
</style>