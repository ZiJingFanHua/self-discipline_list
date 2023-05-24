// pages/integraList/integralList.js
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:[['2020','2021'],['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月']],
    secTime:'2022-06',
    integralList:[],
    income:0,
    expenditure:0,
    total:0,
    type:0,
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


  //获取积分详情列表
  getList(year,month){
    let url='/pointsDetails/getArchiveBydate';
    let data ={
       year:year,
       month:month,
       userId:wx.getStorageSync('id'),
       type:this.data.type
    };
    util.request(url,data).then((res)=>{
      console.log(res);
     this.setData({
      integralList:res.data.data.pointsDetails.map((item)=>{
        return{
        integral:item.changeAmount,
        title:item.event,
        time:item.occurringTime
        }
      }),
      income:res.data.data.totalRevenue,
      expenditure:res.data.data.totalSpending,
      total : res.data.data.total
     })
    })
  },
  getYears(){
    let url='/pointsDetails/archive?userId='+wx.getStorageSync('id');

    let data ={
      userId:wx.getStorageSync('id')
    };
    util.request(url,data).then((res)=>{
     let date = [];
      date.push(res.data.data);
      date.push(this.data.date[1]);
      this.setData({
        date : date
      })
    })
  },

  //修改类型
  changeType(e){
    let type = e.currentTarget.dataset.type;
    this.setData({
      type:type
    })
    let date = new Date();
    let year = date.getFullYear()+'';
    let month = date.getMonth()+1+'';
    if(month<10){
      month = '0'+month;
    }
    this.getList(year,month);
  },

  goTo(){
    wx.switchTab({
      url: '../task/task',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
    type:options.set
    });


    let date = new Date();
    let year = date.getFullYear()+'';
    let month = date.getMonth()+1+'';
    if(month<10){
      month = '0'+month;
    }
    this.getList(year,month);
    this.setData({
      secTime:year +'-' +month
    }),
    this.getYears();
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