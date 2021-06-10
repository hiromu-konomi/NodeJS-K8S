const Tweet = require('../models/tweetSchema'),
    User = require('../models/userSchema');

exports.createTweets = async (req,res) => {
    console.log('createTweetを処理中')
    console.log(req.body);
    const user = {
        _id : ObjectId("60bcf2cc47d49536c7281434"),
        name : "test",
        password : "testpass",
        email : "testmail"
    }
    
    Tweet.create({
        user:user,
        content:req.body.content
    },(error, result )=>{
        if(error) console.log(error)
        else
            console.log("saved : " + result);
        res.redirect('/tweet/')
    })
}

exports.getAllTweets = (req,res) => {
    console.log('getAllTweetsを処理中')
    Tweet.find({}).populate('user').exec((error, result )=>{
        console.log(result)
        const user = {
            name:'testname',
            password:'tesrpass',
            email:'testmail'
        }
        // console.log(result[0]._id.getTimestamp())
        if ( result.length === 0 ){
            console.log("!result")
            res.render('tweet/index', {
                tweets:result,
                user:user
            })
        }
        if(!error)
            // User.findById(result.user)
            console.log("!error")
        res.render('tweet/index', {
            tweets:result,
            user:user
        })
    })
}
