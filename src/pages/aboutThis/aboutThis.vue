<template>
  <div>
    <p class="title">重邮失物招领</p>
    <p class="tip">体现校友间的互帮互助</p>
    <!-- <h3>关于</h3> -->
    <div class="content">
      <p>该小程序由cywq学生团队开发，是一个专注于校园失物招领的公益平台，目前适用于重庆邮电大学校园内。</p>
      <p>
        该小程序会一直不断优化，目前开发人员有两人，如果您有什么功能or页面上的建议或者想参与一起优化，请联系QQ：
        <span @tap="copyThis">1164599192</span>
      </p>
    </div>

    <p class="edition">版本号：1.0.0</p>
  </div>
</template>

<script>
export default {
  methods:{
    copyThis(){
      wx.showModal({
        title: '联系ta',
        content: '1164599192',
        confirmText: '复制',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setClipboardData({
              data: '1164599192',
            });
          }
        }
      })
    }
  }
}
</script>

<style>
  .title{
    margin: 30rpx auto;
    height: 50rpx;
    width: 300rpx;
    font-size: 50rpx;
    font-weight: bold;
  }
  .tip{
    font-size: 30rpx;
    height: 30rpx;
    width: 300rpx;
    margin:60rpx auto;
    color: #ccc;
  }
  h3{
    font-size: 40rpx;
    margin: 20rpx 10%;
  }
  .content p{
    font-size: 35rpx;
    width: 84%;
    margin: 0 8%;
    text-indent: 80rpx;
    letter-spacing: 5rpx;
    text-align: justify;
  }
  .content p span{
    color:#87caee;
  }
  .edition{
    font-size: 35rpx;
    margin: 100rpx 8%;
  }
</style>

