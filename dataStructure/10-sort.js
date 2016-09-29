// 1.冒泡排序

var arr = [];

function randomArr() {
    arr = [];
    for (var i = 0; i < 15; i++) {
        arr.push(parseInt(Math.random() * 500, 10));
    }
}
randomArr();
console.log(arr);

/**
 * 冒泡排序
 * @param {array} array 待排序数组
 * @returns {array} 排序后数组
 */
var bubbleSort = function(array) {
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
};
console.time('bubbleSort');
console.error(bubbleSort(arr));
console.timeEnd('bubbleSort');
randomArr();
console.log(arr);
// 2.选择排序
/**
 * 选择排序
 * @param {array} array 待排序数组
 * @returns {array} 排序后数组
 */
var selectionSort = function(array) {
    var temp;
    var indexMin;
    var length = array.length;
    for (var i = 0; i < length - 1; i++) {
        indexMin = i;
        for (var j = i; j < length; j++) {
            if (array[indexMin] > array[j]) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            temp = array[i];
            array[i] = array[indexMin];
            array[indexMin] = temp;
        }
    }
    return array;
};

console.time('selectionSort');
console.error(selectionSort(arr));
console.timeEnd('selectionSort');
randomArr();
console.log(arr);

// 3. 并归排序
var merge = function(left, right) {
    var result = [],
        il = 0,
        ir = 0;
    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }
    while (il < left.length) {
        result.push(left[il++]);
    }
    while (ir < right.length) {
        result.push(right[ir++]);
    }
    return result;
};
var mergeSortRec = function(array) {
    var len = array.length;
    if (len === 1) {
        return array;
    }
    var mid = Math.floor(len / 2),
        left = array.slice(0, mid),
        right = array.slice(mid, len);
    return merge(mergeSortRec(left), mergeSortRec(right));
};
var mergeSort = function(arr) {
    arr = mergeSortRec(arr);
    return arr;
};

console.time('mergeSort');
console.error(mergeSort(arr));
console.timeEnd('mergeSort');
randomArr();
console.log(arr);

// 4.快速排序

var swapQuickSort = function(array, index1, index2) {
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};


var partition = function(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (array[i] < pivot) {
            i++;

        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swapQuickSort(array, i, j);
            i++;
            j--;
        }
    }

    return i;

};
var quick = function(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right);
        if (left < index - 1) {
            quick(array, left, index - 1);
        }
        if (index < right) {
            quick(array, index, right);
        }
    }
};

var quickSort = function(array) {
    quick(array, 0, array.length - 1);
    return array;
};
console.time('quickSort');

console.error(quickSort(arr));
console.timeEnd('quickSort');
randomArr();

console.log(arr);
console.error(arr[5]);
var test = arr[5];
var binarySearch = function(arr, item) {
    quickSort(arr);
    var low = 0,
        high = arr.length - 1,
        mid, element;

    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        element = arr[mid];
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};

console.time('binarySearch');
console.error(quickSort(arr));
console.error(binarySearch(arr, test));
console.timeEnd('binarySearch');
randomArr();