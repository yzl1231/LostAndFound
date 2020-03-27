<template>
  <div>
    <div class="test">
      <div class="testNav">
        <div
          :class="{'selected':tab === 1,'testTitle':true}"
          @tap="changTab(1)"
        >未完成</div>
        <div
          :class="{'selected':tab === 2,'testTitle':true}"
          @tap="changTab(2)"
        >已完成</div>
      </div>
      <div>
        <div v-if="tab===1" >
          <pickList v-for="(item, index) in listTmp0" :key="index" :item="item" ></pickList>
        </div>
        <div v-if="tab === 2">
          <finishList v-for="(item, index) in listTmp1" :key="index" :item="item" ></finishList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pickList from '../../components/my_pickItems_list/my_pickItems_list'
import finishList from '../../components/my_finishItems/my_finishItems'
export default {
  data() {
    return {
      tab: 1,
      listTmp0: [], //未完成数组
      listTmp1: [], //已完成数组
    }
  },
  components:{
    pickList,
    finishList
  },
  onLoad(e){
    if(e.index == 0){
      wx.setNavigationBarTitle({
        title: '我的拾物'
      })
      this.pickItemsUpData()
    }else{
      wx.setNavigationBarTitle({
        title: '我的寻物'
      })
      this.loseItemsUpData()
    }
  },
  onUnload(){
    // 卸载页面
    this.listTmp0 = []
    this.listTmp1 = []
    this.tab = 1
  },
  methods: {
    changTab(index) {
      this.tab = index;
    },
    pickItemsUpData(){
      let that = this
      //获取我的拾物未完成信息
      this.requestData('https://chendongnan.vip/cywq/user/getPickupList',0,function(res){
        that.listTmp0 = res.data
        console.log(res.data)
      })
      //获取我的拾物已完成信息
      this.requestData('https://chendongnan.vip/cywq/user/getPickupList',1,function(res){
        that.listTmp1 = res.data
        console.log(res.data)
      })
    },
    loseItemsUpData(){
      let that = this
      //获取我的寻物未完成信息
      this.requestData('https://chendongnan.vip/cywq/user/getSeekList',0,function(res){
        that.listTmp0 = res.data
        console.log(res.data)
      })
      //获取我的拾物未完成信息
      this.requestData('https://chendongnan.vip/cywq/user/getSeekList',1,function(res){
        that.listTmp1 = res.data
      })
    },
    //请求函数的封装
    requestData(url,type,success){
      let that = this
      const token =  wx.getStorageSync('1')
      wx.request({
        url: url,
        method: 'GET',
        data:{
          finished: type
        },
        header: {
          'token': token
        },
        success(res) {
          success(res.data)
        }
      })
    }
  }
}
</script>

<style scoped>
  .test {
    width: 100%;
  }
  .testNav {
    padding: 0 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
  }
  .testTitle {
    flex: 1;
    text-align: center;
  }
  .selected {
    color: #fbde8f;
    border-bottom: 1px solid #fbde8f;
  }
  .content_num1{
    display: none;
  }
  .content_num2{
    display: none;
  }
</style>
