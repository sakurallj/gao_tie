let that;
let app = getApp();
let apis = app.apis;
let utils = app.utils;
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
        that.setData({
            scenic: item
        });
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
        //计算距离
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
        for (let i = 0; i < len; i++) {
            scenics[i].distance = utils.calculateDistanceTwoLTPoint(item.station, scenics[i]);
        }
        let map = that.data.map;
        map.longitude = item.station.longitude;
        map.latitude = item.station.latitude;
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
            scenicCardData = that.data.scenicCardData,
            scenic = that.data.scenic;
        map.longitude = scenicCardData[index].longitude;
        map.latitude = scenicCardData[index].latitude;
        map.markers = this.createMarkersData(index, scenic.station, scenicCardData);
        map.polyline = this.createPolyline([
            scenic.station,
            scenicCardData[index]
        ]);
        that.setData({
            map: map
        });
    },
    createPolyline(points) {
        let len = points.length,
            polyline = [];
        for (let i = 0; i < len; i++) {
            let point = points[i];
            polyline[polyline.length] = {
                longitude: point.longitude,
                latitude: point.latitude
            }
        }
        polyline.color = "#FF0000DD";
        polyline.width = 2;
        polyline.dottedLine = true;
        return polyline;
    }
})