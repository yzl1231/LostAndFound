<template>
  <div @tap="toDetail" class="container">
      <img  :src="item.avatar" alt="">
      <div class="information">
        <span class="time">{{item.time}}</span>
        <div class="label">
          <div>{{item.label}}</div>
          <div>{{item.title}}</div>
        </div>
      </div>
      <div v-if="item.helpType === 1" class="helpOrNo">已帮助</div>
      <div v-else-if="item.helpType === 0" class="helpOrNo">未帮助</div>
      <div v-else class="helpOrNo"></div>
    </div>
</template>

<script>
export default {
  props: [
    'item'
  ],
  methods:{
    toDetail(){
      wx.navigateTo({
        url: '/pages/detail/main?messageId='+this.item.messageId
      })
    }
  }
}
</script>

<style scoped>
  .container{
    width: 100%;
  }
  .container{
    display: flex;
    border-bottom: 1rpx solid #eee;
    width: 100%;
    height: 140rpx;
  }
  .container img{
    width: 100rpx;
    height: 100rpx;
    margin: 20rpx 20rpx;
    border-radius: 100%;
  }
  .information{
    display: flex;
    flex-direction: column;
    width: 300rpx;
    height: 90rpx;
    margin: 30rpx 10rpx;
  }
  .time{
    font-size: 24rpx;
    width: 100%;
    height: 30px;
    line-height: 30rpx;
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
    margin: 30rpx 0 0 180rpx;
    font-size: 24rpx;
  }
</style>
