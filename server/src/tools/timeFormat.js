function formatter(value, flag){
    if(flag === true){
        const time = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
        return time.getFullYear() + "-" + ((time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1):(time.getMonth() + 1))
            + "-" + (time.getDate() < 10 ? "0" + time.getDate():time.getDate()) + " " +
            (time.getHours()<10?"0"+time.getHours():time.getHours()) + ":" +
            (time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes()) + ":" +
            (time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds());
    }
    else{
        const date = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
        return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0"
            + (date.getMonth() + 1):(date.getMonth() + 1))+ "-"
            + (date.getDate() < 10 ? "0" + date.getDate():date.getDate());
    }
}
module.exports = formatter;