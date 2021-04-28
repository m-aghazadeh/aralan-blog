const gravatar= require('gravatar');

exports.gravatar=(eamil, options=null)=>{
    return gravatar.url(eamil,options);
}