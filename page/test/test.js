
let app = getApp();

Page({
  data: {
    date: '',
    items: [
      {
        title: '双行列表',
        brief: '描述信息',
        btnLabel: '点击',
        arrow: true,
      },
      {
        title: '双行列表',
        brief: '描述信息',
        btnLabel: '点击',
        arrow: true,
      },
      {
        title: '双行列表',
        brief: '描述信息',
        btnLabel: '点击',
        arrow: true,
      },
    ],
  },
  onItemClick(ev) {
    console.log(123);
    console.log(ev);
    my.alert({
      content: `点击了第${ev.index}行`,
    });
  },
  datePick: function () {
    dd.datePicker({
      format: 'yyyy-MM',
      currentDate: '2012-12',
      success: (res) => {
        this.setData({
          date: res.date
        });
      },
    });
  },
  query: function() {
    console.log(this);
    console.log(this.data.date);

    console.log(this.data.date.split("-")[0]);
    console.log(app.globalData.sysdate);

    my.httpRequest({
      url: '', // 目标服务器url
      method: 'GET',
      data: {
        date: this.data.date
      },
      success: (res) => {
        this.setData({
          item: res.data.result
        });
      },
    });
  },
});