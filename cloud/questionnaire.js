['one_time', 'daily'].forEach(type=>{
    Parse.Cloud.define(type, async req=>{
        const query = new Parse.Query("Question");
        query.equalTo("questionnaireType", type);
        const results = await query.find({useMasterKey: true});
        const questions = results.map(obj=>{
            return {
                question: obj.get('question'),
                input: obj.get('input')
            };
        });
        return {
            type: type,
            questions: questions
        };
    });
});
