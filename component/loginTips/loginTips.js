// component/loginTips/loginTips.js
// author 紫荆
const util = require('../../utils/util');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:true,
    code:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeTips:function(){
       this.setData({
         show : !this.data.show
       })
    },
    login:function(){
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
            reject();
          }
        })
      }).then((code)=>{
        const url = '';
        console.log(code);
        var data={
          code:code
        }
        // util.request(url.data).then((res)=>{
        //   if(res.data.code == 200){
        //     console.log("sss");
        //   }
        // })
      })
    }
  }
})
