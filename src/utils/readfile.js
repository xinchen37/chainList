/*
 * @Author: your name
 * @Date: 2021-07-28 16:05:27
 * @LastEditTime: 2021-08-03 15:35:46
 * @Description: 读取文件
 * @FilePath: \rnft-dapp-airDrop\src\utils\readfile.js
 */
import { read } from 'xlsx';

// 读取 txt
export const readTxt = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsText(file.raw);
    reader.onload = oFREvent => { // 读取完毕从中取值
      let pointsTxt = oFREvent.target.result.split('\r\n');
      // 删除超过 1000 的部分
      if (pointsTxt.length > 1000) {
        pointsTxt.splice(1000);
      }
      resolve(pointsTxt);
    };
  })
}

// 读取 excel
export const readExcel = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file.raw);
    reader.onload = function (e) {
      let addressArr = [];
      let data = e.target.result;
      let workbook = read(data, {type: 'binary'});
      let temp = workbook.Sheets.Sheet1;
      let count = 0;
      for (let i in temp) {
        // 如果数量大于 1000 则返回
        if (count > 1001) break ;
        if (i[0] !== '!') {
          addressArr.push(temp[i].v);
        }
        count++;
      }
      // 删除数组第一个元素，因为第一个元素为 address
      addressArr.shift();
      resolve(addressArr)
    }
  })
}
