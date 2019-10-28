let app = getApp();


//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
let domain = app.globalData.serviceurl ;
let url = domain + '/login';
let test = domain + '/welcome';

Page({
    data:{
        corpId: '',
        authCode:'',
        dingUserId:'',
        dingUserName:'',
        hideList: true,
    },
    loginSystem() {
        dd.showLoading();
        dd.getAuthCode({
            success:(res)=>{
               console.log("httpRequest  ffs---",res)
                this.setData({
                    authCode:res.authCode
                })
                //dd.alert({content: "step1"});
                dd.httpRequest({
                    url: url,
                    method: 'POST',
                    data: {
                        authCode: res.authCode
                    },
                    dataType: 'json',
                    success: (res) => {
                        // dd.alert({content: "step2"});
                        console.log('success----',res)
                        app.globalData.dingUserId = res.data.result.dingUserId;
                        app.globalData.dingUserName = res.data.result.dingUserName;
                    },
                    fail: (res) => {
                        console.log("httpRequestFail---",res)
                       dd.alert({content: JSON.stringify(res)});
                    },
                    complete: (res) => {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                // dd.alert({content: "step3"});
                dd.hideLoading();
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })

    },
    showLateList(){
      
      dd.navigateTo({url:'/page/lateList/lateList'});
    },
    showNosignList(){
      dd.navigateTo({url:'/page/nosignList/nosignList'});
    },
    showException(){
      dd.navigateTo({url:'/page/subsidyList/subsidyList'});
    },
    showMeetingList() {
      dd.navigateTo({url:'/page/meetingQuery/meetingQuery'});
    },
    showMeeting(){
      dd.navigateTo({url:'/page/meeting/meeting'});
    },
    onLoad(){
        let _this = this;

        if (app.globalData.dingUserId == ''){
           this.loginSystem();
        }
        
        //dd.alert({content: "step1"});
       
    }
})