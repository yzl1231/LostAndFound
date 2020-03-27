<template>
  <div  class="container">
    <div @tap="toDetail" class="main_infor">
      <img class="avatar" :src="item.avatar" alt="">
      <div class="main">
        <div class="top">
          <p>{{item.name}}</p>
        </div>
        <div class="bottom">
          <span v-if="item.type === 1" class="pick_lose1">捡到</span>
          <span v-if="item.type === 2" class="pick_lose2">丢失</span>
          <span class="lebel">{{item.label}}</span>
          <span class="time">{{item.time}}</span>
        </div>
      </div>
      <div v-if="item.helpType === 0" class="help_type0">未帮助</div>
      <div v-if="item.helpType === 1" class="help_type1">已帮助</div>
      <p class="ddd" @tap.stop="changeHelpType">...</p>
    </div>
    <div v-if="helpTypeNum === 1" @tap="cancel" class="helpType" catchtouchmove="ture">
      <div class="changeHelpBox" :style="{'margin-top': top +'rpx'}" >
        <p>设为已帮助后不能再设为未帮助哟！</p>
        <div class="buttons">
          <button @tap="setHelpType" >设为已帮助</button>
        </div>
      </div>
    </div>
    <div @tap="toDetail" class="infor_box">
      <p class="title">#{{item.title}}#</p>
      <p class="content">{{item.simpleContent}}</p>
    </div>
  </div>
</template>

<script>
import requestData from '../../requestUrl/requestData'
export default {
  data(){
    return{
      helpTypeNum: 0, //控制改变帮助标签的显示
      top:{}, //改变帮助信息距离顶部的数值
      height:{}, //屏幕的高度
    }
  },
  props:[
    'item'
  ],
  methods:{
    dayin(){
      console.log('hello')
    },
    toDetail(){
      //跳转到详情页 + 传参过去index
      wx.navigateTo({
        url: '/pages/detail/main?messageId='+this.item.messageId
      })
    },
    //提示信息函数封装
    showToast(msg){
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1000
      })
    },
    //显示遮罩层
    changeHelpType(e){
      if(this.item.helpType == 1){
        this.showToast('设为已帮助后不能再改变了哟')
      }else{
        this.helpTypeNum = 1 //显示改变帮助类型的遮罩层
        if((this.height-((e.clientY) * 2))<260){
          this.top = ((e.clientY) * 2) - 230
        }else{
          this.top = ((e.clientY) * 2) + 30
        }
      }
    },
    //隐藏遮罩层
    cancel(){
      this.helpTypeNum = 0 //隐藏改变帮助类型的遮罩层
    },
    //改变帮助类型函数
    setHelpType(){
      let messageIds = parseInt(this.item.messageId)
      console.log(messageIds)
      let that = this
      let helpTypeData = {
        messageId: messageIds
      }
      requestData.requestLoading('https://chendongnan.vip/cywq/message/setMessageToHelp',helpTypeData,"",'GET',function (res) {
        console.log(res)
        if(res.code == 0){
          that.showToast('不能将自己发布的消息设为已帮助')
        }else{
          that.showToast('改变成功')
          console.log('改变帮助类型成功')
          if(that.item.type == 1){
            that.$parent.requestPickData()
            that.$parent.requestMainData()
          }else{
            that.$parent.requestLoseData()
            that.$parent.requestMainData()
          }
        }
      })
    }
  },
  onLoad(){
    let that = this
    wx.getSystemInfo({
      success(res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        that.height = height
      }
    })
  },
  onShow(){
    this.helpTypeNum = 0 //每次看到消息列表时，隐藏改变帮助类型窗口
  },
}
</script>

<style scoped>
  .container{
    width: 98%;
    border-radius: 10rpx;
    border: 1rpx solid #ccc;
    box-shadow: 1px 2px 1px #ccc;
    box-sizing: border-box;
    margin: 15rpx 1%;
    overflow: hidden;
  }
  /* 主要个人信息 */
  .main_infor{
    width: 96%;
    height: 130rpx;
    margin: 0 2%;
    font-size: 24rpx;
    border-bottom: 1rpx solid #eee;
    display: flex;
  }
  /* 头像 */
  .avatar{
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
    margin: 30rpx 10rpx;
  }
  /* 除头像外其他信息盒子 */
  .main{
    margin: 30rpx 10rpx;
    width: 67%;
  }
  /* 姓名 */
  .top p{
    margin: 0 10rpx;
    height: 50rpx;
    font-size: 30rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 捡到类型、标签和时间的总盒子 */
  .bottom{
    height: 30rpx;
    margin: 0 0 40rpx 0;
    line-height: 30rpx;
    vertical-align: middle;
  }
  .bottom span{
    margin: 0 10rpx;
    white-space: nowrap;
  }
  /* 捡到 */
  .pick_lose1{
    color: white;
    background: pink;
    padding: 5rpx;
    font-size: 20rpx;
  }
  /* 丢失 */
  .pick_lose2{
    color: white;
    background: #00DD00;
    padding: 5rpx;
    font-size: 20rpx;
  }
  /* 标签 */
  .lebel{
    background: #fbde8f;
    font-size: 20rpx;
    padding: 5rpx;
    color: white;
    border-radius: 5rpx;
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
    margin: 0 5%;
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
  /* 主要内容 */
  .infor_box{
    width: 100%;
    margin-top: 20rpx;
  }
  /* 标题 */
  .title{
    color: #87caee;
    font-size: 30rpx;
    margin: 10rpx 2%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 文字内容 */
  .content{
    width: 80%;
    margin: 15rpx 10% 30rpx 10%;
    font-size: 30rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30rpx;
    letter-spacing: 3rpx;/* 文字间的间隔 */
  }
</style>
