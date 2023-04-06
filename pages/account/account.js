// pages/account/account.js
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{
        name:'紫荆',
        days:10,
      avatarUrl:'/assets/img/tabBar/account1.png',
      }
  },
  //登录
  login(){
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
          console.log("sss");
          if(res.data.data.nickname == null){
            this.getUserPrpfile();
            this.getIntegralAndDays();
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
        }
        }
          console.log(res);
          that.setData({
            isLogin :!that.data.isLogin
          })
          // resolve(res);
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
    console.log(1);
    let type = e.currentTarget.dataset.type;
    let url = '';
    if(type == 'integralList'){
      url='../integralList/integralList'
    }else if(type == 'setting'){
      url = '../setting/setting'
    }
    console.log(url);
    wx.navigateTo({
      url: url,
    })
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