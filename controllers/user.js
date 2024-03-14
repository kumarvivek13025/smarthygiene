const devices=require('../models/devices');
exports.getDevices=(req,res,next)=>{
    res.render('user/devices.ejs',{
        path:'/devices'
    })
}

exports.getMailbox=(req,res,next)=>{
    res.render('user/mailbox.ejs',{
        path:'/mailbox'
    })
}


exports.getAddDevice=(req,res,next)=>{
    res.render('user/add-device.ejs',{
        path:'/devices/add-devices'
    })
}

exports.postAddDevice=(req,res,next)=>{
    const deviceName=req.body.deviceName;
    const location=req.body.location;
    console.log(req.user);
    const device=new devices({
        deviceName:deviceName,
        location:location,
        userId:req.user
    })

    device
    .save()
    .then(result=>{
        res.redirect('/devices')
    })
    .catch(err=>{
        console.log(err);
    })

}