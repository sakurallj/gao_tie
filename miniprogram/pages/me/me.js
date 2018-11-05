let that;
Page({
    data: {
        pickerData: {
            title: "中国",
            options: ['美国', '中国', '巴西', '日本']
        }
    },
    onLoad: function(options) {
        that = this;
    },
    onShow: function() {
        that.lpicker = that.selectComponent("#lpicker");
    },
    cancelLPickerEvent: res => {
        that.hiddenLPicker();
    },
    showLPicker() {
        that.lpicker.show();
    },
    hiddenLPicker: function() {
        that.lpicker.hide();
    },
})