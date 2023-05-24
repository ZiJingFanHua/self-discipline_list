// pages/addTalk/addTalk.js
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  commit(e){
   console.log(e.detail.value.talk);
   let data = {
     content:e.detail.value.talk,
     publishId:wx.getStorageSync('id')
   }
   let url = '/subject/addSubject';
   util.request(url,data,'post').then((res) => {
     console.log(res);
     if(res.data.code == 200){
      wx.showToast({
        title: '发表成功！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 500,  // 提示窗停留时间，默认1500ms
        mask:true,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.switchTab({
              url: '../community/community',
            })
          }, 500) //延迟时间
        }
      })
     }
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})