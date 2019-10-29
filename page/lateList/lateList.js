
let app = getApp();


Page({
  data: {
    date: app.globalData.sysdate,
    items: [],
    totalMinutes: 0
  },

  datePick: function () {
    dd.datePicker({
      format: 'yyyy-MM',
      startDate:app.globalData.startDate,
      endDate:app.globalData.sysdate,
      currentDate: this.data.date,
      success: (res) => {
        this.setData({
          date: res.date
        });
      },
    });
  },

  queryLateList: function () {

    let dateStr = this.data.date.split("-");
    if(dateStr.length != 2){
      dd.alert({ content: '请选择时间' });
      return;
    }
    let url = app.globalData.serviceurl + '/statistics/late/list?month=' + dateStr[1] + '&year=' + dateStr[0]+'&userid=' + app.globalData.dingUserId;
    dd.showLoading();
    dd.httpRequest({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        // dd.alert({content: "step2"});
        if (res.data.code == 200) {

          let result = res.data.result;
          console.log('success----',result);
          if(result.late.length == 0){
             dd.alert({content: "没有迟到记录"});
          }else{

              this.setData({
                items: result.late,
                totalMinutes : result.totalMinutes
              });
          }

        } else {

          dd.alert({content:"请求失败"});
        }
      },
      fail: (res) => {
        
        console.log("httpRequestFail---", res)
        dd.alert({ content: JSON.stringify(res) });
      },
      complete: (res) => {
        dd.hideLoading();
      }

    });
  },
  onLoad(){
        let _this = this;

        this.queryLateList();
       
    }
});