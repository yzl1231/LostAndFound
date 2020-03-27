<template>
  <div>
    <div>
      <p class="title">首页</p>
      <p>首页查看别人发布的信息贴，贴子分为捡到和丢失两种，上拉加载，下拉刷新</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce01.png" alt="">
      <p>点击贴子进入详情页查看详细信息，联系方式可一键复制</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce02.png" alt="">
      <p>贴子分已帮助和未帮助两种状态，点击贴子右上角三个点的地方可以将贴子设置为已帮助到你，设置为已帮助后不能再设置。将贴子设置为已帮助时，会给这条贴子的发布人推送一条微信消息通知</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce03.png" alt="">
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce04.png" alt="">
      <p>首页会有三个热门标签，点击热门标签可以查看属于该标签的信息贴 </p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce05.png" alt="">
      <p>点击搜索框搜索信息，该搜索支持用户昵称、标题、标签以及内容的搜索</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce06.png" alt="">
    </div>
    <div>
      <p class="title">发布页</p>
      <p>发布页发布信息贴，可以发布拾到和丢失两种贴子，每条贴子最多可以上传三张图片</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce07.png" alt="">
    </div>
    <div>
      <p class="title">我的页</p>
      <p>个人信息，可以查看和修改个人信息</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce08.png" alt="">
      <p>我的拾物，可以查看自己发布的拾物贴，将贴子向左滑可以将贴子删除或设为已完成，设为已完成后别人不能看到你的贴子，自己可以在已完成页面看到，删除后自己和别人都不能看到该贴子</p>
      <img src="https://www.chendongnan.vip/static/cqupt/images/stc/introduce09.png" alt="">
      <p>我的寻物，可以查看自己发布的寻物贴，功能和我的拾物相同</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  img{
    width: 94%;
    height: 1000rpx;
    margin: 10rpx 3%;
    border: 1rpx solid #ccc;
  }

  p{
    font-size: 30rpx;
    text-indent: 60rpx;
    margin: 30rpx 3%;
    text-align: justify;
  }
  .title{
    font-size: 50rpx;
    font-weight: bold;
    margin: 20rpx 3%;
  }
</style>
