<template>
  <div class="container" >
    <div>
      <div @tap="toSearch" class="searchBox">
        <img src="/static/images/icon/chazhao.png" alt="">
        <span>搜索</span>
      </div>
      <div class="topBox">
        <!-- 轮播 -->
        <swiper indicator-dots="true" indicator-color="#ccc" indicator-active-color="green" autoplay="true" circular="true">
          <swiper-item>
            <img src="https://www.chendongnan.vip/static/cqupt/images/stc/轮播图-201905271144.jpg" alt="">
          </swiper-item>
          <swiper-item>
            <img src="https://www.chendongnan.vip/static/cqupt/images/stc/轮播图-201905271145.jpg" alt="">
          </swiper-item>
          <swiper-item>
            <img src="https://www.chendongnan.vip/static/cqupt/images/stc/轮播图-201905271146.jpg" alt="">
          </swiper-item>
        </swiper>
      </div>
      <div class="papulation">
        <p class="papulation_label">热门标签</p>
          <div class="papulation_con">
              <p v-if="hotLabel1 === 1" @tap="to_hot(0)">{{hot_label[0].labelName}}</p>
              <p v-if="hotLabel2 === 1" @tap="to_hot(1)">{{hot_label[1].labelName}}</p>
              <p v-if="hotLabel3 === 1" @tap="to_hot(2)">{{hot_label[2].labelName}}</p>
          </div>
      </div>
      <div class="test">
        <div class="testNav">
          <div
            :class="{'selected':tab === 1,'testTitle':true}"
            @tap="changTab(1)"
          >全部</div>
          <div
            :class="{'selected':tab === 2,'testTitle':true}"
            @tap="changTab(2)"
          >捡到</div>
          <div
            :class="{'selected':tab === 3,'testTitle':true}"
            @tap="changTab(3)"
          >丢失</div>
        </div>
        <div class="list_concent" >
          <div v-if="tab===1" >
            <lists v-for="(item, index) in allContent" :key="index" :item="item"></lists>
          </div>
          <div v-if="tab===2" >
            <lists v-for="(item, index) in pickItems" :key="index" :item="item"></lists>
          </div>
          <div v-if="tab===3" >
            <lists v-for="(item, index) in loseItems" :key="index" :item="item"></lists>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lists from '../../components/index_list/index_list'
