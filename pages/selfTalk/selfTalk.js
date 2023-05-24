// pages/selfTalk/selfTalk.js
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talkList:[],
    type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    console.log(options.type);
    this.setData({
      type:type
    })
   this.getTalkList();
  },

  getTalkList(){
    console.log(this.data.type);
    let url = "";
    if(this.data.type == 'likes')
     url = '/subject/getSubjectListByLike';
    else
    url = '/subject/getSubjectListById';
   let id =wx.getStorageSync('id');
    util.request(url,{id},'get').then((res) =>{
      console.log(res);
      this.setData({
        talkList:res.data.data
      })
    })
  },
    // 点赞
    toLike(e){
      let url = '/like/addLike';
      let data = {
        "accountId":wx.getStorageSync('id'),
        "commentId":"",
        "subjectId":e.currentTarget.dataset.id
      };
      let that = this;
      util.request(url,data,'post').then((res) =>{
        console.log(res);
        that.getTalkList();
  })
    },
  
    deleteLike(e){
      let url = '/like/deleteLike';
      let data = {
        "accountId":wx.getStorageSync('id'),
        "commentId":"",
        "subjectId":e.currentTarget.dataset.id
      };
      let that = this;
      util.request(url,data,'post').then((res) =>{
        console.log(res);
        that.getTalkList();
  })
    },
  //跳转
  goTo(e){
    let type = e.currentTarget.dataset.type;
    if(type == 'message'){
      wx.navigateTo({
        url: '../talk-detailed/talk-detailed?id='+e.currentTarget.dataset.id,
      })
    }
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
  onShareAppMessage: function (e) {
    if(e.from == 'button'){
      let id = e.target.dataset.id;
       return {
         title:'测试分享',
         path:'/pages/talk-detailed/talk-detailed?id='+id
       }
    }
  }
})