<template>
    <div>
        <mine-form />
        <div>{{ timer }}</div>
        <table-component />
        <div>{{ result }}</div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    import store, { INCREMENT_TIMER } from "./store";
    import MineForm from "./MineForm.vue";
    import TableComponent from "./TableComponent.vue";

    let interval;

    export default {
        store,
        components: {
            MineForm,
            TableComponent
        },
        computed: {
            ...mapState(["timer", "result", "halted"])
        },
        watch: {
            halted(value, oldValue) {
                if (value === false) {
                    interval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                        // 정확한 시간이 필요할 시 new Date() 선언으로 계산 필요
                    }, 1000);
                } else {
                    clearInterval(interval);
                }
            }
        }
    };
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>
