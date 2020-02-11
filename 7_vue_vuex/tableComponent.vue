<template>
    <table>
        <slot></slot>
    </table>
</template>

<script>
    import store from "./store";
    import trComponent from "./trComponent.vue";

    export default {
        computed: {
            tableData() {
                return this.$store.state.tableData;
            }
        }
    };
    console.log("tableComponent!!");
</script>
