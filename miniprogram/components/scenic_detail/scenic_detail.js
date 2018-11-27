// components/scenic_detail/scenic_detail.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        componentData: {
            type: Object,
            value: {},
        }
    },
    ready() {
        console.log("scenic_detail>>>", this.data.componentData);
    },
    /**
     * 组件的初始数据
     */
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        circular: true,
        imageCurrentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        swiperChange: function(e) {
            console.log(e);
            let current = e.detail.current;
            this.setData({
                imageCurrentIndex: current
            });
        },
        preview() {
            let imageCurrentIndex = parseInt(this.data.imageCurrentIndex),
                photos = this.data.componentData.photos,
                len = photos.length;
            if (len < 0) {
                wx.showToast({
                    title: '请重试',
                    icon: "none",
                    duration: 2e3
                })
                return false;
            }
            let ps = [];
            for(let i=0;i<len;i++){
                ps[i] = photos[i].url;
            }
            console.log("preview", photos, ps, imageCurrentIndex, ps[imageCurrentIndex].url);
            wx.previewImage({
                current: ps[imageCurrentIndex] ,
                urls: ps 
            })
        },
        hideDetail(){
            this.triggerEvent("hideDetail");
        }
    }
})