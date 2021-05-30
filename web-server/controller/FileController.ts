import config from 'config';
import * as fs from "fs";
export const download = (req:any,res:any)=>{
    let {fileName} = req.params;
    res.set({
        "Content-Type":"application/octet-stream",//告诉浏览器这是一个二进制文件
        "Content-Disposition":`attachment; filename=${fileName}`//告诉浏览器这是一个需要下载的文件
    });
    let mediaPath = config.get('mediaPath');
    // res.download(`${mediaPath}/${fileName}`);
    fs.createReadStream(`${mediaPath}/${fileName}`).pipe(res);
}
