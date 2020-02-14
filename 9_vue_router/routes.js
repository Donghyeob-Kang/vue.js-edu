import Vue from 'vue';
import VueRouter from 'vue-router';
import numberBaseball from '../1_vue_template/numberBaseball.vue';
import responseCheck from '../2_vue_component/responseCheck.vue';
import GameMatcher from './GameMatcher.vue';

// router는 눈속임임 어쨋든 single page니까 페이지 이동이 일어나는건 아님
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/number-baseball', component: numberBaseball },
        { path: '/response-check', component: responseCheck },
        { path: '/game/:name', component: GameMatcher }
    ]
});
