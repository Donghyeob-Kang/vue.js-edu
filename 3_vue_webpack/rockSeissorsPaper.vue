<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{ result }}</div>
        <div>현재 {{ score }}점</div>
    </div>
</template>

<script>
    const rspCoords = {
        바위: "0",
        가위: "-142px",
        보: "-284px"
    };

    const scores = {
        가위: 1,
        바위: 0,
        보: -1
    };
    // Object.entries(Object) Object를 열거 가능한 [key, value] 쌍 Array로 반환
    // Array.find(callback) true를 반환할 때 까지 callback 함수를 실행
    // imgCoord는 img의 위치값
    const computerChoice = imgCoord => {
        // rspCoords를 [key, value]값으로 변환하여 imgCoord가 갖고있는 image의 위치값과 같은 값을 찾을때까지 find
        return Object.entries(rspCoords).find(v => {
            return v[1] === imgCoord;
        })[0];
        // 0번째에는 key값이 들어있으므로 최종 return값은 '바위' '가위' '보'
    };

    let interval = null;

    export default {
        data() {
            return {
                imgCoord: rspCoords.바위,
                result: "",
                score: 0
            };
        },
        computed: {
            // mounted 시 changeHand() 함수가 올라가며 계속해서 imgCoord 값을 변경
            computedStyleObject() {
                return {
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
                };
            }
        },
        methods: {
            changeHand() {
                interval = setInterval(() => {
                    if (this.imgCoord === rspCoords.바위) {
                        this.imgCoord = rspCoords.가위;
                    } else if (this.imgCoord === rspCoords.가위) {
                        this.imgCoord = rspCoords.보;
                    } else if (this.imgCoord === rspCoords.보) {
                        this.imgCoord = rspCoords.바위;
                    }
                }, 100);
            },
            onClickButton(choice) {
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imgCoord)];
                const diff = myScore - cpuScore;
                if (diff === 0) {
                    this.result = "비김";
                } else if ([-1, 2].includes(diff)) {
                    this.result = "이김";
                    this.score += 1;
                } else {
                    this.result = "짐";
                    this.score -= 1;
                }
                setTimeout(() => {
                    this.changeHand();
                }, 1000);
            }
        },
        beforeCreate() {
            // console.log("beforeCreate");
        },
        created() {
            // 페이지를 불러올때 data들을 연결하는 과정이 끝나면 created 완료
            // console.log("created");
        },
        beforeMount() {
            // console.log("beforeMount");
        },
        mounted() {
            // 화면 관련 작업은 mounted 단계에서 하는것이 좋음
            // console.log("mounted");
            this.changeHand();
        },
        beforeUpdate() {
            // console.log("beforeUpdate");
        },
        updated() {
            // data 변경 시 화면이 다시 그려질때
            // console.log("updated");
        },
        beforeDestroy() {
            // setInterval과 같은 함수는 component가 사라져도 계속해서 동작하기 때문에 component가 사라지기 전 불러옴
            // console.log("beforeDestroy");
            clearInterval(interval);
        },
        destroyed() {
            // ex) v-if="false"시 tag 자체가 사라지는데 그 때 destroyed 됨
            // console.log("destroyed");
        }
    };
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>
