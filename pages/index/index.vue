<template>
	<view class="page-bg" style="background: #fff url({{dayImg}}) no-repeat center bottom;background-size: 100% calc(100vh - 100rpx)">
  <!-- <view class="page-bg" style="background:#fff url(https://staticedu-wps.cache.iciba.com/image/f1b051cc94ac3b9ee587d678a5934106.png) no-repeat center bottom;background-size:100% calc(100vh - 100rpx);"> -->
    <view class="header-modular" v-if="now">
      <view class="more" @click="btnWeatherForecast">详情<image src="/static/more.png"></image></view>
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
        <!-- 风向 级数 气压:单位百帕-->
        <view class="tips ">{{now.windDir}} {{now.windScale}}级</view>
        <view class="tips ">湿度 {{now.humidity}}%</view>
        <view class="tips ">气压 {{now.pressure}}hPa</view>
      </view>
      <view class="authori-load load-modal" v-if="is_auth">
        <view class="center">
          <view style="text-align: center;margin-bottom: 16px;">
              <text>您的信息和数据将受到保护</text>
          </view>
          <view class="btnLine">
            <button class='buttonfix confirm' open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">授权并登录</button>
            <button @click="cancel_login" class="buttonfix cancel">取消</button>
          </view>
        </view>
      </view>
    </view>
    <view class="header-modular" v-else style="text-align: center;line-height: 360rpx;">
      <view class="loading"></view>
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
      dayImg: '',
      dn: 'd', // 日/夜
      is_auth: false
    }
  },
  onLoad() {
    this.changeLogin();
    
    this.dayWord();
    
    this.getLocation();
	},
  methods: {
    getuserinfo: function(){
      let that = this;
      that.is_auth = false;
      // wx登录
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            var code = res.code
              // 获取微信用户信息
            wx.getUserInfo({
              success: function(res) {
                // 本地存储用户信息
                uni.setStorage({
                  key: 'userInfo',
                  data: res.userInfo
                })
                // var userInfo = res.userInfo
                // var nickName = userInfo.nickName
                // var avatarUrl = userInfo.avatarUrl
                // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                // var province = userInfo.province
                // var city = userInfo.city
                // var country = userInfo.country
              },
              fail:res=>{
                  // 获取失败的去引导用户授权 
              }
            })
          } else {
          
          }
        }
      })
    },
    cancel_login() {
      this.is_auth = false;
    },
    changeLogin(){
      let that = this;
      // 授权
      // 获取用户详细信息, 可以获取到说明已经授权过, 直接拿到用户信息
      uni.getUserInfo({
        provider: 'weixin',
        //授权成功的回调
        success(res) {
          // uni.showToast({
          //   title:'授权成功',
          //   icon:'none'
          // })
          // 本地存储用户信息
          uni.setStorage({
            key: 'userInfo',
            data: res.userInfo
          })
          // console.info(res)
          //that.login(res.data);//授权成功调用自己的登录方法就可以了
        },
        //第一次进入小程序
        fail() {
          uni.showToast({
            title: '请点击授权进行登录',
            icon: 'none'
          });
          that.is_auth = true;
        }
      });
    },

    // 每日一语
    dayWord() {
      uniCloud.callFunction({
					name: 'dayWord',
					success: (res) => {
            this.dayImg = res.result.data.newslist[0].imgurl;
					}
				})
    },
    // 天气预报
    btnWeatherForecast() {
      uni.navigateTo({
        url: '/pages/weatherForecast/weatherForecast?dn=' + this.dn
      })
    },
    // 通过日出日落时间判断白天黑夜
    dayNight(daily) {
      let sunriseMs = new Date(daily.fxDate + ' ' + daily.sunrise + ':00').getTime()
      let sunsetMs = new Date(daily.fxDate + ' ' + daily.sunset + ':00').getTime()
      let nowMs = new Date().getTime()
      // console.log(sunriseMs, sunsetMs,nowMs)
      let that = this;
      if(sunriseMs < nowMs && nowMs < sunsetMs) {
        that.dn = 'd'
      }else{
        that.dn = 'n'
      }
      // 本地存储白天/黑夜
      uni.setStorage({
        key: 'dayNight',
        data: that.dn
      })
    },

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
                        // console.log(err)
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
                    // console.log(err)
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

      // 获取日出日落时间判定白天或黑夜
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/7d?key=' + APIKEY + "&location=" + that.location,
        success(result) {
          var res = result.data
          that.daily = res.daily
          that.dayNight(that.daily[0])
          wx.hideLoading()
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
    },
    // 获取日期
    getDateInfo(date) {
      return require("../../utils/util").getDateInfo(date);
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
.header-modular .more {
	position: absolute;
  top: 18px;
  right: 12px;
  color: #fff;
  font-size: 18px;
}
.header-modular .more image {
  width: 30px;
  height: 30rpx;
}
</style>
