<template>
  <div class="information_container">
    <img class="avatar" :src="selfInfo.avatar" alt="">
    <p class="nickName">{{ selfInfo.nickName }}</p>
    <div v-if="tab === 1" class="information">
      <p>你的学校：<input @input="schools" placeholder="请填写你的学校" :value="informations.school" placeholder-style="font-size:30rpx;color:#ccc" type="text"></p>
      <p>你的专业：<input @input="majors" placeholder="请填写你的专业" :value="informations.major" placeholder-style="font-size:30rpx;color:#ccc" type="text"></p>
      <p>联系方式：<input @input="phoneNums" placeholder="请输入手机号码" :value="informations.phoneNum" placeholder-style="font-size:30rpx;color:#ccc" type="text"></p>
    </div>
    <div v-else class="show_box">
      <p>你的学校：<span>{{informations.school}}</span></p>
      <p>你的专业：<span>{{informations.major}}</span></p>
      <p>联系方式：<span>{{informations.phoneNum}}</span></p>
    </div>
    <button v-if="tab === 1" @tap="save_change" class="save">保存</button>
    <button v-if="tab === 0" @tap="save_change" class="save">修改</button>
  </div>
</template>

<script>
import requestData from '../../requestUrl/requestData'
export default {
  data(){
    return{
      tab:"",
      selfInfo: {},
      informations:{}, //查看个人信息的大对象
    }
  },
  onLoad(options){
    this.selfInfo = {
      nickName: options.nickName,
      avatar: options.avatar
    }
    this.requestImfo()
  },
  methods:{
    schools(e){
      console.log(e.mp.detail.value)
      this.informations.school = e.mp.detail.value
    },
    majors(e){
      console.log(e.mp.detail.value)
      this.informations.major = e.mp.detail.value
    },
    phoneNums(e){
      console.log(e.mp.detail.value)
      this.informations.phoneNum = e.mp.detail.value
    },
    //请求个人信息函数
    requestImfo(){
      let that = this
      //进入页面先请求查看个人信息接口
      requestData.requestLoading('https://chendongnan.vip/cywq/user/getUserInfo',"","",'GET',function (res) {
        console.log(res)
        if(res.data.major == ""){
          that.tab = 1 //如果请求回来的数据为 空，说明没有完善过信息，就需要直接显示完善个人信息页面
        }else{
          that.tab = 0 //如果数据不为空，直接显示查看个人信息页面
          that.informations = res.data
        }
      })
    },
    //修改个人信息函数
    save_change(){
      let that = this
      if(this.tab == 1){
        let changeSelfInfo = {
          userName: '无',
          school: that.informations.school,
          major: that.informations.major,
          phoneNum: that.informations.phoneNum
        }
        //修改资料请求
        requestData.requestLoading('https://chendongnan.vip/cywq/user/addUserInfo',changeSelfInfo,"",'POST',function (res) {
          console.log(res)
          that.requestImfo() //修改成功再调用查看个人信息函数
          that.tab = 0 //修改成功把按钮和页面改为查看个人信息页面
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1000
          })
        })
      }else{
        this.tab = 1
      }
    }
  }
}
</script>

<style scoped>
  .information_container{
    display: flex;
    flex-direction: column;
  }
  .avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 50rpx auto;
  }
  .nickName{
    font-size: 40rpx;
    font-weight: bold;
    margin: 0 auto;
    margin-top: -20rpx;
  }
  .information{
    margin: 100rpx 0 0 0;
    border: 1rpx solid #eee;
    border-top: none;
    width: 100%;
    height: 249rpx;
  }
  .information p{
    line-height: 80rpx;
    top: -1rpx;
    width: 100%;
    height: 80rpx;
    border-top: 1rpx solid #eee;
    text-align: center;
  }
  .information p input{
    line-height: 80rpx;
    height: 80rpx;
    float: right;
    width: 60%;
    margin-right: 100rpx;
  }
  .save{
    width: 90%;
    font-size: 36rpx;
    height: 90rpx;
    margin-top: 300rpx;
    background: #fbde8f;
  }
  .show_box{
    margin: 100rpx 0 0 0;
    border-top: none;
    width: 100%;
    height: 249rpx;
  }
  .show_box p{
    line-height: 80rpx;
    top: -1rpx;
    width: 100%;
    height: 80rpx;
    margin-top: 1rpx;
    text-align: center;
  }
  .show_box span{
    line-height: 80rpx;
    height: 80rpx;
    float: right;
    width: 70%;
  }
</style>
