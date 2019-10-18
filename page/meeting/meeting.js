Page({
  data: {
    hour: '00',
    minute: '00',
    second: '00',
    btnText: '开始计时',
    timer: null,
    startTime: 0,
    endTime: 0,
  },
  onLoad(query) {
    console.log(query);
  },
  startToCount() {
    if (this.data.btnText === '开始计时') {
      this.setData({
        btnText: '结束计时',
      });
    } else {
      this.setData({
        btnText: '开始计时',
      });
    }
    if (!this.data.timer) {
      this.dateInit();
      const startTime = new Date().getTime();
      const t = setInterval(() => {
      const endTime = new Date().getTime();
        const seconds = parseInt((endTime - startTime) / 1000);
          const hour = parseInt(seconds / 3600) < 10 ? `0${parseInt(seconds / 3600)}` : parseInt(seconds / 3600);
          const restMinutes = seconds - (hour * 60 * 60);
          const minute = parseInt(restMinutes / 60) < 10 ? `0${parseInt(restMinutes / 60)}` : parseInt(restMinutes / 60);
          const restSeconds = restMinutes - (minute * 60);
          const second = restSeconds < 10 ? `0${restSeconds}`: restSeconds;
          this.setData({
            hour: hour,
            minute: minute,
            second: second,
          });
      }, 1000);
      this.setData({
        timer: t,
      });
      console.log(t);
    } else {
      console.log(this.timer);
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
  endMeeting(){
    const url = app.globalData.serviceurl + '/meeting/end';
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
      axios.post(API.endMeeting, stringify(this.params))
          .then(() => {

              this.userInfo.meetingId = null;
              this.userInfo.meetingBegainTime = null;
              this.$store.dispatch('SetUserInfo', this.userInfo);
          });
  },
});