Parse.serverURL = process.env.SERVER_URL;
require('./_User');
require('./answers');
require(__dirname + '/questionnaire');

Parse.Cloud.define('abc', async req=>{
    var Question = Parse.Object.extend("Question");
    var query = new Parse.Query(Question);
    const results = await query.find({useMasterKey: true});
    results.forEach(obj=>{
        var question = Parse.Object.extend("question");
        question = new question();
        question.set('question', obj.get('question'));
        question.set('input', obj.get('input'));
        question.save(null,{ useMasterKey: true });
    });
});
