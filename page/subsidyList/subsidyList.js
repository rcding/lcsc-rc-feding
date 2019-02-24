
let app = getApp();


Page({
  data: {
    date: app.globalData.sysdate,
    items: [],
    totalMoney: 0
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

  queryDataList: function () {

    let dateStr = this.data.date.split("-");
    if(dateStr.length != 2){
      dd.alert({ content: '请选择时间' });
      return;
    }
    let url = app.globalData.serviceurl + '/subsidy/list?month=' + dateStr[1] + '&year=' + dateStr[0]+'&userid=' + app.globalData.userId;
    dd.showLoading();
    dd.httpRequest({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        // dd.alert({content: "step2"});
        if (res.data.success) {

          let result = res.data.result;
          console.log('success----',result);
          if(result.subsidys.length == 0){
             dd.alert({content: "没有交通补贴记录"});
          }else{

              this.setData({
                items: result.subsidys,
                totalMoney : result.totalMoney
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

        this.queryDataList();
       
    }
});