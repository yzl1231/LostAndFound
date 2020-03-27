<template>
    <div class="test">
      <div class="testNav">
        <div
          :class="{'selected':tab === 1,'testTitle':true}"
          @tap="changTab(1)"
        >拾到</div>
        <div
          :class="{'selected':tab === 2,'testTitle':true}"
          @tap="changTab(2)"
        >丢失</div>
      </div>
      <form report-submit="true" @submit="formSubmit">
        <div class="main_information">
          <p class="main_info_p">
            <span>标题：</span>
            <input @input="getTitle" :value="title"  placeholder="请填写一个合适的标题（不能为空哟）" placeholder-style="color:#eee;" type="text">
          </p>
          <picker @change="bindPickerChange" :value="index" :range="array">
            <view class="picker">
              <span>标签：</span>{{array[index]}}
            </view>
          </picker>
          <p class="main_info_p">
            <span v-if="tab === 1">捡到地点：</span>
            <span v-else>丢失地点：</span>
            <input @input="getAddress" :value="address" v-if="tab===1" placeholder=" 请填写捡到物品的位置" placeholder-style="color:#eee;" type="text">
            <input @input="getAddress" :value="address" v-else placeholder="请填写丢失物品的位置" placeholder-style="color:#eee;" type="text">
          </p>
          <p class="main_info_p">
            <span>联系方式：</span>
            <input @input="getContactWay" :value="contactWay" placeholder=" 联系方式" placeholder-style="color:#eee;" type="text">
          </p>
          <p class="main_info_p2">
            <span>具体信息：</span>
            <textarea @input="getContent" :value="content" placeholder=" 具体信息" placeholder-style="color:#eee;" cols="6" rows="8"></textarea>
          </p>

          <p class="upLoadImg">上传相关图片，方便您快速找回
            <span>{{upLength}}/3</span>
          </p>
          <div class="pictures">
            <img :src="imgFilePaths[0]" alt="">
            <img :src="imgFilePaths[1]" alt="">
            <img :src="imgFilePaths[2]" alt="">
            <img @tap="chooseImage" src="/static/images/save.jpg" alt="">
          </div>
        </div>
        <p class="sign">最多可以上传3张图片哟。</p>
        <button  form-type="submit" @tap="upLoading" class="release">发布</button>
      </form>

    </div>
</template>

