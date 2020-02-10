import Vue from 'vue';
import ticTacToe from './ticTacToe.vue';

new Vue({
    render: createElement => createElement(ticTacToe)
}).$mount('#root');
