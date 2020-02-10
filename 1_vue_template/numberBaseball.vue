<template>
    <div>
        <h1>{{ result }}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도: {{ tries.length }}</div>
        <ul>
            <li v-for="t in tries" :key="t.index">
                <div>{{ t.try }}</div>
                <div>{{ t.result }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
// 난수 생성 함수
const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        arr.push(chosen);
    }
    return arr;
};

// export default 부분을 main.js에서 import 해옴
export default {
    data() {
        return {
            answer: getNumbers(),
            tries: [],
            value: '',
            result: ''
        };
    },
    methods: {
        onSubmitForm() {
            // 정답일 경우
            // 문자열과 배열을 비교하기 위해 join 사용
            if (this.value === this.answer.join('')) {
                this.tries.push({ try: this.value, result: 'homerun' });
                this.result = 'homerun';
                alert('game reset');
                // 변수 초기화
                this.value = '';
                this.tries = [];
                this.$refs.answer.focus();
            } else {
                // 정답이 아닐 경우
                // 10번의 시도가 실패할 경우
                if (this.tries.length >= 9) {
                    this.result = `10번의 기회를 소진했습니다. 답은 ${this.answer} (이)였습니다.`;
                    alert('game reset');
                    this.value = '';
                    this.tries = [];
                    this.answer = getNumbers();
                    this.$refs.answer.focus();
                } else {
                    // 정답이 아닐경우 strike & ball count
                    let strike = 0;
                    let ball = 0;
                    // console.log(this.value);
                    // console.log(typeof this.value); // string
                    // 입력받은 string type 값의 value를 문자 하나하나 map을 이용해 int형으로 변환
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for (let i = 0; i < 4; i++) {
                        if (answerArray[i] === this.answer[i]) {
                            strike++;
                            // 입력받은 answerArray 중 같은 값이 있다면 ball++
                        } else if (this.answer.includes(answerArray[i])) {
                            ball++;
                        }
                    }

                    // 입력값 예외처리
                    if (this.value.includes(' ')) {
                        alert('공백이 이써');
                        this.value = '';
                        return;
                    }
                    for (let i = 0; i < 3; i++) {
                        for (let j = i + 1; j < 4; j++) {
                            if (this.value[i] === this.value[j]) {
                                alert('같은 숫자가 이써');
                                this.value = '';
                                return;
                            }
                        }
                    }
                    for (let i = 0; i < this.tries.length; i++) {
                        // console.log(this.tries[i].try);
                        if (this.tries[i].try === this.value) {
                            alert('입력했던 값이야');
                            this.value = '';
                            return;
                        }
                    }

                    // 입력받은 값을 tries 배열에 push하여 상태를 기억
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`
                    });
                }
            }
            this.value = '';
            this.$refs.answer.focus();
        }
    }
};
</script>

<style></style>
