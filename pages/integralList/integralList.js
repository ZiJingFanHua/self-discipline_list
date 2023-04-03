// pages/integraList/integralList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:[['2020','2021'],['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月']],
    secTime:'2022-06',
  },
  //修改选择内容
  bindPickerChange(e){
    let type = e.currentTarget.dataset.type;
    if(type == 'integral'){
      this.setData({
        secIntegralType:this.data.integralType[e.detail.value],
      })
    }else if(type == 'time'){
      this.setData({
       secTime:this.data.date[0][e.detail.value[0]]+'-'+(this.data.date[1][e.detail.value[1]].slice(0,2)),
      })
      this.getList(this.data.date[0][e.detail.value[0]],this.data.date[1][e.detail.value[1]].slice(0,2));
    }
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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