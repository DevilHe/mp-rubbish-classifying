<template>
	<view class="page-bg">
		<view class="header-search" style="position: relative;">
			<span style="position:absolute;top:5px;left:16px;border-right:1px solid #ccc;padding-right: 8px;z-index: 999;" @click="btnTakephoto">
				<image src="/static/camera.png" style="width: 36px;height:36px;"></image>
			</span>
			<input :focus="searchFocus" class="search-input" v-model="inputValue" @confirm="inputSearch" placeholder="输入关键字或点击拍照图标查询" type="text" style="position:relative;margin:0;padding: 12px 110px 12px 70px;border-radius:24px;border-color:#f37b1d;" />
			<button type="default" @click="inputSearch" style="width: 80px;position: absolute;top: 1px;right: 1px;border-radius: 24px;background-color: #f37b1d;color: #fff;">搜索</button>
		</view>

		<view style="width: 100%;padding:10px 20px;">
			<image v-if="imagepath" :src="imagepath" style="width: 100%;" mode="widthFix"></image>
			<view v-if="recResults.length>0" style="width: 100%;border:1px solid #f37b1d;border-radius: 10px;padding:10px;margin-top: 6px;">
				<view style="text-align: center;font-size: 14px;color: #666;">识别结果</view>
				<view style="text-align: center;height: 30px;line-height: 30px;">
					{{selectedName}}
				</view>
				<view v-if="searchResults">
					<view v-if="isPeople">
						就是你，人类，不讲武德，把地球变成了塑料地球！这好吗？这不好！人类，奉劝你耗子尾汁！
					</view>
					<view v-else>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
        inputValue: '',
				imagepath: '',
				recResults: [],
				searchResults: null,
				selectedName: '',
				isPeople: false,
				searchFocus: false
			}
		},
		onLoad(options) {
			if(options.phone === '1') {
				this.btnTakephoto();
			} else {
				this.searchFocus = true;
			}
		},
		methods: {
			// 拆解需求
			// 1.从手机相册或拍照获得一张照片
			btnTakephoto() {
				// 清空上次结果
				this.imagepath = '';
				this.recResults = [];
        // 清空搜索框
        this.inputValue = '';

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
				// 如果是APP（iOS，Android）时，使用HTML5+来调用原生文件读取方法
				// #ifdef APP-PLUS
				plus.io.resolveLocalFileSystemURL(
					path,
					(entry) => {
						entry.file((file) => {
							let reader = new plus.io.FileReader();
							reader.onloadend = async (e) => {
								const base64 = e.target.result.substr(22);
								const result = await this.imageClassify(base64);
								
								this.parseResults(result.result);
							};
							reader.readAsDataURL(file);
						});
					}
				);
				// #endif
				// #ifdef MP-WEIXIN
				wx.getFileSystemManager().readFile({
				  filePath: path, 
				  encoding: 'base64', 
				  success: async (res)=> { 
				    // console.log('res2', res)
						const result = await this.imageClassify(res.data);
						// this.parseResults(result.result);
				  }
				})
				// #endif
				// 如果非APP时（Web，小程序），则使用web端的方法来实现此功能
				// #ifdef H5
				uni.request({
					url:path,
					method: 'GET',
					responseType: 'arraybuffer',
					success: async (res) => {
						let base64 = uni.arrayBufferToBase64(res.data);
						const result = await this.imageClassify(base64);
						this.parseResults(result.result);
					}
				})
				// #endif
			},
			// 3.调用百度图像识别API来识别图片
			async imageClassify(b64) {
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
				this.isPeople = false;
        this.recResults = result;
				let itemList = [];
				let abs_result_index;
				for(let i=0;i<result.length;i++) {
					if(result[i].score > 0.7) {
						abs_result_index = i;
						if(result[i].root.indexOf('人物')>-1){
							this.isPeople = true;
						}
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
						if(result[res.tapIndex].root.indexOf('人物')>-1){
							this.isPeople = true;
						}
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
			},
      // 6.打包发布微信小程序，和IOS，android
      

      // 搜索关键字查询
      async inputSearch(e) {
				this.recResults = [];
				this.searchResults = null;
        this.imagepath = '';
        this.isPeople = false;
        // this.inputValue = e.detail.value;
        if(this.inputValue !== ''){
          this.recResults.push({
            keyword: this.inputValue,
            score: 1
          })
        }
        this.selectedName = this.inputValue;
        const searchRes = await this.searchKeyword(this.inputValue);
				this.searchResults = searchRes;
      }

		}
	}
</script>
<style >
.header-desc {
	width: 50%;
	padding: 10px 20px;
	position: absolute;
	top: 70px;
	right: 12px;
}
.header-desc button {
	background: #009900;
	color: #fff;
}
.search-input {
	margin: 12px 0 0;
	border: 1px solid #333;
	padding: 8px;
	padding-right: 48px;
	border-radius: 6px;
}
.header-input {
	width: 60%;
	padding: 10px 20px;
	position: absolute;
	top: 120px;
	right: 12px;
}
.header-input image {
	position: absolute;
	width: 48px;
	height: 48px;
	padding: 10px;
	top: 18px;
	right: 18px;
	z-index: 9999;
}
.header-input button {
	position: absolute;
	width: 24px;
	height: 24px;
	top: 30px;
	right: 60px;
}
.header-btn {
	width: 70%;
	padding: 10px 20px;
	position: absolute;
	top: 190px;
	right: 12px;
}
.header-btn button {
	background: #009900;
	color: #fff;
}
</style>
