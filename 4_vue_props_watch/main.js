import Vue from 'vue';
import lottoGenerator from './lottoGenerator.vue';

new Vue({
    render: createElement => createElement(lottoGenerator)
}).$mount('#root');
