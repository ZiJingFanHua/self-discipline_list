// pages/talk-detailed/talk-detailed.js
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:'',
  content:'',
  subject:{},
  commentList:[],
  type:1,
  commentId:0,
  replay:{
    id:'',
    name:'',
    user:''
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let commentId = options.commentId;
    console.log(id+'-------------');
    console.log(commentId+'------------------');
    this.setData({
      id:id,
      commentId:commentId
    });
    console.log(id);
    this.getSubject();
    this.getComment();
  },
  //获取话题详情
  getSubject(){
    let url = '/subject/getSubject';
    let SubjectId = this.data.id;
    let id = wx.getStorageSync('id')
  util.request(url,{SubjectId,id},'get').then((res) =>{
    console.log(res);
    this.setData({
      subject:res.data.data
    })
  })
  },
 
  //获取评论
  getComment(){
    let url = '';
    let data = {};
    if(!this.data.commentId){
     url = '/comment/getCommentList';
     data = {
        "type":this.data.type,
        "subjectId":this.data.id,
        "id":wx.getStorageSync('id')
    }
  }else{
     url = '/comment/getReplyById';
     data = {
      "commentId":this.data.commentId,
      "id":wx.getStorageSync('id')
  }
  }
  util.request(url,data,'get').then((res) =>{
    console.log(res);
    this.setData({
      commentList:res.data.data
    })
  })
  },
  bindMessage(e){
   this.setData({
    content:e.detail.value,
   })
   console.log(e.detail.value);
  },
  //添加评论
  addComment(e){
  let url = '/comment/addComment';
  let data = {
    subjectId:this.data.id,
    commenterId:wx.getStorageSync('id'),
    content:this.data.content,
    formId:this.data.replay.user,
    formCommentId:this.data.replay.id
  }
  // console.log(e.detail.value);
  util.request(url,data,'post').then((res) =>{
        console.log(res);
        this.getComment();
  })
  this.clean();
  },
  //取消
  clean(){
    this.setData({
      replay:{
        id:'',
        name:'',
        user:''
      }
    })
  },
  // 改变类型
  changeType(e){
  let type =  e.currentTarget.dataset.type;
  this.setData({
    type:type
  });
  this.getComment();
  },
  //回复
  replay(e){
    let id =  e.currentTarget.dataset.id;
    let name =  e.currentTarget.dataset.name;
    let user =  e.currentTarget.dataset.user;
    this.setData({
      replay:{
        id:id,
        name:name,
        user:user
      }
    })
  },
  // 点赞
  toLike(e){
    let url = '/like/addLike';
    let type = e.currentTarget.dataset.type;
    let data = {
      "accountId":wx.getStorageSync('id'),
    };
    if(type == 'subject'){
      data.subjectId = e.currentTarget.dataset.id;
    }else{
      data.commentId = e.currentTarget.dataset.id;
    }
    let that = this;
    util.request(url,data,'post').then((res) =>{
      console.log(res);
      that.getSubject();
      that.getComment();
})
  },

  deleteLike(e){
    let url = '/like/deleteLike';
    let type = e.currentTarget.dataset.type;
    let data = {
      "accountId":wx.getStorageSync('id'),
    };
    if(type == 'subject'){
      data.subjectId = e.currentTarget.dataset.id;
    }else{
      data.commentId = e.currentTarget.dataset.id;
    }
    let that = this;
    util.request(url,data,'post').then((res) =>{
      console.log(res);
      that.getSubject();
      that.getComment();
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
    if(e.from == 'button'){
      let id = this.data.id;
       return {
         title:'测试分享',
         path:'/pages/talk-detailed/talk-detailed?id='+id
       }
    }
  }
})