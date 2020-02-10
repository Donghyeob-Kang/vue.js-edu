<template>
    <div>
        <div>당첨 숫자</div>
        <div id="resultWindow">
            <lotto-ball v-for="ball in winBalls" :key="ball.index" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus">{{ bonus }}</lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더</button>
    </div>
</template>

<script>
    import lottoBall from "./lottoBall.vue";

    const getWinNumbers = () => {
        // Array(45).fill().map((v, i) => i + 1)
        // v = candidate array elements, i = array index
        const candidate = Array(45)
            .fill()
            .map((v, i) => i + 1);
        const shuffle = [];
        while (candidate.length > 0) {
            // splice (start index, deleteCount)
            // start index = 배열의 변경을 시작할 index
            // deleteCount = 배열에서 제거할 elements의 수
            // [0] = 첫번째 candidate 값
            shuffle.push(
                candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
            );
            // console.log(candidate.length);
            // console.log(shuffle);
        }
        // bonusNumber = 배열의 제일 마지막 숫자를 들고옴
        // slice(start index, end index) = start index부터 end index 전까지 array를 추출
        // sort(previous, current)
        // ex) array = [7, 3, 5, 6, 1] => sort(7, 3)
        // ex) 7-3 = 4 결과값이 0보다 클 경우 순서를 변경
        // ex) sort(7, 5), sort(7, 6), sort(7, 1)
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
        // ... = expand operator, array element spread
        // ex) [1, 2, 3, 4] => 1, 2, 3, 4
        return [...winNumbers, bonusNumber];
    };

    const timeouts = [];
    export default {
        components: {
            // pascal case와 kebab case가 같다면 lottoBall만 작성해도 괜찮음
            // ex) lottoBall,
            "lotto-ball": lottoBall
        },
        data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false
            };
        },
        computed: {},
        methods: {
            onClickRedo() {
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
            },
            showBalls() {
                // console.log(this.winNumbers);
                for (let i = 0; i < this.winNumbers.length - 1; i++) {
                    timeouts[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i]);
                    }, (i + 1) * 1000);
                }
                // console.log("--------------------------------");
                timeouts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            }
        },
        mounted() {
            console.log(`mounted detected`);
            this.showBalls();
        },
        beforeDestroy() {
            console.log(`beforeDestroy detected`);
            timeouts.forEach(t => {
                clearTimeout(t);
            });
        },
        // watch: { 주시할 변수명(새로운 값, 이전의 값) { callback 함수 작성 } }
        watch: {
            winBalls(val, oldVal) {
                console.log(`watch detected`);
                // console.log(val);
                // console.log(oldVal);
                if (val.length === 0) {
                    // console.log(`length = 0`);
                    this.showBalls();
                }
            }
        }
    };
</script>

<style scoped></style>
