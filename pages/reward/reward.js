// pages/reward/reward.js
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewardList:[
  ],
  selectReward:'',
  search:'',
  nosign:false,
  noreward:false
  },
  selectReward(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      selectReward:this.data.rewardList[parseInt(e.currentTarget.dataset.index)]
    })
    var that = this;
    console.log(this.data.selectReward);
    wx.showModal({
      title: "提示",
      content:"是否兑换"+that.data.selectReward.description,
      success(res){
        if(res.confirm){
            let url = '/award/exchangeaward';
            let data = {
               userId: wx.getStorageSync('id'),
               awardId:that.data.selectReward.id
            }
            console.log(data);
            util.request(url,data).then((res)=>{
             if(res.data.code == 200){
               that.getRewardList();
               wx.showToast({
                title: '兑换成功！', // 标题
                icon: 'success',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
             }else{
                wx.showToast({
                title: '积分不足！', // 标题
                icon: 'error',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
             }
            }).catch((res)=>{
              wx.showToast({
                title: '兑换失败！', // 标题
                icon: 'error',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
            })
        }
      }
    })
  },
  submit(e){
     var select = e.currentTarget.dataset.select;
     if(select == 'cancel') {
       this.setData({
         selectReward:''
       })
     }else if(select = 'determine'){
      this.setData({
        selectReward:''
      })
     }
  },
  //新建奖励
  addReward(){
    console.log(1);
  wx.navigateTo({
    url: '../addReward/addReward',
  })
  },

  //得到奖励列表
  getRewardList(){
    let url = '/award/getawardlist?userId='+wx.getStorageSync('id');
    util.request(url,'').then((res) =>{
      console.log(res);
      this.setData({
        rewardList : res.data.data
      })
      if(!res.data.data[0]){
        this.setData({
          noreward:true
        })
      }else{
        this.setData({
          noreward:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!wx.getStorageSync('id')){
      this.setData({
        nosign:true
      })
     }else{
      this.getRewardList();
       this.setData({
         nosign:false
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
  let url = '/award/searchAward'
  let data = {
    "description": this.data.search,
  "userId": wx.getStorageSync('id')
  }
  util.request(url,data).then((res)=>{
    this.setData({
      rewardList : res.data.data
    })
    if(!res.data.data[0]){
      this.setData({
        noreward:true
      })
    }else{
      this.setData({
        noreward:false
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
    this.setData({
      rewardList:[]
    })
    if(!wx.getStorageSync('id')){
      this.setData({
        nosign:true
      })
     }else{
      this.getRewardList();
       this.setData({
         nosign:false
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