// components/scenic_card/scenic_card.js
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
        console.log(this.data.componentData);
    },
    /**
     * 组件的初始数据
     */
    data: {
        indicatorDots: false,
        autoplay: false,
        interval: 0,
        duration: 0,
        circular: true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        swiperChange: function(e) {
            console.log(e);
            let current = e.detail.current,
                componentData = this.data.componentData;
            this.triggerEvent("scenicCardChange", {
                index: current,
                item: componentData[current]
            });
        }
    }
})