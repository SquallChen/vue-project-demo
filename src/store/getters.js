const getters = {
  name: state => state.user.name,
  token: state => state.user.token,
  sidebar: state => state.user.sidebar,
  avatar: state => state.user.avatar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};

export default getters;
