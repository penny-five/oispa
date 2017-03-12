import { sync } from 'vuex-router-sync';

/**
 * Syncs store and router so that
 * - Route object is added to store (by using vuex-router-sync)
 * - Areas have to be present on store before entering any route
 * - When area is changed, store has to be cleared of any area specific data
 * @param  {Object} store  Vuex Store instance
 * @param  {Object} router Vue Router instance
 */
export default (store, router) => {
  sync(store, router);

  router.beforeEach((to, from, next) => {
    if (store.state.areas == null) {
      const unsubscribe = store.watch(state => state.areas, () => {
        unsubscribe();
        next();
      });
      store.dispatch('fetchAreas');
    } else {
      next();
    }
  });

  store.watch(state => state.route.params.area, () => {
    store.commit('clear');
  });
};
