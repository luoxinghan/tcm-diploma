//对时间的处理的一些函数放置在Data.js中
export function getCurrentDate() {
    let date = new Date();
    let format1 = "-";
    let format2 = ":";
    let month = date.getMonth() + 1;//date.getMonth() 的值为0到11
    let day = date.getDate();//日
    let hours = date.getHours();//时
    let minutes = date.getMinutes();//分
    let seconds = date.getSeconds();//秒

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if(hours >= 0 && hours <=9){
        hours = "0" + hours;
    }
    if(minutes >= 0 && minutes <=9){
        minutes = "0" + minutes;
    }
    if(seconds >= 0 && seconds <=9){
        seconds = "0" + seconds;
    }
    return date.getFullYear() + format1 + month + format1 + day
        + " " + hours + format2 + minutes
        + format2 + seconds;
}