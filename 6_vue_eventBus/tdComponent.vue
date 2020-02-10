<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
    import eventBus from "./eventBus.js";

    export default {
        props: {
            cellData: String,
            cellIndex: Number,
            rowIndex: Number
        },
        methods: {
            onClickTd() {
                if (this.cellData) {
                    return;
                }
                eventBus.$emit("clickTd", this.rowIndex, this.cellIndex);
            }
        }
    };
    console.log("tdComponent!!");
</script>
