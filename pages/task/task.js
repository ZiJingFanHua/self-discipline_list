// pages/task/task.js
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:'',
    tt:'',
    days:[],
    scroll:'',
    open:false,
    addNewTask:false,
    categorys:["每日任务","每周任务","限时任务"],
    category:"每日任务",
    selectd: 0,
    selection:false,
    tasklsit:[],
    completedTaskList:[],
    newTask:{title:'每日任务',integral:100,category:'每日任务',select:false},
    active:{
      year:'',
      month:'',
      day:''
    },
    now:{
      year:'',
      month:'',
      day:''
    },
    nosign:false,
    notask:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.initHeight();
      this.initDate();
      if(!wx.getStorageSync('id')){
        this.setData({
          nosign:true
        })
        this.setData({
          tasklsit:[],
    completedTaskList:[],
        });
       }else{
         this.getTaskList();
         this.setData({
           nosign:false
         })
       }
    //自动滑动
    this.setData({
      scroll:'now'
    });
  },
  // 初始化高度
  initHeight(){
    //初始化高度
    let res = wx.getSystemInfoSync() ///微信api方法
    let titleH;
    if (res && res['system']) {
        // 判断是否是安卓操作系统 （标题栏苹果为44px,安卓为48px）
      if (res['system'].indexOf('Android') > 0) {
        titleH = 48
      } else {
        titleH = 44
      }
      var tt = wx.getMenuButtonBoundingClientRect();
      var height = (tt.top-res.statusBarHeight)*2+tt.height+res.statusBarHeight;
      this.setData({
        height: height,
        tt:tt
      })
    }

  },
  //初始化日期
  initDate(){
    let date = new Date;
    let month = date.getMonth()+1;
    if(month<10){
      month = '0'+month;
    }
    let year = date.getFullYear();
    let day = date.getDate();
    if(day<10){
     day= '0'+day;
    }
    this.setData({
      now:{
        year:year,
        month:month,
        day:day
      },
      active:{
        year:year,
        month:month,
        day:day
      }
    });
    console.log(this.data.active);
    console.log(this.data.now);
    let days = [];
    for(let i = 0;i<28;i++)
        days.push(this.data.active.year+this.data.active.month+i);


    if(month ==1&&month ==3&&month ==5&&month ==7&&month ==8&&month ==10&&month ==12){
      for(let i = 28;i<31;i++)
      days.push(this.data.active.year+this.data.active.month+i);
      this.setData({
        days : days
      })
    }else if(month ==2){
      if(year%400==0||year%4!=0&&year%100!=0){
        for(let i = 28;i<29;i++)
        days.push(this.data.active.year+this.data.active.month+i);
        this.setData({
          days : days
        })
      }else{
        this.setData({
          days : days
        })
      }
    }else{
      for(let i = 28;i<30;i++)
      days.push(this.data.active.year+this.data.active.month+i);
      this.setData({
        days : days
      })
    };
  },
 //改变日期 
  changedata(e){
  let day = e.currentTarget.dataset.index + 1;
  let active = this.data.active;
  if(day<10)
  active.day ='0'+day;
  else
  active.day =day;
  this.setData({
    active:active,
  });
  this.getTaskList();
  },

  // 是否打开选项框
  isOpen(e){
    var open = e.currentTarget.dataset.open;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if(open){
    this.setData({
      open:true
    })}else{
      this.setData({
        open:false,
        category:this.data.categorys[index]
      })
    }
  },
  //创建新任务
  addNew() {
    console.log('2');
  },
  //是否新建任务
  submit(e){
    var submit = e.currentTarget.dataset.submit;
    console.log("22");
    if(submit == 'false'){

    }else if(submit == 'true'){
      console.log("sss");
      if(this.data.category == '每日任务'){
        var daily = this.data.daily;
        daily.splice(0,0,this.data.newTask);
        this.setData({
          daily:daily
        })
      }else if(this.data.category == '每周任务'){
        var weekly = this.data.weekly;
        weekly.splice(0,0,this.data.newTask);
        this.setData({
          weekly:weekly
        })
      }else if(this.data.category == '限时任务'){
        var timeLit = this.data.timeLit;
        timeLit.splice(0,0,this.data.newTask);
        this.setData({
          timeLit:timeLit
        })
      }
      console.log(this.data.daily);
    }
    this.setData({
      addNewTask:!this.data.addNewTask
    })
  },
  //是否选择任务
  selectTask(e){
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if(type == 'daily'){
      var daily = this.data.daily;
      if(daily[index].select){
        this.setData({
          selectd:this.data.selectd-1
        })
      }else{
        this.setData({
          selectd:this.data.selectd+1
         })
      }
      daily[index].select = !daily[index].select;
      this.setData({
        daily:daily
      })
    }else if(type == 'weekly'){
      var weekly = this.data.weekly;
      if(weekly[index].select){
        this.setData({
          selectd:this.data.selectd-1
        })
      }else{
        this.setData({
          selectd:this.data.selectd+1
         })
      }
      weekly[index].select = !weekly[index].select;
      this.setData({
        weekly:weekly
      })
    }else if(type == 'timeLit'){
      var timeLit = this.data.timeLit;
      if(timeLit[index].select){
        this.setData({
          selectd:this.data.selectd-1
        })
      }else{
        this.setData({
          selectd:this.data.selectd+1
         })
      }
      timeLit[index].select = !timeLit[index].select;
      this.setData({
        timeLit:timeLit
      })
    }
    if(this.data.selectd>0){
      this.setData({
        selection:true
      })
    }else{
      this.setData({
        selection:false
      })
    }
  },
  //改写任务
  setTask(e){
    var type = e.currentTarget.dataset.type;
    if(type == 'task'){
      var newTask = this.data.newTask;
      newTask.title = e.detail.value;
      this.setData({
        newTask:newTask
      })
    }else if(type == 'integral'){
      var newTask = this.data.newTask;
      newTask.integral = e.detail.value;
      this.setData({
        newTask:newTask
      })
    }
  },
  //快捷完成任务
  selectSubmit(e){
  var type = e.currentTarget.dataset.type;
  var i = 0;
  if(type == 'cancel'){
    var daily = this.data.daily;
    for(i=0;i<daily.length;i++){
     daily[i].select = false;
    }
    this.setData({
      daily:daily
    })
    var weekly = this.data.weekly;
    for(i=0;i<weekly.length;i++){
      weekly[i].select = false;
    }
    this.setData({
      weekly:weekly
    })
    var timeLit = this.data.timeLit;
    for(i=0;i<timeLit.length;i++){
      timeLit[i].select = false;
    }
    this.setData({
      timeLit:timeLit
    })
  }
  this.setData({
    selection:false
  })
  },
 // 跳转到添加任务页面
 addNewTask(){
   wx.navigateTo({
     url: '../addTask/addTask',
   })
 },
  //回到当前日期
  backNow(){

    //     this.setData({
    //   scroll:''
    // })
    // let active = this.data.active;
    let active = {
      year:this.data.now.year,
      month:this.data.now.month,
      day:this.data.now.day,
    }
    console.log(active);
    this.setData({
      active:active,
      // scroll:'now'
    })
    this.getTaskList();
    this.setData({
      scroll:'now'
    })
  },

  //获取任务列表
  getTaskList(){
    let url = "/parentTask/tasklist";
    let data = {
      "deadTime": this.data.active.year+'-'+this.data.active.month+'-'+this.data.active.day,
      "userId": wx.getStorageSync('id')
    }
    console.log(wx.getStorageSync('id'));
    util.request(url,data).then((res)=>{
      this.setData({
        tasklsit:res.data.unCompletedTaskList,
        completedTaskList:res.data.completedTaskList
      })
      if(!res.data.unCompletedTaskList[0]&&!res.data.completedTaskList[0]){
        this.setData({
          notask:true
        })
      }else{
        this.setData({
          notask:false
        })
      }
    })
  },

  //修改任务完成
  edittask(e){
  
    let date = new Date;
    parseInt(this.data.active.month);
    console.log(date.getMonth());
    console.log(parseInt(this.data.active.month)!=date.getMonth());
    if(parseInt(this.data.active.year)!=date.getFullYear()||parseInt(this.data.active.month)!=date.getMonth()+1||parseInt(this.data.active.day)!=date.getDate()){
    wx.showToast({
      title: '截止日期已过',
      icon: 'error',  // 图标类型，默认success
      duration: 1500  // 提示窗停留时间，默认1500ms
    })
    return null;
  }

  let type = e.currentTarget.dataset.type;
  let index = e.currentTarget.dataset.index;
  let taskType = e.currentTarget.dataset.task;
  let data = '';
  let url='';
  let that = this;
  console.log(type);
    if(type == 'sub'){
      let childindex =e.currentTarget.dataset.childindex
      url = '/subtask/missionAccomplished?id='+this.data.tasklsit[index].subtasks[childindex].id;
    }else if(type == 'main'){
      url = '/parentTask/missionAccomplished?id='+this.data.tasklsit[index].id;
    }
    util.request(url,data).then((res)=>{
      console.log(res);
      that.getTaskList();
    })
  },


  //改变日期
  bindDateChange(e){
    console.log(e.detail);
    let value = e.detail.value;
    let month = value.slice(5,7);
    let days=[];
    this.setData({
      active: {
        year:value.slice(0,4),
        month:value.slice(5,7),
        day:value.slice(8,10)
      },
    })
    for(let i = 0;i<28;i++)
    days.push(this.data.active.year+this.data.active.month+i);
    if(month ==1&&month ==3&&month ==5&&month ==7&&month ==8&&month ==10&&month ==12){
      for(let i = 28;i<31;i++)
      days.push(this.data.active.year+this.data.active.month+i);
      this.setData({
        days : days
      })
    }else if(month ==2){
      if(this.data.active.year%400==0||this.data.active.year%4!=0&&this.data.active.year%100!=0){
        for(let i = 28;i<29;i++)
        days.push(this.data.active.year+this.data.active.month+i);
        this.setData({
          days : days
        })
      }else{
        this.setData({
          days : days
        })
      }
    }else{
      for(let i = 28;i<30;i++)
      days.push(this.data.active.year+this.data.active.month+i);
      this.setData({
        days : days
      })
    };
    this.setData({
      scroll:'active',
    })
    console.log(this.data.active);
    this.getTaskList();
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
      tasklsit:[],
      completedTaskList:[]
    })
    if(!wx.getStorageSync('id')){
     this.setData({
       nosign:true
     })
    }else{
      this.getTaskList();
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