<template>
  <div class="impower_box">
    <img src="https://www.chendongnan.vip/static/cqupt/images/stc/64ec3524f8f51eb.jpg" alt="">
    <p>该小程序由cywq团队开发，向其提供以下权限即可继续操作</p>
    <div class="circle" style="margin:40rpx 50rpx 50rpx 50rpx;"></div>
    <ul>
      <li>获得你的公开信息（昵称、头像等）</li>
    </ul>
    <div class="circle" style="margin:10rpx 50rpx 50rpx 50rpx;"></div>
    <ul>
      <li>该平台为校园公益性质，请用户自觉遵守规则</li>
    </ul>
    <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">确认授权</button>
  </div>
</template>

<script>
import requestData from '../../requestUrl/requestData'
export default {
  onLoad(){
    requestData.requestLoading('https://chendongnan.vip/cywq/message/getHotLabel',"","",'GET',function (res) {
        if(res.code == 1){
          console.log('已经授权，直接获取数据')
          wx.switchTab({
            url: '/pages/index/main'
          })
        }
      })
  },
  methods:{
    handleGetUserInfo(){
      wx.getUserInfo({
        success(data){
          console.log('授权成功')
          wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                let loadingMsg = {
                  code: res.code,
                  nickName: data.userInfo.nickName,
                  avatarUrl: data.userInfo.avatarUrl,
                  gender: data.userInfo.gender
                }
                wx.setStorageSync('selfInfo',loadingMsg)
                // 发起网络请求
                requestData.requestLoading('https://chendongnan.vip/cywq/user/login',loadingMsg,'登录ing','POST',function (res) {
                  console.log('登陆成功')
                  //得到token
                  let token = res.data
                  console.log('确定已经授权后的token+'+token)
                  //把token存到本地，再在其他页面获取
                  wx.setStorageSync('1',token)
                  //跳转页面到首页
                  wx.switchTab({
                    url: '/pages/index/main'
                  })
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        },
        fail: () => {
          console.log("获取失败（授权失败）");
        }
      })
    },
  }
}
</script>

<style scoped>
  .impower_box{
    width: 100%;
    background: white;
    font-size: 30rpx;
  }
  .impower_box img{
    display: flex;
    width: 200rpx;
    height: 200rpx;
    margin: 50rpx auto;
  }
  .impower_box p{
    border-bottom: 1rpx solid #ccc;
    height: 130rpx;
    line-height: 50rpx;
    margin: 0 50rpx;
  }
  .circle{
    width: 20rpx;
    height: 20rpx;
    border-radius: 100%;
    background: #ccc;
    float: left;
  }
  .impower_box ul li{
    color: #ccc;
    margin: 30rpx 50rpx 50rpx 0;
  }
  .impower_box button{
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    width: 50%;
    margin: 0 25%;
  }
</style>
