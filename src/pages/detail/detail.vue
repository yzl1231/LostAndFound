<template>
  <div>
    <div class="top"></div>
    <div class="information">
      <img class="avatar" :src="detailMessage.avatar" alt="">
      <div class="information_right">
        <p class="name">{{detailMessage.name}}</p>
        <p class="top_infor">
          <span v-if="detailMessage.type === 1" class="pick_lose1">捡到</span>
          <span v-if="detailMessage.type === 2" class="pick_lose2">丢失</span>
          <span class="lebel">{{detailMessage.label}}</span>
        </p>
        <p class="time">{{detailMessage.time}}</p>
      </div>
      <div v-if="detailMessage.helpType === 0" class="help_type0">未帮助</div>
      <div v-if="detailMessage.helpType === 1" class="help_type1">已帮助</div>
      <p class="ddd" @tap="changeHelpType">...</p>
    </div>
    <div v-if="helpTypeNum === 1" @tap="cancel" class="helpType" catchtouchmove="ture">
      <div class="changeHelpBox" >
        <p>设为已帮助后不能再设为未帮助哟！</p>
        <div class="buttons">
          <button @tap="setHelpType">设为已帮助</button>
        </div>
      </div>
    </div>
    <div class="main_content">
      <div class="main_content_top">
        <p class="title">#{{detailMessage.title}}#</p>
        <p class="content">{{detailMessage.content}}</p>
        <div class="imgBox0">
          <div v-for="(item, index) in detailMessage.photoList" :key="index" class="imgBox">
            <img @tap="bigShow" :data-src="item" class="detail_img" :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="main_content_bottom">
        <p>
          <span v-if="detailMessage.type === 1">拾到地点：</span>
          <span v-if="detailMessage.type === 2">丢失地点：</span>
          <span>{{detailMessage.address}}</span>
        </p>
        <p>
          <span>联系方式：</span>
          <span class="contactWay" @tap="copyThis">{{detailMessage.contactWay}}</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import requestData from '../../requestUrl/requestData'
export default {
  data(){
    return{
      helpTypeNum: 0, //控制改变帮助类型的遮罩层是否弹出
      messageId: "", //消息的索引
      detailMessage: {}, //详细信息总对象
    }
  },
  methods:{
    //显示遮罩层
    changeHelpType(){
      let that = this
      if(that.detailMessage.helpType == 1){
        that.showToast('设为已帮助后不能再改变了哟')
      }else{
        this.helpTypeNum = 1
      }
    },
    //隐藏遮罩层
    cancel(){
      this.helpTypeNum = 0
    },
    //提示信息函数的封装
    showToast(msg){
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1000
      })
    },
    //改变帮助类型函数+请求详细信息函数的封装
    requestFunction(url,success){
      let that = this
      let Datas = {
        messageId: that.messageId
      }
      requestData.requestLoading(url,Datas,"",'GET',function (res) {
        console.log(res)
        success(res)
      })
    },
    //改变帮助类型函数
    setHelpType(){
      let that = this
      this.requestFunction('https://chendongnan.vip/cywq/message/setMessageToHelp',function(res){
        if(res.code == 0){
          that.showToast('不能将自己发布的消息设为已帮助')
        }else{
          that.showToast('修改成功')
          that.requestDetailMsg()
        }
      })
    },
    //请求详细信息函数
    requestDetailMsg(){
      let that = this
      this.requestFunction('https://chendongnan.vip/cywq/message/getMessageInfo',function(res){
        that.detailMessage = res.data
        console.log(that.detailMessage)
      })
    },
    //图片预览函数
    bigShow(e){
      console.log(e.currentTarget.dataset.src)
      let that = this
      let src = e.currentTarget.dataset.src
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: that.detailMessage.photoList // 需要预览的图片http链接列表
      })
    },
    //复制联系方式函数
    copyThis(){
      let that = this
      wx.showModal({
        title: '联系ta',
        content: that.detailMessage.contactWay,
        confirmText: '复制',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setClipboardData({
              data: that.detailMessage.contactWay,
            });
          }
        }
      })

    }
  },
  onLoad(e){
    this.messageId = e.messageId
    this.requestDetailMsg()
  },
  onShow(){
    this.helpTypeNum = 0
  },
  onUnload(){
    this.detailMessage = {}
    //卸载页面
  }
}
</script>

<style scoped>
  .top{
    width: 100%;
    height: 20rpx;
    background: #eee;
  }
  .information{
    display: flex;
    width: 94%;
    margin: 10rpx 2%;
    border-bottom: 1rpx solid #eee;
  }
  .avatar{
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
  }
  .information_right{
    margin: 10rpx 20rpx;
    width: 60%;
  }
  .name{
    width: 120rpx;
    white-space: nowrap;
    margin: 0 5rpx;
    font-size: 36rpx;
    font-weight: bold;
  }
  .top_infor{
    font-size: 24rpx;
  }
  .pick_lose1{
    color: white;
    background: pink;
    padding: 5rpx;
    font-size: 20rpx;
    margin: 0 5rpx;
    border-radius: 5rpx;
  }
  .pick_lose2{
    color: white;
    background: #00DD00;
    padding: 5rpx;
    font-size: 20rpx;
    margin: 0 5rpx;
    border-radius: 5rpx;
  }
  .lebel{
    background: #fbde8f;
    color: white;
    margin: 0 5rpx;
    font-size: 20rpx;
    padding: 5rpx;
    border-radius: 5rpx;
  }
  .time{
    color: #ccc;
    margin: 0 5rpx;
    font-size: 24rpx;
  }
  /* 帮助类型展示 */
  .help_type0{
    font-size: 20rpx;
    padding: 5rpx;
    height: 30rpx;
    border-radius: 5rpx;
    margin-top: 32rpx;
    background: #FF6633;
    color: white;
  }
  .help_type1{
    font-size: 20rpx;
    padding: 5rpx;
    height: 30rpx;
    border-radius: 5rpx;
    margin-top: 32rpx;
    background: #fbde8f;
    color: white;
  }
  /* 点点点 */
  .ddd{
    font-size: 40rpx;
    margin: 8rpx 0 0 15rpx;
  }
  /* 改变帮助类型 */
  .helpType{
    position:fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
  .changeHelpBox{
    width: 90%;
    height: 200rpx;
    margin: 150rpx 5%;
    border-radius: 10rpx;
    border: 1rpx solid #ccc;
    background: white;
  }
  .changeHelpBox p{
    color: #ccc;
    height: 90rpx;
    width: 90%;
    margin: 0 5%;
    line-height: 90rpx;
    font-size: 36rpx;
    border-bottom: 1rpx solid #ccc;
    text-align: center;
  }
  .buttons button{
    background: #fbde8f;
    width: 80%;
    font-size: 36rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 10rpx 10%;
  }
  .main_content{
    padding: 10rpx;
  }
  .title{
    color: #87caee;
    font-size: 30rpx;
  }
  .content{
    font-size: 30rpx;
    line-height: 40rpx;
    letter-spacing: 3rpx;
    vertical-align: middle;
    text-indent: 60rpx;
    letter-spacing: 3rpx;
  }
  .imgBox0{
    display: flex;
  }
  .imgBox{
    height: 200rpx;
  }
  .detail_img{
    width: 230rpx;
    height: 230rpx;
    margin: 8rpx;
  }
  .main_content_bottom{
    font-size: 30rpx;
    margin-top: 50rpx;
  }
  .contactWay{
    color:#87caee;
  }
</style>
