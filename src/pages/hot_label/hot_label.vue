<template>
  <div class="container">
    <div class="top_label">
      <p># {{ label }} #</p>
    </div>
    <div>
      <hotlist v-for="(item, index) in labelArr" :key="index" :item="item" :index="index"></hotlist>
    </div>
  </div>
</template>

<script>
import hotlist from '../../components/index_list/index_list'
import requestData from '../../requestUrl/requestData'
export default {
  data(){
    return{
      label:"",
      labelArr: []
    }
  },
  components:{
    hotlist
  },
  onLoad(e){
    // console.log(e)
    this.label = e.label
    let that = this
    let hotLabelData = {
      labelId: e.labelId
    }
    requestData.requestLoading('https://chendongnan.vip/cywq/search/searchMessageByLabelId',hotLabelData,'加载中...','GET',function (res) {
      that.labelArr = res.data
    })
  },
  onUnload(){
    this.labelArr = []
  }
}
</script>

<style scoped>
  .top_label{
    width: 100%;
    height: 300rpx;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
    background: #fbde8f;
  }
  .top_label p{
    font-size: 40rpx;
    text-align: center;
    line-height: 300rpx;
    color: white;
  }
</style>
