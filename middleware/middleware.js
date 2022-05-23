const validateMiddlware = (req, res, next)=>{
    const{title, price} = req.body;
    if(!title  || !price || req.files ){
        return res.redirect('/create')
    }
    next();
    }


    module.exports = validateMiddlware;