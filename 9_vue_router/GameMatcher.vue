<template>
    <div v-if="currentGame === 'number-baseball'">
        <number-baseball></number-baseball>
    </div>
    <div v-else-if="currentGame === 'response-check'">
        <response-check></response-check>
    </div>
    <div v-else>일치하는 항목이 없음</div>
</template>

<script>
    import numberBaseball from '../1_vue_template/numberBaseball.vue';
    import responseCheck from '../2_vue_component/responseCheck.vue';

    export default {
        components: { numberBaseball, responseCheck },
        mounted() {
            console.log(this.$router);
        },
        computed: {
            currentGame() {
                return this.$route.params.name;
            }
        }
    };
</script>
