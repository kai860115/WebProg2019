# WebProb Practice02 Comment

## 完程度(0~100%)

* 95%
* 要求的功能都有完成

## coding quality

* 95%
* 變數宣告的名稱都很清楚
* 三元運算子 a===b?c:d 符號中間加空格會比較好看，像是 a === b ? c : d

## 正確性

* 100%
* 沒看到錯誤的地方

## 值得學習的地方

* 程式精簡明瞭，要求的功能都有完成

## 建議改進的地方

* iPhone的計算機有先乘除後加減的功能，像是 5+6x -> 6，5+6x4x -> 24, 5+6x4x+ ->29，5+6x4= -> 29，可以思考如何實做(infix and postfix)
* 可以把number handle跟operator handle分成兩個function
* 可以宣告object newState = { ...this.state }，做運算處理時直接改這個物件，等到最後運算結束時再this.setState(() => newState)，就可以少打很多setstate