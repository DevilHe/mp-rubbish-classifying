<template>
  <div>
    <div class="user-detail">
      <div class="user-header">
        <image :src="userInfo.avatarUrl" @click="authorize"></image>
        <div>{{userInfo.nickName}}</div>
      </div>
      <div class="user-container">
        <div class="info-wrapper">
          <div class="info-detail-item">
            <div class="info-detail-item-container">
              <div class="info-detail-item-title" @click="btnWeatherForecast">天气预报
                <image src="/static/arrow.png"></image>
              </div>
              <div class="info-detail-item-title" @click="btnSearch">分类查询
                <image src="/static/arrow.png"></image>
              </div>
              <div class="info-detail-item-title" @click="calculation">计算
                <image src="/static/arrow.png"></image>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
    <!-- <view class="">{{userInfo.gender===1?'男':(userInfo.gender===2?'女':(userInfo.gender===0?'未知':''))}}</view> -->
  </div>
</template>

<script>
export default {
  onLoad() {
    this.getUserInfoMsg();

    let that = this;
    uni.getStorage({
      key: 'dayNight',
      success(e){
        that.dn = e.data;
      }
    })
	},
  data() {
    return {
      userInfo: {
        avatarUrl: '/static/avatar.png',
        nickName: '请点击登录',
        gender: '',
      },
      dn: 'd', // 日/夜
      auth: false,
      is_auth: false,
    }
  },
  methods: {
    getUserInfoMsg() {
      let that = this;
      uni.getStorage({
        key: 'userInfo',
        success(e){
          // console.log('this.userInfo', e.data)
          that.userInfo.avatarUrl = e.data.avatarUrl;
          that.userInfo.nickName = e.data.nickName;

          that.auth = true;
          // that.userInfo = e.data
        },
        fail() {
          that.auth = false;
        }
      })
    },
    cancel_login() {
      this.is_auth = false;
    },
    authorize() {
      if(this.auth) {
        console.log('已授权登录')
      }else {
        this.is_auth = true;
      }
    },
    getuserinfo: function(){
      let that = this;
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
                that.is_auth = false;
                that.getUserInfoMsg();
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
    // 天气预报
    btnWeatherForecast() {
      uni.navigateTo({
        url: '/pages/weatherForecast/weatherForecast?dn=' + this.dn
      })
    },
    // 分类查询
    btnSearch(phone) {
      uni.navigateTo({
        url: '/pages/refuseClassification/refuseClassification?phone=' + phone
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

<style>
.user-detail {
  height: 100%;
  position: relative;
}
.user-detail .user-header {
  width: 120%;
  height: 200px;
  background: #0081ff;
  position: relative;
  left: -10%;
  border-bottom-left-radius: 45%;
  border-bottom-right-radius: 45%;
  overflow: hidden;
  text-align: center;
  /* pointer点击会有闪烁 */
  /* cursor: pointer; */
  padding: 40px 0;
}
.user-detail .user-header image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.user-detail .user-container {
  position: relative;
  top: -35px;
  margin-bottom: -35px;
}
.user-detail .info-wrapper {
  width: 320px;
  margin: 0 auto;
  border-radius: 4px;
}
.user-detail .info-detail-item {
  padding: 0 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 18rpx;
  -webkit-box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  /* cursor: pointer; */
}
.user-detail .info-detail-item-title {
  display: block;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid #eee;
  position: relative;
  /* cursor: pointer; */
  color: #353535;
}
.user-detail .info-detail-item-title image {
  width: 22px;
  height: 22px;
  margin: 15px 0;
  float: right;
}
</style>