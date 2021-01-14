<template>
	<view class="page-bg" style="background: #fff;">
		<view class="header-search" style="position: relative;background: #fff;">
			<span style="position:absolute;top:5px;left:16px;border-right:1px solid #ccc;padding-right: 8px;z-index: 999;">
				<image src="/static/camera.png" style="width: 36px;height:36px;" @click="btnSearch('1')"></image>
			</span>
			<input class="search-input" @focus="btnSearch()" placeholder="输入关键字或点击拍照按钮查询" type="text" style="position:relative;margin:0;padding: 12px 110px 12px 70px;border-radius:24px;border-color:#f37b1d;" />
			<button type="default" @click="btnSearch()" style="width: 80px;position: absolute;top: 1px;right: 1px;border-radius: 24px;background-color: #f37b1d;color: #fff;">搜索</button>
		</view>

    <view class="rubbish-header" @click="btnDesc">
      <view class="header-desc" style="position: relative;font-size: 18px;">
        <view style="color: #0a6;position: absolute;top: 106px;right: 40px;">厨余垃圾(湿垃圾)</view>
        <view style="color: #00f;position: absolute;top: 136px;right: 40px;">可回收物(可回收垃圾)</view>
        <view style="color: #9c9c9c;position: absolute;top: 166px;right: 40px;">其他垃圾(干垃圾)</view>
        <view style="color: #f00;position: absolute;top: 196px;right: 40px;">有害垃圾(有害垃圾)</view>
      </view>
    </view>

    <view class="rubbish-fl" style="width: 100%;padding:10px 20px;">
      <view class="rubbish-fl-w" style="width: 100%;border:1px solid #f37b1d;border-radius: 10px;padding:10px;margin-top: 6px;font-size: 14px;">
        <view style="font-size: 20px;">小窍门:</view>
        <view>猪能吃的...是<span style="color: #0a6;font-size: 18px;margin-left: 4px;">湿垃圾</span></view>
        <view>猪都不吃的...是<span style="color: #9c9c9c;font-size: 18px;margin-left: 4px;">干垃圾</span></view>
        <view>猪吃了会死的...是<span style="color: #f00;font-size: 18px;margin-left: 4px;">有害垃圾</span></view>
        <view>可以卖了换猪的...是<span style="color: #00f;font-size: 18px;margin-left: 4px;">可回收垃圾</span></view>
        <view>多考虑下猪<span style="color: #cd853f;font-size: 24px;">*(^o^)*</span>，垃圾就能分对了~</view>
        <image src="/static/pig.jpeg" style="width: 100%;" @click="btnSearch('1')"></image>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
      return {}
    },
		onLoad() {},
		methods: {
			// 搜索
			btnSearch(phone) {
				uni.navigateTo({
					url: '/pages/refuseClassification/refuseClassification?phone=' + phone
				})
      },
      // 垃圾分类说明
			btnDesc() {
				uni.navigateTo({
					url: '/pages/refuseClassificationDesc/refuseClassificationDesc'
				})
			},
		}
	}
</script>
<style >
.rubbish-header {
	background-image: url(/static/rubbish-bg.jpg);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 280px;
}
.search-input {
	margin: 12px 0 0;
	border: 1px solid #333;
	padding: 8px;
	padding-right: 48px;
	border-radius: 6px;
}
.rubbish-fl .rubbish-fl-w view {
  margin-bottom: 12px;
}
</style>
