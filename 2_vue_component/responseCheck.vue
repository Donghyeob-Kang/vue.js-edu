<template>
    <div>
        <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
        <!-- v-show는 false일 경우 tag에 대하여 display: none -->
        <!-- v-if는 false일 경우 tag가 없어짐 -->
        <!-- <div v-show="result.length"> -->
        <div v-if="result.length">
            <!-- reduce((누적값, 현재값) => 누적값 + 현재값, 초기값) -->
            <!-- ex) result = [1, 2, 3, 4] -->
            <!-- ex) result.reduce((a, b) => a, b) // output: 10 -->
            <!-- ex) result.reduce((a, b) => a, b, 5) // output: 15 -->
            <div>평균 시간: {{ average }}ms</div>
            <button @click="onReset">Reset</button>
        </div>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        data() {
            return {
                result: [],
                state: "waiting",
                message: "클릭해서 시작"
            };
        },
        // computed 내에 값은 caching이 됨
        computed: {
            average() {
                return (
                    this.result.reduce((a, b) => a + b, 0) / this.result.length || 0
                );
            }
        },
        methods: {
            onReset() {
                this.result = [];
            },
            onClickScreen() {
                if (this.state === "waiting") {
                    this.state = "ready";
                    this.message = "초록색이 되면 클릭";
                    timeout = setTimeout(() => {
                        this.state = "now";
                        this.message = "지금 클릭";
                        startTime = new Date();
                        // Math.floor는 소수점 이하 버림
                        // Math.random은 0과 1사이 임의의 소수
                    }, Math.floor(Math.random() * 1000) + 2000);
                } else if (this.state === "ready") {
                    clearTimeout(timeout);
                    this.state = "waiting";
                    this.message = "너무 성급하시네요 초록색이 된 후에 클릭";
                } else if (this.state === "now") {
                    this.state = "waiting";
                    this.message = "클릭해서 시작";
                    endTime = new Date();
                    this.result.push(endTime - startTime);
                }
            }
        }
    };
</script>

<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>