<script>
import requestData from '../../requestUrl/requestData'
export default {
  data() {
    return {
      tab: 1,
      array: ['一卡通', '钥匙', 'U盘', '耳机', '身份证', '眼镜', '学生证', '水杯', '伞', '充电宝', '书', '其他'],
      index: "", //labelId等于index加一
      labelId: "",  //标签id
      title: "",  //标题
      address: "",  //丢失或捡到地址
      contactWay: "",   //联系方式
      content: "",    //具体信息
      formId: {}, //表单的formid
      imgFilePaths: [],  //图片路径数组
    }
  },
  methods: {
    changTab(index) {
      this.tab = index;
    },
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.index = e.mp.detail.value  //标签的索引
      this.labelId = parseInt(e.mp.detail.value) + 1
    },
    //发布参数的标题
    getTitle(e){
      this.title = e.mp.detail.value
      console.log(e.mp.detail.value)
    },
    //发布参数的地址
    getAddress(e){
      this.address = e.mp.detail.value
      console.log(this.address)
    },
    //发布参数的联系方式
    getContactWay(e){
      this.contactWay = e.mp.detail.value
      console.log(this.contactWay)
    },
    //发布参数的具体信息
    getContent(e){
      this.content = e.mp.detail.value
      console.log(this.content)
    },
    //发布参数的formId
    formSubmit(e){
      console.log('form发生了submit事件，携带数据为：', e.mp.detail.formId)
      this.formId = e.mp.detail.formId
    },
    //选择需要发布的本地图片
    chooseImage(e) {
      let that = this;
      let max = 3;		//图片最大选择数
      wx.chooseImage({
        count: max || 3,           //一次最多可以选择的图片张数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          if(res.tempFilePaths.length > max){
            that.$mptoast('图片最多只能选择' + max);
            return false;
          }
          console.log(res)
          that.imgFilePaths = res.tempFilePaths;    //把图片路径数组赋值到全局
          console.log('上传完成，可以提交')
        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          console.log('commplete');
        }
      })
    },
    //提示框
    showToast(msg){
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1000
      })
    },
    //清空输入框函数
    clearMsgArr(){
      this.title = ""
      this.index = ""
      this.address = ""
      this.contactWay = ""
      this.content = ""
    },
    //发布消息（消息里有图片时调用上传图片方法）
    upLoading(){
      let that = this
      if(that.labelId == "" || that.title == null){
        that.showToast('标题和标签不能为空哟')
        return false
      }
      let releaseData = {
        type: that.tab,
        labelId: that.labelId,
        title: that.title,
        address: that.address,
        contactWay: that.contactWay,
        content: that.content,
        formId: that.formId,
      }
      console.log(releaseData)
      requestData.requestLoading('https://chendongnan.vip/cywq/publish/publishMessage',releaseData,'发布中...','POST',function (res) {
        console.log(res)
        if(res.code == 1){
          if(that.imgFilePaths[0]){
            //参数分别是图片数组、图片索引、图片数组长度、消息的messageId
            that.upLoad(that.imgFilePaths,0,that.imgFilePaths.length,res.data);
            // 发布消息成功有图片
          }else{
            // 发布消息成功没有图片
            that.clearMsgArr()
            that.showToast('发布成功') //上传成功提示
          }
        }else{
          that.showToast('发布异常')
        }

      })
    },
    //上传图片函数
    upLoad(imgPath,i,upLength, messageIds){
      let that = this;
      let token = wx.getStorageSync('1') //得到本地的token
      wx.uploadFile({
        url: 'https://chendongnan.vip/cywq/publish/uploadFiles',
        formData: {
          messageId: messageIds,
        },
        filePath: imgPath[i],
        name: 'files',
        header: {
          "token": token
        },
        success: function (res) {
          console.log(res)
          console.log('上传成功' + i);
          that.clearMsgArr() //调用清空输入框函数
          that.imgFilePaths = [] //情况图片数组
        },
        fail: function (res) {
          console.log(res);
          wx.showModal({
            title: '错误提示',
            content: '上传失败',
            showCancel: false,
            success: function (res) { }
          })
        },
        complete: function(){
          i++;
          if(i == upLength){
            that.showToast('发布成功') //上传成功提示
          }else{
            that.upLoad(imgPath,i,upLength,messageIds);
          }
        }
      });
    },
  },
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
  .main_information{
    width: 100%;
    margin: 50rpx 0 0 0;
    border-bottom: 1rpx solid #ccc;
    font-size: 30rpx;
    color: black;
  }
  .main_info_p{
    width: 100%;
    height: 80rpx;
    border-top: 1rpx solid #eee;
    display: flex;
  }
  .main_info_p span{
    width: 20%;
    line-height: 80rpx;
    padding-left: 30rpx ;
  }
  .main_info_p input{
    width: 70%;
    height: 80rpx;
  }
  .picker{
    width: 100%;
    height: 80rpx;
    border-top: 1rpx solid #eee;
    padding: 0 30rpx;
  }
  .picker span{
    line-height: 80rpx;
  }
  .main_info_p2{
    width: 100%;
    height: 160rpx;
    border-top: 1rpx solid #eee;
  }
  .main_info_p2 span{
    display: block;
    width:20%;
    margin-left: 30rpx;
    margin-top: 10rpx;
  }
  .main_info_p2 textarea{
    margin:10rpx 0 0 30rpx;
    width:90%;
    height: 95rpx;
  }
  .upLoadImg{
    width: 98%;
    border-top: 1rpx solid #ccc;
    color: #ccc;
    padding: 10rpx;
  }
  .upLoadImg span{
    float: right;
  }
  .pictures{
    padding: 0 10rpx;
    height: 185rpx;
    overflow: hidden;
  }
  .pictures img{
    margin: 0 5rpx;
    width: 175rpx;
    height: 175rpx;
  }
  .sign{
    font-size: 24rpx;
    color: #ccc;
    margin: 10rpx 0 50rpx 10rpx;
  }
  .choseP{
    font-size: 28rpx;
    line-height: 50rpx;
    width: 200rpx;
    height: 50rpx;
    margin-left: 10rpx;
    margin-top: -50rpx;
  }
  .release{
    width: 50%;
    height: 80rpx;
    margin: 0 25%;
    line-height: 80rpx;
    background: #fbde8f;
  }
</style>
