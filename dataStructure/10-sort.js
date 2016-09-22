// 1.冒泡排序

var arr = [];

(function() {
    for (var i = 0; i < 10; i++) {
        arr.push(parseInt(Math.random() * 500, 10));
    }
})();
console.log(arr);
/**
 * 冒泡排序
 * @param {array} array 待排序数组
 * @returns {array} 排序后数组
 */
function bubbleSort(array) {
    var temp;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}
console.time('bubbleSort');
console.error(bubbleSort(arr));
console.timeEnd('bubbleSort');

// 2.选择排序

function selectionSort(array) {
    var temp;
    var indexMin;
    var length = array.length;
    for (var i = 0; i < length - 1, i++) {
        indexMin = i;
        for(var j = i;j<length;j++){
            if(array[indexMin]>array[j]){
                indexMin = j;
            }
        }
        if(i!==indexMin){

        }
    }
}