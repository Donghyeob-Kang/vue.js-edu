<template>
    <tr>
        <td-component
            v-for="(_, index) in rowData"
            :key="index"
            :cell-index="index"
            :row-index="rowIndex"
        />
    </tr>
</template>

<script>
    import tdComponent from "./tdComponent.vue";

    export default {
        components: {
            tdComponent
        },
        data() {
            return {
                parent: "내가 니 애비다."
            };
        },
        computed: {
            rowData() {
                return this.$store.state.tableData[this.rowIndex];
            }
        },
        props: { rowIndex: Number }
    };
    console.log("trComponent!!");
</script>
