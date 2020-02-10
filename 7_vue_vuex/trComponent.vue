<template>
    <tr>
        <td-component
            v-for="(cellData, index) in rowData"
            :key="index"
            :cell-data="cellData"
            :cell-index="index"
            :row-index="rowIndex"
        />
    </tr>
</template>

<script>
    import tdComponent from './tdComponent.vue';

    export default {
        components: {
            tdComponent
        },
        data() {
            return {
                parent: '내가 니 애비다.'
            };
        },
        props: { rowData: Array, rowIndex: Number },
        mounted() {}
    };
    console.log('trComponent!!');
</script>
