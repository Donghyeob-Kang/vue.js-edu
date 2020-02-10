<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
    export default {
        props: {
            cellData: String,
            cellIndex: Number,
            rowIndex: Number
        },
        methods: {
            onClickTd() {
                // console.log(this.cellData);
                // console.log(this.cellIndex);
                // console.log(this.rowIndex);
                if (this.cellData) {
                    return;
                }

                const rootData = this.$parent.$parent.$parent.$data;
                // console.log(rootData.tableData);
                // array index를 이용하여 값 변경 시 화면에 반영이 되지 않음
                // rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn; > this.$set을 사용해야됨
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

                let win = false;

                // row가 같은 turn
                if (
                    rootData.tableData[this.rowIndex][0] === rootData.turn &&
                    rootData.tableData[this.rowIndex][1] === rootData.turn &&
                    rootData.tableData[this.rowIndex][2] === rootData.turn
                ) {
                    win = true;
                }
                // column이 같은 turn
                if (
                    rootData.tableData[0][this.cellIndex] === rootData.turn &&
                    rootData.tableData[1][this.cellIndex] === rootData.turn &&
                    rootData.tableData[2][this.cellIndex] === rootData.turn
                ) {
                    win = true;
                }
                // 좌측 상단에서 우측 하단 대각선이 같은 turn
                if (
                    rootData.tableData[0][0] === rootData.turn &&
                    rootData.tableData[1][1] === rootData.turn &&
                    rootData.tableData[2][2] === rootData.turn
                ) {
                    win = true;
                }
                // 우측 상단에서 좌측 하단 대각선이 같은 turn
                if (
                    rootData.tableData[0][2] === rootData.turn &&
                    rootData.tableData[1][1] === rootData.turn &&
                    rootData.tableData[2][0] === rootData.turn
                ) {
                    win = true;
                }
                // 이긴 경우 초기화
                if (win) {
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ];
                } else {
                    // 무승부
                    let all = true; // all이 true면 무승부라는 뜻

                    // 2중 forEach, 크게는 row 작게는 cell을 검사하여 cell에 값이 비어있을 경우 all = false
                    rootData.tableData.forEach(row => {
                        row.forEach(cell => {
                            if (!cell) {
                                all = false;
                            }
                        });
                    });
                    if (all) {
                        // 무승부
                        rootData.winner = '';
                        rootData.turn = 'O';
                        rootData.tableData = [
                            ['', '', ''],
                            ['', '', ''],
                            ['', '', '']
                        ];
                    } else {
                        // 삼항연산자 condition ? true : false
                        // rootData.turn === 'O'가 참일경우 'X' : 거짓일 경우 'O'
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        }
    };
    console.log('tdComponent!!');
</script>
