/* eslint-disable no-plusplus */

const arr = [
  ['x', 'King', ''],
  [0, 'aF', 'aL'],
  [0, 'bF', 'bL'],
  [0, 'cF', 'cL'],
  [0, 'dF', 'dL'],
  [0, 'eF', 'eL'],
  [1, 'aa1F', 'aa1L'],
  [2, 'bb1F', 'bb1L'],
  [3, 'ccF', 'ccL'],
  [6, 'aaa1F', 'aaa1L'],
  [7, 'bbb1F', 'bbb1L'],
  [1, 'aa2F', 'aa2L'],
  [6, 'aaa2F', 'aaa2L'],
  [6, 'aaa3F', 'aaa3L'],
];

for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === 'x') {
    console.log(arr[i][1]);
  } else if (arr[i][0] === 0) {
    console.log(` #${arr[i][1]} ${arr[i][2]}`);
    for (let j = i; j < arr.length; j++) {
      if (arr[j][0] === i) {
        console.log(`  *${arr[j][1]} ${arr[j][2]}`);
        for (let k = j; k < arr.length; k++) {
          if (arr[k][0] === j) {
            console.log(`   ---${arr[k][1]} ${arr[k][2]}`);
          }
        }
      }
    }
  }
}
