Parse.Cloud.beforeSave('answers', (req)=>{
    req.object.set("user", req.user);
    req.object.set("ACL",new Parse.ACL(req.user));
});