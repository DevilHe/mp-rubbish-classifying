<template>
	<view class="page-bg" style="padding-bottom: 24px;">
    <view class="header-modular" v-if="now">
	    <image class="bg-wave" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/bg_wave.gif"></image>
      <view class="row">
        <view class="row location-wrap" @click="selectLocation">
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

    <view class="card-modular " v-if="hourly">
      <view class="title">24小时预报</view>
      <view class="card-wrap">
        <block v-for="(item, index) in hourly" :key="index">
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

    <view class="card-modular" v-if="daily">
      <view class="title">7天预报</view>
      <view class="card-wrap">
        <block v-for="(item, index) in daily" :key="index">
          <view class="item daily">
            <view>{{item.dateToString}}</view>
            <view class="text-gray">{{item.date}}</view>
            <image class="icon" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/{{item.iconDay}}.png"></image>
            <view class="text-primary ">{{item.tempMin}}°C~{{item.tempMax}}°C</view>
            <image class="icon" src="https://codermoyv.gitee.io/coder-moyv/assets/images/wechat/weather_custom/{{item.iconNight}}.png"></image>
            <view>{{item.windDirDay}}</view>
            <view class="text-gray">{{item.windScaleDay}}级</view>
          </view>
        </block>
      </view>
    </view>
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
      hourly: '', // 24小时天气信息
      daily: '', // 7天天气信息
    }
  },
  onLoad() {
    this.getLocation();
	},
  methods: {
    //选择定位
    selectLocation() {
      var that = this
      wx.chooseLocation({
        success(res) {
          that.location = res.longitude + "," + res.latitude
          that.getWeather()
          that.getCityByLoaction()
        }, fail() {
          wx.getLocation({
            type: 'gcj02',
            fail() {
              wx.showModal({
                title: '获取地图位置失败',
                content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
                success(mRes) {
                  if (mRes.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          that.selectLocation()
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1000
                          })
                        }
                      }, fail(err) {
                        console.log(err)
                        wx.showToast({
                          title: '唤起设置页失败，请手动打开',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    })
                  }
                }
              })
            }
          })
        }
      })
    },
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
                      that.getWeather()
                      that.getCityByLoaction()
                    }
                  }, fail(err) {
                    console.log(err)
                    wx.showToast({
                      title: '唤起设置页失败，请手动打开',
                      icon: 'none',
                      duration: 1000
                    })
                    that.location = "116.41,39.92";
                    that.getWeather()
                    that.getCityByLoaction()
                  }
                })
              } else if (mRes.cancel) {
                that.location = "116.41,39.92"
                that.getWeather()
                that.getCityByLoaction()
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
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          that.now = res.now
          // console.log('实时天气',result)
          that.today = that.getDateInfo(new Date(that.now.obsTime));
        }
      })

      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/24h?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          res.hourly.forEach(function (item) {
            item.time = that.formatTime(new Date(item.fxTime)).hourly
          })
          that.hourly = res.hourly
        }
      })
      
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/7d?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          res.daily.forEach(function (item) {
            item.date = that.formatTime(new Date(item.fxDate)).daily
            item.dateToString = that.formatTime(new Date(item.fxDate)).dailyToString
          })
          that.daily = res.daily
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
  }
}
</script>