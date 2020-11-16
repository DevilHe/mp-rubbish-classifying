<template>
	<view class="content">
		<button @click="btnTakephoto" type="primary">从相册或拍照选择图片</button>
		<view>
			<image :src="imagepath" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagepath: ''
			}
		},
		onLoad() {

		},
		methods: {
			// 拆解需求
			// 1.从手机相册或拍照获得一张照片
			btnTakephoto() {
				uni.chooseImage({
					count:1,
					success:(res) => {
						console.log(res)
						this.imagepath = res.tempFilePaths[0]
					}
				})
			}
			// 2.图片转换格式
			// 3.调用百度图像识别API来识别图片
			// 4.展示图像识别的结果
			// 5.使用图片识别结果去查询垃圾所属分类，展示结果
			// 6.打包发布微信小程序，和IOS，android
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
