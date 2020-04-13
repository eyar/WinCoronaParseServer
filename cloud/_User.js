Parse.Cloud.beforeSave('_User', (req)=>{
    req.object.set("username", Math.random().toString());
});

Parse.Cloud.afterSave('_User', (req)=>{
    var user = req.object;
    if (user.existed()) { return; }
    user.setACL(user);
    return user.save(null,{ useMasterKey: true });
});