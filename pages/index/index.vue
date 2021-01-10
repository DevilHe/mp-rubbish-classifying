<template>
	<view>
		<view style="width: 100%;padding:10px 20px;">
			<button @click="refuseClassification">垃圾分类查询</button>
		</view>
		<view style="width: 100%;padding:10px 20px;">
			<button @click="calculation">计算</button>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  onLoad() {

  },
  methods: {
    // 垃圾分类查询
    refuseClassification() {
      // navigateTo失效
      uni.switchTab({
        url: '/pages/refuseClassification/refuseClassification'
      })
    },
    // 计算
    calculation() {
      uni.switchTab({
        url: '/pages/calculation/calculation'
      })
    },
  }
}
</script>

<style >
view{
  box-sizing: border-box;
}
</style>