<template>
    <table>
        <tr-component
            v-for="(rowData, index) in tableData"
            :key="index"
            :row-data="rowData"
            :row-index="index"
        />
    </table>
</template>

<script>
    import trComponent from './trComponent.vue';

    export default {
        components: {
            trComponent
        },
        props: { tableData: Array }
    };
    console.log('tableComponent!!');
</script>
