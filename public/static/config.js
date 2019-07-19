window.baseIp = '172.16.15.211';
window.g = {
  baseUrl: `http://${baseIp}:9999`,
  socketUrl: `http://${baseIp}:9210`,

  // baseUrl: 'http://183.224.87.216:31090',
  // socketUrl: 'http://183.224.87.216:31100',
  // mapApiwms: 'http://183.224.87.216:31110/geoserver/cors/wms',
  // mapApiwfs:
  //   'http://183.224.87.216:31110/geoserver/cors/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cors:station_info&outputFormat=application%2Fjson',
  mapApiwms: `http://${baseIp}:31110/geoserver/cors/wms`,
  mapApiwfs:
    `http://${baseIp}:31110/geoserver/cors/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cors:station_info&outputFormat=application%2Fjson`,
  company: '南方卫星导航欢迎你',

  // 本地地图资源
  // mapRoad: '../../static/roadmap_nolabel/{z}/{x}/{y}.png',
  // mapText: '../../static/roadmap_nolabel/{z}/{x}/{y}.png',

  mapRoad: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=410744e7dfda107f4b5df71545369c7a',
  mapText: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=410744e7dfda107f4b5df71545369c7a',
  mapTextEn: 'http://t3.tianditu.com/DataServer?T=eva_w&x={x}&y={y}&l={z}&tk=410744e7dfda107f4b5df71545369c7a',
  // mapText: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=410744e7dfda107f4b5df71545369c7a',
  zoomVal:10, // 当前
  minzoomVal:2,
  maxzoomVal:18,
  // center:[101.2500,23.9090]
  center:[114.9829,24.9280]
};


// var urlStr = window.location.href; //获取访问地址
// var urlArr = urlStr.split(".com"); //截取字符串，存到数组中
// var urlArrPrev = urlArr[0]; // 获取.com之前的字符串
// var weburl = urlArrPrev.toString() + ".com/legend_api"; //拼接接口地址
// console.log(weburl);
