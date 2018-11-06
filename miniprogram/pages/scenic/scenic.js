let that;
let app = getApp();
let apis = app.apis;
const ZINDEX_SCENIC = 1000;
const ZINDEX_SCENIC_ACTIVE = 1001;
Page({
    data: {
        map: {}
    },
    onLoad: function(options) {
        console.log(options);
        that = this;
        this.doItemOptions(options);
    },
    doItemOptions(options) {
        let item = options.item;
        if (typeof item != "undefined" && typeof item == "string") {
            item = JSON.parse(item);
        }
        if (typeof item != "object") {
            return false;
        }
        if (item.key == "scenic") {
            this.loadScenic(item);
        }
    },
    createMarkersData(index, station, markers) {
        let len = markers.length,
            data = [{
                iconPath: "/images/station_flag.png",
                id: 0,
                latitude: station.latitude,
                longitude: station.longitude,
                width: 20,
                height: 20
            }];
        for (let i = 0; i < len; i++) {
            let s = markers[i];
            data[data.length] = {
                iconPath: i == index ? "/images/scenic_active.png" : "/images/scenic.png",
                id: s.id,
                zIndex: i == index ? ZINDEX_SCENIC_ACTIVE : ZINDEX_SCENIC,
                latitude: s.latitude,
                longitude: s.longitude,
                width: 20,
                height: 20
            }
        }
        return data;
    },
    loadScenic(item) {
        if (!item.station || !item.station.title) {
            return false;
        }
        wx.setNavigationBarTitle({
            title: item.station.title,
        });
        let scenics = apis.getScenic(item.station),
            len = scenics.length;
        let map = that.data.map;
        map.longitude = item.station.longitude;
        map.latitude = item.station.latitude;
        map.markers = [{
            iconPath: "/images/station_flag.png",
            id: 0,
            latitude: map.latitude,
            longitude: map.longitude,
            width: 20,
            height: 20
        }];
        map.markers = this.createMarkersData(0, item.station, scenics);
        that.setData({
            scenicCardData: scenics,
            map: map
        });
    },
    onShow: function() {

    },
    scenicCardChange(res) {
        console.log(res);
        let index = res.detail.index,
            map = that.data.map,
            scenicCardData = that.data.scenicCardData;
        map.markers = this.createMarkersData(index, map, scenicCardData);
        that.setData({
            map: map
        });
    }
})