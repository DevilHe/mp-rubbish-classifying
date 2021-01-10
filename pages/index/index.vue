<template>
	<view>
    <view>
      <swiper indicator-dots circular autoplay interval=4000 style="height: 200px;margin-bottom: 16px;">
				<swiper-item v-for="(item,index) in swipers" :key="index">
					<image :src="item" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
    </view>
		<view style="width: 100%;padding:10px 20px;">
			<button @click="refuseClassification">垃圾分类</button>
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
      swipers: []
    }
  },
  onLoad() {
		this.swipers=["/static/carousel-img1.jpg", "/static/carousel-img2.jpeg", "/static/carousel-img3.jpg"];
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