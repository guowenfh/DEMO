// 1.冒泡排序


/**
 * 冒泡排序
 * @param {array} arr 待排序数组
 * @returns {array} 排序后数组
 */
function bubbleSort(arr) {
    if (!Array.isArray(arr)) {
        console.error('Not is Array!');
        return;
    }
    var array = arr;
    var swap = function(index1, index2) {
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };
    var length = array.length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
            }
        }
    }
    return array;
}
console.error(bubbleSort([12, 13, 435, 345, 123, 12, 33, 2, 4, 5, 76]))