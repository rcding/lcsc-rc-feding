let app = getApp();
Page({
  data: {
    dingUserId: '',
    meetingName: '',
    timeSpan: '',
    currentPage: 1,
    pageSize: 1000,
    items: [
      {
        
      }
    ],
  },
  onLoad(query) {
    console.log('list ', query);
    this.setData({
      dingUserId: query.dingUserId || '',
      meetingName: query.meetingName || '',
      timeSpan: query.timeSpan || ''
    });
    this.getList();
    // setTimeout(function() {
    //   console.log(222);
    // }, 200);
    // console.log(document);
  },
  getList() {
    
    let url = app.globalData.serviceurl + '/meeting/page';
    // if (this.data.dingUserId !== '全部') {
    //   url += '&dingUserId=' + this.data.dingUserId;
    // }
    // if (this.data.meetingName !== '全部') {
    //   url += '&meetingName=' + this.data.meetingName;
    // }
    // if (this.data.timeSpan !== '全部') {
    //   url += '&timeSpan=' + this.data.timeSpan;
    // }

    dd.httpRequest({
      url: url,
      method: 'GET',
      data:{
        dingUserId: this.data.dingUserId,
        meetingName:this.data.meetingName,
        timeSpan:this.data.timeSpan == '全部' ? '' :this.data.timeSpan,
        currentPage:1,
        pageSize:1000
      },
      dataType: 'json',
      success: (res) => {
        console.log('yfs==>',res);
        if (res.status === 200 && res.data.code === 200) {
          this.setData({
            items: res.data.result.dataList || [],
          });
        } else {
          dd.alert({ content: "请求失败" });
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
  lower(e) {
    console.log(11);
  },
});
