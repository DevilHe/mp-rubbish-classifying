<template>
  <view class="page-bg">
    <view class="margin-sm padding-sm bg-white radius shadow shadow-lg text-xl">
      <view class="cu-form-group margin-top mc-bg-main">
        <view class="title">{{config.type}}</view>
        <radio-group class="flex" @change="radioChange">
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in types" :key="item.value">
            <view>
              <radio :value="item.value" :checked="index === type" />
              <text>{{item.name}}</text>
            </view>
          </label>
        </radio-group>
      </view>
      <view class="cu-form-group margin-top mc-bg-main">
        <view class="title">{{config.total}}</view>
        <input placeholder="请输入贷款总额" type="digit" v-model="total" @input="inputChange" />
        <text>元</text>
      </view>
      <view class="cu-form-group margin-top mc-bg-main">
        <view class="title">{{config.month}}</view>
        <input placeholder="请输入贷款时长" type="number" v-model="month" @input="inputChange" />
        <text>月</text>
      </view>
      <view class="cu-form-group margin-top mc-bg-main">
        <view class="title">{{config.rate}}</view>
        <input placeholder="请输入贷款年利率" type="digit" v-model="rate" @input="inputChange" />
        <text>%</text>
      </view>
      <view class=" padding margin-top-lg">
        <button @click="didStart" class="cu-btn block radius bg-green text-xl">
        开始计算
      </button>
      </view>
    </view>
    <view class="cu-load load-modal" v-if="loadModal">
      <image src="/static/loading.png"></image>
      <view class="gray-text">计算中...</view>
    </view>
    <view class="margin-sm padding-sm bg-white radius shadow shadow-lg text-xl" v-if="showResult">
      <view class="padding-sm margin-top mc-bg-main">
        还款总额：
        <span class="mc-highlight-text">
          {{transform(result.totalPrice)}}
        </span>
        元
      </view>
      <view class="padding-sm margin-top mc-bg-main">
        利息总额：
        <span class="mc-highlight-text">
          {{transform(result.interest)}}
        </span>
        元
      </view>
      <view class="padding-sm margin-top mc-bg-main" v-if="type==1">
        每月还款：
        <span class="mc-highlight-text">
          {{transform(result.per)}}
        </span>
        元
      </view>
      <view class="padding-sm margin-top mc-bg-main" v-if="type==0">
        首月还款：
        <span class="mc-highlight-text">
          {{transform(result.firstMonth)}}
        </span>
        元
      </view>
      <view class="table margin-top">
        <view class="tr bg-w">
          <view class="th th2">期数</view>
          <view class="th">还款额</view>
          <view class="th ">剩余金额</view>
        </view>
        <block v-for="(item, index) in result.monthArray" :key="index">
          <view class="tr bg-g" v-if="index%2==0">
            <view class="td td2">{{item.monthName}}</view>
            <view class="td">{{transform(item.curMoney)}}</view>
            <view class="td">{{transform(item.leftFund)}}</view>
          </view>
          <view class="tr" v-else>
            <view class="td td2">{{item.monthName}}</view>
            <view class="td">{{transform(item.curMoney)}}</view>
            <view class="td">{{transform(item.leftFund)}}</view>
          </view>
        </block>
        <view class="padding-sm">
          <button class="share-button" openType="share">分享</button>
        </view>
      </view>
    </view>
    <view style="padding: 0 20px 20px;">
      <view class="padding mc-tip-text item-content">
        <view class="mc-tip-title">贷款计算器说明：</view>
        <view>等额本金还款方式，每月还的本金一样，利息逐渐减少。</view>
        <view>等额本息还款方式，每月还款额一样。</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      types: [{
        value: '0',
        name: '等额本金',
        checked: 'true'
      },
      {
        value: '1',
        name: '等额本息'
      }],
      type: 0,
      total: "",
      month: "",
      rate: "",
      loadModal: false,
      showResult: false,
      config: {
          type: "还款方式",
          total: "贷款总额",
          month: "贷款时长",
          rate: "贷款年利率"
      },
      result: {}
    }
  },
  methods: {
    radioChange(evt) {
      this.showResult = false;
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].value === evt.target.value) {
          this.type = i;
          break;
        }
      }
    },
    inputChange() {
      this.showResult = false;
    },
    transform(num) {
      return require("../../utils/util").thousandBitSeparator(num);
    },
    // 计算
    didStart(a) {
      let o = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, n = new RegExp(o);
      if ("" != this.total && n.test(this.total)) if ("" != this.month && n.test(this.month)) if ("" != this.rate && n.test(this.rate)) {
        this.loadModal = true;
        setTimeout(() => {
          this.result = require("../../utils/calculator").loanCalculator(this.type, this.total, this.month, this.rate);
          this.loadModal = false;
          this.showResult = true;
        }, 1000)
      } else wx.showToast({
        title: "请先正确填写" + this.config.rate,
        icon: "none"
      }); else wx.showToast({
        title: "请先正确填写" + this.config.month,
        icon: "none"
      }); else wx.showToast({
        title: "请先正确填写" + this.config.total,
        icon: "none"
      });
    },
    // 分享
    onShareAppMessage: function() {
      return {
        title: "一款简单实用的贷款计算器，快来计算一下吧。",
        path: "/pages/loan/loan"
      };
    }
  }
}
</script>

<style>
.uni-list-cell {
  margin-left: 12px;
}
.table {
  border: 0 solid #a9a9a9;
}
.tr {
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
}
.td,.tr {
  justify-content: center;
}
.table .td {
  width: 40%;
  text-align: center;
}
.table .td2 {
  width: 20%;
}
.bg-w {
  background: snow;
}
.bg-g {
  background: #e6f3f9;
}
.table .th {
  width: 40%;
  justify-content: center;
  background: #afb2bb;
  color: #fff;
  display: flex;
  height: 3rem;
  align-items: center;
}
.table .th2 {
  width: 20%;
}
</style>
