var express = require('express');
var router = express.Router();
var Articles = require('../../models/articles');

/* GET articles listing. */
router.get('/', function(req, res, next) {

  Articles.find({}, function(err, articles){

      if(err){
        return res.json({success: false, error: err});
      }

      return res.json({success: true, articles: articles});
  });

});

router.get('/:slug', function(req, res, next) {

  var slug = req.params.slug;

  Articles.findOne({slug:slug}, function(err, articles){

      if(err){
        return res.json({success: false, error: err});
      }

      return res.json({success: true, articles: articles});
  });

});

//create a article
router.post('/', function(req, res){
  Articles.create(new Articles({
    title: req.body.title,
  }), function(err, article){

    if(err){
      return res.json({
        success:false, 
        error:err, 
        article:req.body
      });
    }

    return res.json({success:true, article: article});

  });

});


//update a article
router.put('/', function(req, res){

  Articles.findOne({_id: req.body._id}, function(err, article){

    if(err){
      return res.json({success: false, error: err});
    }

    if(article){
      let data = req.body;

      //if a value was passed update it
      if(data.title){
        article.title = data.title;
      }

      if(data.keywords){
        article.keywords = data.keywords;
      }
      
      if(data.description){
        article.description = data.description;
      }
      
      if(data.body){
        article.body = data.body;
      }

      article.save(function(err){
        if(err){
          return res.json({success: false, error: err});
        }else{
          return res.json({success: true, article: article});
        }
      });
    }else{
      
    }

  });
});

//Delete a single article
router.delete('/:articleId', function(req,res){
  var articleId = req.params.articleId;

  Articles.remove({_id: articleId}, function(err, removed){
    if(err){
      return res.json({success: false, error:err});
    }

    return res.json({success: true, status:removed});

  });
});

module.exports = router;
