let app = getApp();

Page({
  data: {
    hour: '00',
    minute: '00',
    second: '00',
    btnText: '开始晨会',
    timer: null,
    startTime: 0,
    endTime: 0,
  },
  onLoad(query) {
    
    this.searchNoEndMeeting();
  },
  startTimerRecord() {

    console.log('============>> startTimerRecord')

    if (this.data.btnText === '开始晨会') {
      this.setData({
        btnText: '结束晨会',
      });

      if (app.globalData.meetingId == 0) {
        this.setData({
          startTime: new Date().getTime()
        });

        this.startMeeting();
      } else {

        this.setData({
          startTime: app.globalData.meetingBegainTime
        });
      }

    } else {
      this.setData({
        btnText: '开始晨会',
      });
      this.endMeeting();
    }
    if (!this.data.timer) {
      this.dateInit();
      console.log('======>>000', this.data.startTime);
      const startTime = this.data.startTime;
      const t = setInterval(() => {
        const endTime = new Date().getTime();
        const seconds = parseInt((endTime - startTime) / 1000);
        const hour = parseInt(seconds / 3600) < 10 ? `0${parseInt(seconds / 3600)}` : parseInt(seconds / 3600);
        const restMinutes = seconds - (hour * 60 * 60);
        const minute = parseInt(restMinutes / 60) < 10 ? `0${parseInt(restMinutes / 60)}` : parseInt(restMinutes / 60);
        const restSeconds = restMinutes - (minute * 60);
        const second = restSeconds < 10 ? `0${restSeconds}` : restSeconds;
        this.setData({
          hour: hour,
          minute: minute,
          second: second,
        });
      }, 1000);
      this.setData({
        timer: t,
      });

    } else {

      clearInterval(this.data.timer);
      this.setData({
        timer: null,
      });
    }
  },
  dateInit() {
    this.setData({
      hour: '00',
      minute: '00',
      second: '00',
    });
  },

  startMeeting() {

    const url = app.globalData.serviceurl + '/meeting/insert';

    dd.httpRequest({
      url: url,
      method: 'POST',
      data: {
        dingUserId: app.globalData.dingUserId,
        meetingName: '晨会',
      },
      dataType: 'json',
      success: function(res) {

        app.globalData.meetingId = res.data.result.meetingId;
        app.globalData.meetingBegainTime = new Date().getTime();

      },
      fail: function(res) {
        dd.alert({ content: '新增会议失败！' });
      },
      // complete: function(res) {
      //   dd.alert({content: 'complete'});
      // }
    });

  },

  endMeeting() {
    const url = app.globalData.serviceurl + '/meeting/end';
    dd.httpRequest({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: {
        meetingId: app.globalData.meetingId
      },
      success: (res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 200) {
          app.globalData.meetingId = 0;
          app.globalData.meetingBegainTime = '';
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

  searchNoEndMeeting() {

    const url = app.globalData.serviceurl + '/meeting/no/end';
    dd.httpRequest({
      url: url,
      method: 'GET',
      dataType: 'json',
      data: {
        dingUserId: app.globalData.dingUserId
      },
      success: (res) => {

        if (res.data.result !== null) {
          app.globalData.meetingId = res.data.result.meetingId,
            app.globalData.meetingBegainTime = res.data.result.beginTime;

          this.startTimerRecord();

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

  }
});