import config from 'config';
export const getQrCode = (req:any,res:any)=>{
    let {fileName} = req.params;
    res.setHeader('Content-type', 'image/png');
    let qrCodePath = config.get('qrCodePath');
    res.download(`${qrCodePath}/${fileName}`);
}
