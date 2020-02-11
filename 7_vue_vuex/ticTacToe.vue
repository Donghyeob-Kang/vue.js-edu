<template>
    <div>
        <div>{{ turn }}님의 턴입니다.</div>
        <table-component>
            <!-- 배열이 제거될 요소가 있다면 v-for key값은 index로 주면 안됨 -->
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td
                    @click="onClickTd(rowIndex, cellIndex)"
                    v-for="(cellData, cellIndex) in rowData"
                    :key="cellIndex"
                >{{ cellData }}</td>
            </tr>
        </table-component>
        <div v-if="winner">{{ winner }}님의 승리!</div>
    </div>
</template>

<script>
    // root component & vuex 연결
    import store from "./store";
    import { mapState } from "vuex";
    import tableComponent from "./tableComponent.vue";

    export default {
        // store 선언
        store,
        components: {
            tableComponent
        },
        computed: {
            ...mapState(["winner", "turn", "tableData"])
            // winner() {
            //     return this.$store.state.winner;
            // },
            // turn() {
            //     return this.$store.state.turn;
            // }
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