import requestData from '../../requestUrl/requestData'
export default {
  data(){
    return{
      tab: 1,
      hot_label:[], //热门标签数组
      allContent:[], //全部信息数组
      pickItems: [], //捡到信息数组
      loseItems: [], //丢失信息数组
      pageNum: 1, //全部信息-页码
      pageNumP: 1, //捡到-页码
      pageNumL: 1, //丢失-页码
      hotLabel1: 1, //控制热门标签是否显示
      hotLabel2: 1, //控制热门标签是否显示
      hotLabel3: 1, //控制热门标签是否显示
    }
  },
  components:{
    lists
  },
  methods:{
    toSearch(){
       wx.navigateTo({
        url: '/pages/search/main'
      })
    },
    changTab(index) {
      this.tab = index
      let that = this
      if(index == 2){
        if(that.pickItems[0] == null){
          that.requestPickData()
        }
      }else if(index == 3){
        //获取丢失信息
        if(that.loseItems[0] == null){
          that.requestLoseData()
        }
      }
    },
    //获取捡到信息
    requestPickData(){
      let that = this
      this.popLoading(1,1,'pickTotalList',function(res){
        that.pickItems = res
      })
    },
    //获取丢失信息
    requestLoseData(){
      let that = this
      this.popLoading(2,1,'loseTotalList',function(res){
        that.loseItems = res
      })
    },
    //获取首页全部信息
    requestMainData(){
      let that = this
      this.popLoading(0,1,'mainTotalList',function(res){
        that.allContent = res
      })
    },
    //获取热门标签
    requestHotLabelData(){
      let that = this
      requestData.requestLoading('https://chendongnan.vip/cywq/message/getHotLabel',"","",'GET',function (res) {
        console.log(res.data)
        if(res.data[0] == null){
          that.hotLabel1 = 0
          that.hotLabel2 = 0
          that.hotLabel3 = 0
          console.log('没有热门标签')
          // return
        }else if(res.data[1] == null){
          that.hotLabel1 = 1
          that.hotLabel2 = 0
          that.hotLabel3 = 0
          console.log('只有一个热门标签')
          that.hot_label = res.data[0]
          // return
        }else if(res.data[2] == null){
          that.hotLabel1 = 1
          that.hotLabel2 = 1
          that.hotLabel3 = 0
          console.log('只有两个热门标签')
          that.hot_label = res.data
          // return
        }else{
          that.hotLabel1 = 1
          that.hotLabel2 = 1
          that.hotLabel3 = 1
          that.hot_label = res.data
        }
      })
    },
    //跳转到热门标签页面
    to_hot(index){
      wx.navigateTo({
        url: '/pages/hot_label/main?label='+this.hot_label[index].labelName+'&labelId='+this.hot_label[index].labelId
      })
    },
    //上拉加载时触底的提示信息
    showToast(){
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        duration: 1000
      })
    },
    //上拉加载获取信息+获取全部信息+获取捡到信息+获取丢失信息函数封装
    popLoading(types,pageNums,storageName,success){
      let that = this
      let DataLoading = {
        type: types,
        pageNum: pageNums,
        pageSize: 6,
      }
      requestData.requestLoading('https://chendongnan.vip/cywq/message/getMessageList',DataLoading,'加载中...','GET',function (res) {
        // console.log(res)
        wx.setStorageSync(storageName,res.data.total)
        console.log(res.data.list)
        success(res.data.list)
      })
    },
    //全部信息上拉加载函数
    mainLoading(){
      let that = this
      that.pageNum += 1
      console.log(that.pageNum)
      this.popLoading(0,that.pageNum,'mainTotalList',function (res) {
        for(let i = 0;i<res.length;i++){
          that.allContent.push(res[i])
        }
        console.log(that.allContent)
      })
    },
    //捡到信息上拉加载函数
    pickLoading(){
      let that = this
      that.pageNumP += 1
      console.log(that.pageNumP)
      this.popLoading(1,that.pageNumP,'pickTotalList',function (res) {
        for(let i = 0;i<res.length;i++){
          that.pickItems.push(res[i])
        }
        console.log(that.pickItems)
      })
    },
    //丢失信息上拉加载函数
    loseLoading(){
      let that = this
      that.pageNumL += 1
      console.log(that.pageNumL)
      this.popLoading(2,that.pageNumL,'loseTotalList',function (res) {
        for(let i = 0;i<res.length;i++){
          that.loseItems.push(res[i])
        }
        console.log(that.loseItems)
      })
    },
    //上拉加载判断的函数封装
    paging(storageName,content,tabNum,success){
      let that = this
      let TotalList = wx.getStorageSync(storageName)
      let lengthes = content
      if(lengthes == TotalList && that.tab == tabNum){
        that.showToast()
      }else if(that.tab == tabNum){
        // that.mainLoading()
        success()
      }
    }
  },
  onLoad(){
    this.requestMainData()
    this.requestHotLabelData()
  },
  onShow(){
    // console.log('onShow获取数据')
    this.requestMainData()
    this.requestHotLabelData()
  },
  onHide(){
    // console.log('隐藏页面')
    this.pageNum = 1
    this.pageNumL = 1
    this.pageNumP = 1
  },
  //下拉刷新
  onPullDownRefresh(){
    console.log('下拉刷新')
    this.requestMainData()
    this.requestHotLabelData()
    wx.stopPullDownRefresh()
  },
  //上拉加载
  onReachBottom(){
    let that = this
    this.paging('mainTotalList',that.allContent.length,1,function(){
      that.mainLoading()
    })
    this.paging('pickTotalList',that.pickItems.length,2,function(){
      that.pickLoading()
    })
    this.paging('loseTotalList',that.loseItems.length,3,function(){
      that.loseLoading()
    })
  },
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .topBox{
    width: 100%;
    height: 400rpx;
  }
  .topBox img{
    width: 100%;
    height: 400rpx;
  }
  .papulation{
    width: 98%;
    margin: 10rpx 1%;
    border: 1rpx solid #ccc;
    box-shadow: 1px 1px 1px #ccc;
    box-sizing: border-box;
    border-radius: 10rpx;
    background: white;
  }
  .papulation_label{
    font-size: 36rpx;
    font-weight: bold;
    margin: 30rpx 0 10rpx 20rpx;
  }
  .papulation_con{
    display: flex;
    margin: 0 0 15rpx 0;
  }
  .papulation_con p{
    padding: 0 5rpx;
    border-radius: 5rpx;
    margin: 0 20rpx;
    font-size: 28rpx;
    background: #fbde8f;
    color: white;
  }
  .help{
    font-size: 24rpx;
    color: red;
    display: flex;
    justify-content: flex-end;
    margin: 15rpx 50rpx 15rpx 0;
  }
  .searchBox{
    display: flex;
    justify-content: center;
    width: 98%;
    height: 80rpx;
    border:1rpx solid #eee;
    border-radius: 30rpx;
    margin: 10rpx 1%;
    line-height: 80rpx;
    font-size: 24rpx;
  }
  .searchBox img{
    width: 60rpx;
    height: 60rpx;
    margin: 10rpx 0;
  }
  .test {
    width: 100%;
  }
  .testNav {
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
  }
  .testTitle {
    padding: 0 25rpx;
    font-size: 36rpx;
    color:#ccc;
    text-align: center;
  }
  .selected {
    color: #fbde8f;
    border-bottom: 1px solid #fbde8f;
  }
</style>
