const drop = {
  state: {
    stationName:'',
    stationDropInfo:{}
  },
  mutations: {
    SET_STATIONDROPINFO: (state, data) => {
      state.stationName = data.stationName;
      state.stationDropInfo = data.dropData;
    },
  },
  actions: {
  }
};

export default drop;
