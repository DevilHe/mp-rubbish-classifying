<template>
	<!-- <view class="content">
		<button @click="btnTakephoto" type="primary">从相册或拍照选择图片</button>
		<view>
			<image :src="imagepath" mode="widthFix"></image>
			<view>{{selectedName}}</view>
			<view v-if="searchResults">
				<view v-if="searchResults.matched" style="width: 100%;text-align: center;">{{searchResults.matched.typename}}</view>
				<view v-else style="font-size: 14px;">
					<view v-for="(item,index) in searchResults.similars" :key="index" style="display: flex;">
						<view style="flex: 1;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin-right: 20px;">{{item.keyword}}</view>
						<view>{{item.typename}}</view>
					</view>
				</view>
			</view>
		</view>
	</view> -->
	<view>
		<view style="width: 100%;padding:10px 20px;">
			<button @click="btnTakephoto">拍照或从相册选择一张照片</button>
		</view>
		<view style="width: 100%;padding:10px 20px;">
			<image :src="imagepath" style="width: 100%;" mode="widthFix"></image>
			<view v-if="recResults.length>0" style="width: 100%;border:1px solid #ccc;border-radius: 10px;padding:10px;">
				<view style="text-align: center;font-size: 14px;color: #999;">识别结果</view>
				<view style="text-align: center;height: 30px;line-height: 30px;">
					{{selectedName}}
				</view>
				<view v-if="searchResults">
					<view v-if="searchResults.matched" style="width: 100%;text-align: center;">{{searchResults.matched.typename}}</view>
					<view v-else style="font-size: 14px;">
						<view v-for="(item,index) in searchResults.similars" :key="index" style="display: flex;">
							<view style="flex: 1;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin-right: 20px;">{{item.keywords}}</view>
							<view>{{item.typename}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagepath: '',
				recResults: [],
				searchResults: null,
				selectedName: ''
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
						// console.log('res1', res)
						this.imagepath = res.tempFilePaths[0]
						this.image2base64(this.imagepath)
					}
				})
			},
			// 2.图片转换格式
			image2base64(path) {
				wx.getFileSystemManager().readFile({
					filePath: path,
					encoding: 'base64',
					success:(res) => {
						// console.log('res2', res)
						this.imageClassify(res.data)
					}
				})
			},
			// 3.调用百度图像识别API来识别图片
			async imageClassify(b64) {
				// // 百度图像识别地址http://ai.baidu.com/ai-doc/IMAGERECOGNITION/Xk3bcxe21
				// var [error, res] = await uni.request({
				// 	url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=wEQ0S6td9NFxFEzNIEWMfbnV&client_secret=6YH3CDGP8pwj8kIDA24l0tOC4VAfCQwG&'
				// })
				// // console.log('res3', res)

				// let access_token = res.data.access_token
				// // console.log('access_token' ,access_token)

				// var [error, res] = await uni.request({
				// 	url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
				// 	header: {
				// 		'Content-Type':	'application/x-www-form-urlencoded'
				// 	},
				// 	method: 'POST',
				// 	data: {
				// 		access_token: access_token,
				// 		image: b64
				// 	}
				// })
				// console.log('res4', res)
				// this.parseResults(res.data.result)

				// 改为云函数
				uniCloud.callFunction({
					name: 'ImageClassify',
					data: {
						image: b64
					},
					success: (res) => {
						// console.log('res4', res)
						this.parseResults(res.result.result)
					}
				})
			},
			// 4.展示图像识别的结果
			parseResults(result) {
				this.recResults = result;
				let itemList = [];
				let abs_result_index;
				for(let i=0;i<result.length;i++) {
					if(result[i].score > 0.7) {
						abs_result_index = i;
						break;
					}
					itemList.push(result[i].keyword+''+result[i].score);
				}
				if(abs_result_index >= 0) {
					this.selectRecResult(abs_result_index)
					return;
				}

				// 底部弹出抽屉菜单
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						// console.log('res5', res)
						this.selectRecResult(res.tapIndex);
					}
				})
			},
			// 5.使用图片识别结果去查询垃圾所属分类，展示结果
			async selectRecResult(index) {
				this.selectedName = this.recResults[index].keyword;
				// console.log(this.selectedName)

				const searchRes = await this.searchKeyword(this.selectedName);
				this.searchResults = searchRes;
			},
			searchKeyword(kw) {
				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						name: 'TrashClassify',
						data: {
							keyword: kw
						},
						success: (res) => {
							// console.log(res)
							resolve(res.result);
						}
					})
				})
			}
			// 6.打包发布微信小程序，和IOS，android
		}
	}
</script>
<style >
	view{
		box-sizing: border-box;
	}
	/* .content {
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
	} */
</style>
