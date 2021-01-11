<template>
  <view class="page-bg">
    <view class="nav-list">
      <view class="nav-li bg-red">
        <view class="nav-title" @click="toLoan">贷款计算器</view>
      </view>
      <view class="nav-li bg-orange">
        <view class="nav-title">敬请期待</view>
      </view>
      <!-- <view class="nav-li bg-orange">
        <view class="nav-title" @click="toLoan">more</view>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    // 贷款计算器跳转
    toLoan() {
      uni.navigateTo({
        url: '/pages/loan/loan'
      })
    }
  }
}
</script>
