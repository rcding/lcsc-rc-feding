let app = getApp();
Page({
  data: {
    dingUserId: '',
    meetingName: '',
    timeSpan: '',
    items: [
      {
        dingUserName: '喻福松',
        meetingName: '开了一个会',
        costTime: '会议中',
        startTime: '2019.10.12',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:6',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李二凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李二凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李二凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
      {
        dingUserName: '李二凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
        startTime: '2019.10.12 12:32:09',
      },
    ],
  },
  onLoad(query) {
    console.log(query);
    this.setData({
      dingUserId: query.dingUserId || '',
      meetingName: query.meetingName || '',
      timeSpan: query.timeSpan || ''
    });
    this.getList();
    setTimeout(function(){
      console.log(222);
    }, 200);
    console.log(document);
  },
  getList() {
    console.log(this.data);
    let url = app.globalData.serviceurl + '/meeting/page?';
    if (this.data.dingUserId !== '全部') {
      console.log(this.data.dingUserId);
      url += 'dingUserId=' + this.data.dingUserId + '&';
    }
    if (this.data.meetingName !== '全部') {
      console.log(this.data.meetingName);
      url += 'meetingName=' + this.data.meetingName + '&';
    }
    if (this.data.timeSpan !== '全部') {
      console.log(this.data.timeSpan);
      url += 'timeSpan=' + this.data.timeSpan;
    }
    console.log(url);
    dd.httpRequest({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 200) {
          this.setData({
                items : res.data.result || [],
              });
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
  lower(e) {
    console.log(11);
  },
});
