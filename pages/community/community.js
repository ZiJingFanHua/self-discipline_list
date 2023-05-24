// pages/community/community.js
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'hot',
    talkList:[],
    search:''
    },

  //切换内容
  changeContent(e){
    let type = e.currentTarget.dataset.type;
   this.setData({
     type:type,
   })
   this.getList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getList();
  },
// 获取话题列表
 getList(){
   let type = 0;
   if(this.data.type == 'hot'){
     type = 1;
   }else{
     type = 2;
   }
   let id = wx.getStorageSync('id');
   let url = '/subject/getSubjectList';
   util.request(url,{type,id},'get').then((res)=>{
     console.log(res);
     this.setData({
       talkList:res.data.data
     })
     console.log(res);
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
      that.getList();
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
      that.getList();
})
  },
 //跳转
 goTo(e){
  let type = e.currentTarget.dataset.type;
  if(type == 'message'){
    wx.navigateTo({
      url: '../talk-detailed/talk-detailed?id='+e.currentTarget.dataset.id,
    })
  }else if (type == 'addTalk'){
    wx.navigateTo({
      url: '../addTalk/addTalk',
    })
  }
 },

   //改变搜索内容
   bindinput(e){
    let value = e.detail.value;
    this.setData({
      search : value
    })
 },
 //搜索
 bindconfirm(){
 let url = '/subject/getSubjectListByContent'
 console.log(this.data.search);
 let data = {
   "id": wx.getStorageSync('id'),
   "content": this.data.search
 }
 util.request(url,data,'get').then((res)=>{
    console.log(res);
    this.setData({
      talkList:res.data.data
    })
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
    this.getList();
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