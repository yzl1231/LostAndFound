<template>
    <div @tap="toDetail" class="container">
      <ul>
        <li @tap.stop="goBack" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="type" :style="{'margin-right': right +'rpx'}">
          <div class="img_info">
            <img  :src="item.avatar" alt="">
          </div>
          <div class="information">
            <span class="time">{{item.time}}</span>
            <div class="label">
              <div>{{item.label}}</div>
              <div>{{item.title}}</div>
            </div>
          </div>
          <div v-if="item.helpType === 1" class="helpOrNo">已帮助</div>
          <div v-else-if="item.helpType === 0" class="helpOrNo">未帮助</div>
          <div v-else class="helpOrNo">    </div>
          <div  class="finish" @tap.stop="finished" >已完成</div>
          <div class="delete" @tap.stop="delt" >删除</div>
        </li>
      </ul>
    </div>

</template>

<script>
export default {
  data(){
    return{
      right: -20,
      type: 0,
    }
  },
  props: [
    'item'
  ],
  methods:{
    toDetail(){
      wx.navigateTo({
        url: '/pages/detail/main?messageId='+this.item.messageId
      })
    },
    // 滑动开始
    touchStart(e){
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      this.startX = e.mp.changedTouches[0].clientX;
    },
    // 滑动结束
    touchEnd(e,index){
      // 获取移动距离
      this.endX = e.mp.changedTouches[0].clientX;
      // console.log(this.item)
      if(this.startX-this.endX > 20){
        this.type = 1
      }else if(this.startX-this.endX < -20){
        this.type = 0
      }
    },
    // 恢复初始状态（不显示已完成和删除按钮）
    goBack(){
      this.type = 0
    },
    showToast(msg){
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1000
      })
    },
    mangeItems(url){
      const token =  wx.getStorageSync('1')
      let messageIds = this.item.messageId
      console.log(messageIds)
      let that = this
      wx.request({
        url: url,
        data: {
          messageId: messageIds,
        },
        method: 'GET',
        header: {
          'token': token
        },
        success(res) {
          console.log(res)
          if(res.data.code == 1){
            that.$parent.pickItemsUpData()
            that.$parent.loseItemsUpData()
            that.showToast('操作成功')
          }else{
            that.showToast('操作失败')
          }
        }
      })
    },
    finished(){
      this.mangeItems('https://chendongnan.vip/cywq/user/setFinished')
    },
    delt(){
      this.mangeItems('https://chendongnan.vip/cywq/user/deleteMessage')
    }
  }
}
</script>

<style scoped>
  .container{
    width: 100%;
  }
  .container ul{
    width: 100%;
  }
  .container ul li{
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    width: 1100rpx;
    height: 140rpx;
    border-bottom: 1px solid #E0EEF1;
    display:flex;
    align-items:center;
  }
  .img_info img{
    width: 100rpx;
    height: 110rpx;
    margin: 20rpx 20rpx;
    border-radius: 100%;
  }
  .information{
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100rpx;
    margin: 30rpx 10rpx;
  }
  .time{
    font-size: 24rpx;
    width: 100%;
    height: 30px;
    line-height: 30rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .label{
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    border: 1rpx solid #eee;
    border-left: none;
  }
  .label div{
    float: left;
    width: 50%;
    font-size: 30rpx;
    text-align: center;
    border-left: 1rpx solid #eee;
    margin-left: -1rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .helpOrNo{
    width: 15%;
    margin: 30rpx 0 0 180rpx;
    font-size: 24rpx;
  }
  .delete{
    width: 15%;
    height: 140rpx;
    color:#fff;
    text-align: center;
    font-size: 36rpx;
    background: red;
    line-height: 140rpx;
  }
  .finish{
    width: 15%;
    height: 140rpx;
    color:#fff;
    text-align: center;
    font-size: 36rpx;
    background: #ccc;
    line-height: 140rpx;
  }
  li[data-type="0"]{
    transform: translate3d(0,0,0);
  }
  li[data-type="1"]{
    transform: translate3d(-340rpx,0,0);
  }
</style>
