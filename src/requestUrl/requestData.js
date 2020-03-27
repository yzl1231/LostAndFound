export default {
    // url:需要请求的url
    // params:请求的参数
    // message:请求时的提示信息
    // methods:请求数据类型post或get
    // success:成功的回调函数
    requestLoading(url, params, message, methods, success) {
        // console.log(params)
        if (message != "") {
            wx.showLoading({
                title: message,
            })
        }
        let token = wx.getStorageSync('1')
        wx.request({
            url: url,
            data: params,
            header: {
                'token': token
            },
            method: methods,
            success: function(res) {
                //console.log(res.data)
                if (message != "") {
                    wx.hideLoading()
                }
                success(res.data)
            },
            fail: function(res) {
                if (message != "") {
                    wx.hideLoading()
                }
            }
        })
    }
}
