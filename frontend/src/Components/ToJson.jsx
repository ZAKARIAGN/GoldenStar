export const ToJson = (res)=>{
    let jsonString = res.data.replace(/^\/\/ routes\/api\.php\r\n/, "");
    return JSON.parse(jsonString);
}