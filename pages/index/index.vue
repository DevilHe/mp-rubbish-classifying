<template>
	<view class="page-bg">
    <view class="header-modular" v-if="now">
	    <image class="bg-wave" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/bg_wave.gif"></image>
      <view class="row">
        <view class="row location-wrap" bindtap="selectLocation">
          <image class="icon" src="/static/icon_location.png"></image>
          <!-- 市-区县 -->
          <view class="title">
            <span class="title-city">{{city}}</span>{{county}}</view>
        </view>
      </view>
      <view class="row">
        <image class="icon-weather" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/{{now.icon}}.png"></image>
        <!-- 天气状况 气温 -->
        <view class="tmp">{{now.text}} {{now.temp}}°C</view>
        <view class="today">{{today}}</view>
      </view>
      <view class="tips-wrap">
        <!-- 风向 级数 -->
        <view class="tips ">{{now.windDir}} {{now.windScale}}级</view>
        <view class="tips ">湿度 {{now.humidity}}%</view>
        <view class="tips ">气压 {{now.pressure}}Pa</view>
      </view>
    </view>
    <!-- <view class="card-modular " wx:if="{{hourly}}">
      <view class="title">24小时预报</view>
        <view class="card-wrap">
          <block wx:for="{{hourly}}" wx:key="index">
            <view class="item hourly">
              <view class="text-gray">{{item.time}}</view>
              <image class="icon" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/{{item.icon}}.png"></image>
              <view class="text-primary mb-32">{{item.temp}}°</view>
              <view>{{item.windDir}}</view>
              <view class="text-gray">{{item.windScale}}级</view>
            </view>
          </block>
        </view>
      </view>
    <view class="card-modular" wx:if="{{daily}}">
      <view class="title">7天预报</view>
      <view class="card-wrap">
        <block wx:for="{{daily}}" wx:key="index">
          <view class="item daily">
            <view>{{item.dateToString}}</view>
            <view class="text-gray">{{item.date}}</view>
            <image class="icon" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/{{item.iconDay}}.png"></image>
            <view class="text-primary ">{{item.tempMin}}°~{{item.tempMax}}°</view>
            <image class="icon" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/{{item.iconNight}}.png"></image>
            <view>{{item.windDirDay}}</view>
            <view class="text-gray">{{item.windScaleDay}}级</view>
          </view>
        </block>
      </view>
    </view> -->

    <view class="page-section-spacing bg-blue">
      <view class="flex-wrp" style="flex-direction:row;">
        <view class="flex-item">天气预报</view>
        <view class="flex-item flex-item-m" style="display: none">垃圾查询</view>
        <view class="flex-item" style="display: none">计算</view>
      </view>
    </view>
    <view>
      <swiper indicator-dots circular autoplay interval=4000 style="height: 200px;margin: 0 0 16px;">
				<swiper-item v-for="(item,index) in swipers" :key="index">
					<image :src="item" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
    </view>

    <!-- <view class="nav-list">
      <view class="nav-li bg-blue">
        <view class="nav-title" @click="btnWeatherForecast">天气预报</view>
      </view>
    </view> -->
    

    <!-- <view style="width: 100%;padding:10px 20px;">
			<button @click="btnWeatherForecast">天气预报</button>
		</view> -->
		<!-- <view style="width: 100%;padding:10px 20px;">
			<button @click="refuseClassification">垃圾分类</button>
		</view>
		<view style="width: 100%;padding:10px 20px;">
			<button @click="calculation">计算</button>
		</view> -->
  </view>
</template>

