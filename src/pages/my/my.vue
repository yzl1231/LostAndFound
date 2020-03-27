<template>
  <div class="myContainer">
    <div class="my_top">
      <img class="my_avator" :src="userInfo.avatarUrl" alt="">
      <p class="my_nickname">
        {{ userInfo.nickName }}
        <img v-if="genderShow === 1" src="/static/images/icon/man.png" alt="">
        <img v-if="genderShow === 2" src="/static/images/icon/woman.png" alt="">
      </p>
    </div>
    <div class="my_list">
      <p @tap="to_pages('/pages/my_information/main?nickName='+userInfo.nickName+'&avatar='+userInfo.avatarUrl)">
        <img src="/static/images/icon/userInfo.png" alt="">
        个人信息
        <span>></span>
        </p>
      <p @tap="to_pages('/pages/my_pickItems/main?index=0')">
        <img src="/static/images/icon/item.png" alt="">
        我的拾物
        <span>></span>
        </p>
      <p @tap="to_pages('/pages/my_pickItems/main?index=1')">
        <img src="/static/images/icon/item.png" alt="">
        我的寻物
        <span>></span>
        </p>
      <p @tap="to_pages('/pages/aboutThis/main')">
        <img src="/static/images/icon/about.png" alt="">
        关于
        <span>></span>
        </p>
      <p @tap="to_pages('/pages/useDocument/main')">
        <img src="/static/images/icon/document.png" alt="">
          使用文档
        <span>></span>
        </p>
    </div>
  </div>
</template>

<script>
const LOGIN_URL = ''
export default {
  data(){
    return{
      userInfo:{},
      genderShow: "",
    }
  },
  onLoad(){
    this.userInfo = wx.getStorageSync('selfInfo')
    this.genderShow = this.userInfo.gender
  },
  methods: {
    to_pages(url){
      wx.navigateTo({
        url: url
      })
    },
  }
}
</script>

<style scoped>
  .myContainer{
    display: flex;
    flex-direction: column;
  }
  .my_top{
    width: 100%;
    height: 350rpx;
    border-bottom: 1rpx solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .my_avator{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 0 auto;
    margin-top: 40rpx;
  }
  .my_nickname{
    font-size: 40rpx;
    font-weight: bold;
    margin: 20rpx auto;
  }
  .my_nickname img{
    width: 50rpx;
    height: 50rpx;
    vertical-align: middle;
  }
  .my_list{
    margin: 50rpx 0 0 0;
  }
  .my_list p{
    margin: 36rpx 0 20rpx 20rpx;
    font-size: 30rpx;
  }
  .my_list p img{
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
  }
  .my_list p span{
    color: #ccc;
    float: right;
    margin-right: 20rpx;
  }

</style>
