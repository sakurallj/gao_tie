// map_line.js
Component({

    properties: {

    },
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        touch: {
            distance: 0,
            scale: 1,
            baseWidth: null,
            baseHeight: null,
            scaleWidth: null,
            scaleHeight: null
        }
    },
    isLineImageLoaded: false,
    ready: function() {
        let that = this;
        let sysInfo = wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sysInfo: res
                });
            },
        })
        if (!this.isLineImageLoaded) {
            wx.showLoading({
                title: '加载中...',
            })
        }
    },
    methods: {
        touchstartCallback: function(e) {
            // 单手指缩放开始，也不做任何处理
            if (e.touches.length == 1) return
            // 注意touchstartCallback 真正代码的开始
            // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug
            // 当两根手指放上去的时候，就将distance 初始化。
            let xMove = e.touches[1].clientX - e.touches[0].clientX;
            let yMove = e.touches[1].clientY - e.touches[0].clientY;
            let distance = Math.sqrt(xMove * xMove + yMove * yMove);
            this.setData({
                'touch.distance': distance,
            })
        },
        touchmoveCallback: function(e) {
            let touch = this.data.touch
            // 单手指缩放我们不做任何操作
            if (e.touches.length == 1) return
            let xMove = e.touches[1].clientX - e.touches[0].clientX;
            let yMove = e.touches[1].clientY - e.touches[0].clientY;
            // 新的 ditance
            let distance = Math.sqrt(xMove * xMove + yMove * yMove);
            let distanceDiff = distance - touch.distance;
            let newScale = touch.scale + 0.005 * distanceDiff
            // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
            if (newScale >= 10) {
                newScale = 10
            }
            if (newScale <= 0.6) {
                newScale = 0.6
            }
            let scaleWidth = newScale * touch.baseWidth
            let scaleHeight = newScale * touch.baseHeight
            // 赋值 新的 => 旧的
            this.setData({
                'touch.distance': distance,
                'touch.scale': newScale,
                'touch.scaleWidth': scaleWidth,
                'touch.scaleHeight': scaleHeight,
                'touch.diff': distanceDiff
            })
        },
        binderror: res => {
            wx.hideLoading();
            wx.showToast({
                title: '线路图加载失败，请退出重试',
                icon: "none",
                duration: 3000
            })
        },
        bindload: function(e) {
            this.isLineImageLoaded = true;
            wx.hideLoading();
            this.setData({
                'touch.baseWidth': e.detail.width,
                'touch.baseHeight': e.detail.height,
                'touch.scaleWidth': e.detail.width,
                'touch.scaleHeight': e.detail.height
            })
        },
        chooseStation(res) {
            console.log(res);
            let item = res.currentTarget.dataset.item;
            this.triggerEvent("chooseStation", {
                item: item
            });
        }
    }
})