<script>
const APIKEY = "39b6004a20904e2da4f117a3dca5018d";// 和风天气申请的KEY
export default {
  data() {
    return {
      location: '', // 位置
      city: '', // 市
      county: '', // 区县
      now: '', // 实时天气信息
      today: '',
      swipers: [], // 轮播图
    }
  },
  onLoad() {
    this.swipers=["/static/carousel-img1.jpg", "/static/carousel-img2.jpeg", "/static/carousel-img3.jpg"];
    
    this.getLocation();
	},
  methods: {
    // 天气预报
    btnWeatherForecast() {

    },

    //选择定位
    // selectLocation() {
    //   var that = this
    //   wx.chooseLocation({
    //     success(res) {
    //       //console.log(res)
    //       that.setData({
    //         location: res.longitude + "," + res.latitude
    //       })
    //       that.getWeather()
    //       that.getCityByLoaction()
    //     }
    //     , fail() {
    //       wx.getLocation({
    //         type: 'gcj02',
    //         fail() {
    //           wx.showModal({
    //             title: '获取地图位置失败',
    //             content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
    //             success(mRes) {
    //               if (mRes.confirm) {
    //                 wx.openSetting({
    //                   success: function (data) {
    //                     if (data.authSetting["scope.userLocation"] === true) {
    //                       that.selectLocation()
    //                     } else {
    //                       wx.showToast({
    //                         title: '授权失败',
    //                         icon: 'none',
    //                         duration: 1000
    //                       })
    //                     }
    //                   }, fail(err) {
    //                     console.log(err)
    //                     wx.showToast({
    //                       title: '唤起设置页失败，请手动打开',
    //                       icon: 'none',
    //                       duration: 1000
    //                     })
    //                   }
    //                 })
    //               }
    //             }
    //           })
    //         }
    //       })

    //     }
    //   })
    // },
    /**
     * 获取定位
     */
    getLocation() {
      var that = this
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          // longitude-经度，latitude-纬度
          that.location = res.longitude + "," + res.latitude;
          // console.log('地理位置', res)
          that.getWeather()
          that.getCityByLoaction()
        }, fail(err) {
          wx.showModal({
            title: '获取定位信息失败',
            content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
            success(mRes) {
              if (mRes.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.getLocation()
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                      // 北京
                      that.location = "116.41,39.92"
                      // that.getWeather()
                      // that.getCityByLoaction()
                    }
                  }, fail(err) {
                    console.log(err)
                    wx.showToast({
                      title: '唤起设置页失败，请手动打开',
                      icon: 'none',
                      duration: 1000
                    })
                    that.location = "116.41,39.92";
                    // that.getWeather()
                    // that.getCityByLoaction()
                  }
                })
              } else if (mRes.cancel) {
                that.location = "116.41,39.92"
                // that.getWeather()
                // that.getCityByLoaction()
              }
            }
          })
        }
      })
    },
    /**
     * 根据坐标获取城市信息
     */
    getCityByLoaction() {
      var that = this
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          if (res.code == "200") {
            var data = res.location[0];
            that.city = data.adm2;
            that.county = data.name;
            // console.log('市县',res)
          } else {
            wx.showToast({
              title: '获取城市信息失败',
              icon: 'none'
            })
          }

        }
      })
    },
    /**
     * 获取天气
     */
    getWeather() {
      var that = this
      // wx.showLoading({
      //   title: '加载中',
      // })
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          that.now = res.now
          // console.log('实时天气',result)
          that.today = that.getDateInfo(new Date(that.now.obsTime));
        }
      })
      return
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/24h?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          //console.log(res)
          res.hourly.forEach(function (item) {
            item.time = that.formatTime(new Date(item.fxTime)).hourly
          })
          // that.setData({
          //   hourly: res.hourly
          // })
        }
      })
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/7d?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          //console.log(res)
          res.daily.forEach(function (item) {
            item.date = that.formatTime(new Date(item.fxDate)).daily
            item.dateToString = that.formatTime(new Date(item.fxDate)).dailyToString
          })
          // that.setData({
          //   daily: res.daily
          // })
          wx.hideLoading()
        }
      })
    },
    // 获取日期
    getDateInfo(date) {
      return require("../../utils/util").getDateInfo(date);
    },
    // 格式时间
    formatTime(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
      const isToday = date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
      return {
        hourly: [hour, minute].map(this.formatNumber).join(":"),
        daily: [month, day].map(this.formatNumber).join("-"),
        dailyToString: isToday ? "今天" : weekArray[date.getDay()]
      }
    },
    // 补零
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // // 垃圾分类查询
    // refuseClassification() {
    //   // navigateTo失效
    //   uni.switchTab({
    //     url: '/pages/refuseClassification/refuseClassification'
    //   })
    // },
    // // 计算
    // calculation() {
    //   uni.switchTab({
    //     url: '/pages/calculation/calculation'
    //   })
    // },
  }
}
</script>

<style>
.row {
  display: flex;
  align-items: center;
}
.mb-32{
  margin-bottom: 32rpx;
}
.header-modular {
  height: 400rpx;
  background-color: #64C8FA;
  background: linear-gradient(to bottom, #56CCF2, #2F80ED);
  position: relative;
  padding: 30rpx;
}
.header-modular .bg-wave {
  width: 100vw;
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 120rpx;
  mix-blend-mode: screen;
}
.header-modular .title {
  font-size: 36rpx;
}
.header-modular .title .title-city {
  font-size: 60rpx;
  margin-right: 12rpx;
}
.header-modular .location-wrap {
  color: #ffffff;
  font-weight: bold;
  font-size: 36rpx;
}
.header-modular .location-wrap .icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 8rpx;
}
.header-modular .tmp {
  font-size: 70rpx;
  color: #ffffff;
  position: absolute;
  top: 70px;
  right: 12px;
}
.header-modular .today {
  font-size: 36rpx;
  color: #ffffff;
  position: absolute;
  top: 130px;
  right: 12px;
}
.header-modular .icon-weather {
  width: 200rpx;
  height: 200rpx;
}
.header-modular .tips-wrap {
  display: flex;
  justify-content: space-between;
}
.header-modular .tips {
  font-size: 28rpx;
  opacity: 0.8;
  color: #ffffff;
  flex: 1;
}
.header-modular .tips:nth-child(3) {
  text-align: right;
}
.header-modular .tips:nth-child(2) {
  text-align: center;
}
.card-modular {
  padding:0 30rpx;
  margin-top: 30rpx;
}
.card-modular>.title {
  font-size: 40rpx;
  font-weight: bold;
  position: relative;
  margin-left: 14rpx;
  margin-bottom: 16rpx;
}
.card-modular>.title::before {
  content: "";
  position: absolute;
  left: -14rpx;
  top: 10rpx;
  bottom: 10rpx;
  width: 8rpx;
  border-radius: 10rpx;
  background-color: #2F80ED;
}
.card-modular .card-wrap {
  width: 690rpx;
  border-radius: 18rpx;
  background-color: #ffffff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.2);
  overflow-x: auto;
  white-space: nowrap;
}
.card-modular .card-wrap .item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-size: 28rpx;
  padding: 18rpx 0;
}
.card-modular .card-wrap .item.hourly{
  width: 138rpx;
} 
.card-modular .card-wrap .item.daily{
  width: 172.5rpx;
}
.card-modular .card-wrap .item .icon {
  width: 60rpx;
  height: 60rpx;
  margin: 64rpx 0;
}
.card-modular .card-wrap .item .text-gray {
  color: gray;
}
.card-modular .card-wrap .item .text-primary {
  color: #2F80ED;
}
.page-section-spacing {
  opacity: 0.7;
}
.page-section-spacing .flex-wrp .flex-item {
  display: inline-block;
  width: 33%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
}
.page-section-spacing .flex-wrp .flex-item.flex-item-m {
  width: 34%;
}
</style>
