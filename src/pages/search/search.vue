<template>
  <div class="container">
    <div class="search_box">
      <input @input="msgs" placeholder="请输入用户昵称、标题、标签或内容" type="text">
      <button class="search" @tap="search">搜索</button>
    </div>
    <div v-if="tab === 1">
      <lists v-for="(item, index) in searchItems" :key="index" :item="item" :index="index"></lists>
    </div>
  </div>
</template>

<script>
import lists from '../../components/index_list/index_list'
import requestData from '../../requestUrl/requestData'
export default {
  data(){
    return{
      msg: "",
      searchItems: [],
      tab: "",
    }
  },
  components:{
    lists
  },
  onUnload(){
    this.searchItems = []
  },
  methods:{
    msgs(e){
      this.msg = e.mp.detail.value
      console.log(this.msg)
    },
    showToast(msg){
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    },
    search(){
      let that = this
      let searchData = {
        msg: that.msg
      }
      requestData.requestLoading('https://chendongnan.vip/cywq/search/searchMessage',searchData,"",'GET',function (res) {
        console.log(res)
        if(res.data.total == 0){
          that.tab = 0
          that.showToast('没有相关信息')
        }else{
          that.showToast('一共找到'+res.data.total+'条相关信息')
          that.tab = 1
          that.searchItems = res.data.list
          console.log(that.searchItems)
        }
      })
    }
  },
}
</script>

<style scoped>
  .search_box{
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 10rpx 5%;
  }
  .container input{
    width: 80%;
    height: 60rpx;
    border:1rpx solid #eee;
    border-radius: 30rpx;
    margin: 10rpx;
    line-height: 80rpx;
    font-size: 24rpx;
    text-indent: 10rpx;
  }
  .search{
    height: 60rpx;
    width: 25%;
    font-size: 36rpx;
    line-height: 60rpx;
    margin: 10rpx 20rpx;
  }
</style>
