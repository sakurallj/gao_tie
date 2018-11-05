let that;
Page({
    data: {
        touch: {
            distance: 0,
            scale: 1,
            baseWidth: null,
            baseHeight: null,
            scaleWidth: null,
            scaleHeight: null
        },
        isLineImageLoaded: false,
        pickerData: {}
    },
    onLoad() {
        that = this;
    },
    onShow() {
        that.mapLine = that.selectComponent("#mao_line");
        that.lpicker = that.selectComponent("#lpicker");
    },
    cancelLPickerEvent(res) {
        that.hiddenLPicker();
    },
    showLPicker() {
        that.lpicker.show();
    },
    hiddenLPicker() {
        that.lpicker.hide();
    },
    chooseStation(res) {
        let station = {
            title: "长沙南",
            longitude: 113.065494,
            latitude: 28.147104
        };
        this.setData({
            pickerData: {
                title: "长沙南",
                options: [{
                    key: "scenic",
                    title: '景点',
                    station: station
                }, {
                    key: "depart",
                    title: '出发',
                    station: station
                }, {
                    key: "arrive",
                    title: '到达',
                    station: station
                }],
            }
        });
        this.showLPicker();
    },
    chooseOption(e) {
        console.log(e);
        let item = e.detail.item;
        if (typeof item.key == "undefined") {
            return false;
        }
        this.hiddenLPicker();
        console.log(JSON.stringify(item));
        wx.navigateTo({
            url: '/pages/scenic/scenic?item=' + JSON.stringify(item),
        })
    }
})