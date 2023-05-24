// pages/account/account.js
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{
        nickName:'',
        days:-1,
        total:0,
      avatarUrl:'/assets/img/tabBar/account1.png',
      },
      task:{},
      logining:false
  },
  //登录
  login(){
    this.showLogin();
    var that = this;
    console.log('sss');
    new Promise((resolve, reject)=>{
      wx.login({
        timeout: 10000,
        success(res){
          console.log(res);
          that.setData({
            code : res.code
          })
          resolve(res.code);
        },
        fail(res){
          console.log('登陆失败');
          reject(res);
        }
      })
    }).then(code=>{
      const url = '/userinfo/weChatLogin';
      console.log(code);
      var data={
        js_code:code
      }
      util.request(url,data).then((res)=>{
        if(res.data.code == 200){
          wx.setStorageSync('id',res.data.openid);
          wx.setStorageSync('token',res.data.token);
          wx.setStorageSync('skey',res.data.session_key);
          if(res.data.data.nickname == null){
            this.getUserPrpfile();
          }else{
          this.setData({
            userInfo:{
              nickName:res.data.data.nickname,
              avatarUrl:res.data.data.headPhoto,
              motto:res.data.data.motto,
              gender:res.data.data.sex,
              days:res.data.data.days,
              achievePoints:res.data.data.achievePoints
            }
          })
          wx.setStorageSync('userInfo',this.data.userInfo);
          let setNowTime = Date.now() + 3600 *1000 *24 *30 //30天有效期
          wx.setStorageSync("userInfoStorageTime", setNowTime);
        }
        }
          console.log(res);
          that.setData({
            isLogin :!that.data.isLogin
          })
          this.getOtherMessage();
      }
      ).catch((error)=>{
        console.log(error);
      })
    })
  },


  //获取用户信息
  getUserPrpfile(){
    var that = this;
    wx.showModal({
      title: "提示",
      content:"是否允许获取微信昵称和头像？",
      success(res){
        if(res.confirm){
            wx.getUserProfile({
              desc: '用于完善用户信息',
              success: (res) =>{
                // app.globalData.usrInfo = res.userInfo;
                let userInfo = res.userInfo;
                userInfo.days = 0;
                userInfo.achievePoints = 0;
                that.setData({
                  userInfo:userInfo
                });
                console.log(that.data.userInfo);
                wx.setStorageSync('userInfo',res.userInfo);
                let setNowTime = Date.now() + 3600 *1000 *24 *30 //30天有效期
                wx.setStorageSync("userInfoStorageTime", setNowTime);
                
                let data  = {
                  nickname:that.data.userInfo.nickName,
                  headPhoto:that.data.userInfo.avatarUrl,
                  id:wx.getStorageSync('id')
                }

                let url = '/userinfo/setUserInfo'
                util.request(url,data,'post').then((res)=>{
                 })
              },
              fail: function (err) {
                console.log(err);
              },
            })
        }
      }
    })
    // wx.getUserInfo({
    //   lang: lang,
    // })
  },
  //查询积分与天数
  getIntegralAndDays(){
    let user = this.data.userInfo;
    let url = '/userinfo/getMessage';
           let data = {
             userId:wx.getStorageSync('id')
           }
           console.log(data);
           util.request(url,data,'get').then((res)=>{
            user.achievePoints = res.data.data.achievePoints;
            user.days = res.data.data.days;
            this.setData({
              userInfo:user
            })
           })
  },

  //前往页面
  goTo(e){
    let type = e.currentTarget.dataset.type;
    let url = '';
    if(type == 'integralList'){
      let set = e.currentTarget.dataset.set;
      url='../integralList/integralList?set='+set
    }else if(type == 'setting'){
      url = '../setting/setting'
    }else if(type == 'calendar'){
      url = '../calendar/calendar'
    }else if (type == 'task'){
      wx.switchTab({
        url: '../task/task',
      })
    }else if (type == 'publish'){
      url = '../selfTalk/selfTalk?type='+type;
    }else if(type == 'reply'){
      url = '../replyList/replayList'
    }else if(type == 'likes'){
      url = '../selfTalk/selfTalk?type='+type;
    }
    console.log(url);
    let id = wx.getStorageSync('id');
    if(id||type == 'setting')
    wx.navigateTo({
      url: url,
    })
    else
    wx.showToast({
      title: '未登录',
      icon:'error',
      duration:1500
    })
  },

  //获取用户页面其他信息
  getOtherMessage(){
  let userId  = wx.getStorageSync('id');
  let url = '/userinfo/getAccountMessage';
  util.request(url,{userId},'get').then((res) => {
    console.log(res);
    let userInfo = this.data.userInfo;
    userInfo.days = res.data.data.days;
    userInfo.total = res.data.data.total;
    userInfo.talkNums = res.data.data.talkNums;
    userInfo.comments = res.data.data.comments;
    userInfo.likes = res.data.data.likes;
    this.setData({
      userInfo:userInfo,
      task:res.data.data.task
    })
  })
  },

  /**
   * 展示登录窗口
   */
  showLogin(){
    console.log(this.data.logining);
    this.setData({
      logining:!this.data.logining
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo);
    if(userInfo){
      this.setData({
        userInfo:userInfo,
      });
      this.getOtherMessage();
    }
  },
  // 判断是否展示登录窗口
  isShowLogin(){
  let id = wx.getStorageSync('id');
  if(!id)
    this.showLogin();
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
    let userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo)
    if(userInfo){
      this.setData({
        userInfo:userInfo,
      });
      this.getOtherMessage();
    }else{
      this.setData({
        userInfo:{
          nickName:'',
          days:-1,
          total:0,
        avatarUrl:'/assets/img/tabBar/account1.png',
        },
        task:{},
      })
    }
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