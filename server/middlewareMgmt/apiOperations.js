var express = require('express');
var router = express.Router();
var nconf = require('nconf');
router.get('/getZipCode', function(req,res,next){
    var request = require('request');
    var url = nconf.get('validateZipCode')+req.param('zipCode');
    var options = {
      url: url,
      headers: {
       'authorization': 'Basic c3JjTERBUG9sc1dTU2VjVUk6U3RhZ2UyMDEw'
      }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        res.json(body);
      }
    }

    request(options, callback);
});

router.get('/getUserSummary', function(req,res,next){
  var request = require('request');
  var url = nconf.get('getUserSummary')+req.param('userName');
  var options = {
      url: url,
      headers: {
       'authorization': 'Basic QlJLUlBSVFVTUjpCUktSUFJUVFNUUkdO'
     }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
      //  var info = JSON.parse(body);
        res.json(body);
      }else{
        res.status = 500;
        res.json({error : error});
      }
    }
    request(options, callback);
  })


  router.get('/fetchBrands', function(req,res,next){
    var request = require('request');
    var url = nconf.get('fetchcmsBrands_url')+req.param("state")+"&county="+req.param("county");
      var options = {
        url: encodeURI(url)
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          res.json(body);
        }else{
          console.log("error -"+error);
          res.status = 500;
          res.json({error : error});
        }
      }
      request(options, callback);
    })

    router.get('/fetchPlan', function(req,res,next){
      var request = require('request');
      var url = nconf.get('fetchPlan_url')+req.param('state')+'&coverageYear='+req.param('coverageyear')+
                              '&gender='+req.param('gender')+'&county='+req.param('county')+'&zipCode='+req.param('zipCode')+
                              '&dob='+req.param('dob')+'&brand='+req.param('brandName')+'&coverageMonth='+req.param('coveragemonth')+
                              '&type='+req.param('type');
      console.log(encodeURI(url));
        var options = {
          url: encodeURI(url),
          headers: {
           'authorization': 'Basic CnNyY0xEQVBvbHNXU1NlY1VJOlN0YWdlMjAxMA=='
         }
        };

        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("response -"+error);
            var info = JSON.parse(body);
            console.log(body);
            res.json(body);
          }else{
            console.log("error -"+error);
            res.status = 500;
            res.json({error : error});
          }
        }

        request(options, callback);
      })
      router.get('/fetchDashboard', function(req,res,next){
        var request = require('request');
        var url = nconf.get('fetchAgentDashBoard_url');
        // var url = 'http://localhost:8888/jsons/dashboardSummary.json?userId='+req.param('userId')+'&partnerId='+req.param('partnerId')+
        //                         '&isDelegate='+req.param('isDelegate')+'&isAgency='+req.param('isAgency')+'&brokerTIN='+req.param('brokerTIN')+
        //                         '&brokerId='+req.param('brokerId');

          var options = {
            url: url,
          /*  headers: {
             'authorization': 'Basic QlJLUlBSVFVTUjpCUktSUFJUVFNUUkdO'
           }*/
          };

          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              console.log('-----Agent',body);
              res.json(body);
            }else{
              res.status = 500;
              res.json({error : error});
            }
          }
          request(options, callback);
        })

        router.get('/fetchAssistantDashboard', function(req,res,next){
          var request = require('request');
          var url = nconf.get('fetchAssistantDashBoard_url');
          console.log('---',url);
           var url = url+req.param('agentTin')+'&agentId='+req.param('agentId')+
                                   '&isdelegate='+req.param('isdelegate')+'&userId='+req.param('userId')+'&isAgency='+req.param('isAgency')+
                                   '&partnerId='+req.param('partnerId');
                                   console.log('URLDASHBOARD-->',url);

            var options = {
              url: url
            };

            function callback(error, response, body) {
              if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                console.log('-----Assist',body);
                res.json(body);
              }else{
                res.status = 500;
                res.json({error : error});
              }
            }
            request(options, callback);
          })

        router.get('/fetchBrokerList', function(req,res,next){
            var request = require('request');
            var url = nconf.get('STUB_fetchBrokerList_url');
            // url = url.replace('{taxId}' , req.param('taxId'));
            // url = url.replace('{state}' , req.param('state'));
            // url = url.replace('{userid}' , req.param('userid'));
            // var url = 'http://localhost:8888/jsons/dashboardSummary.json?userId='+req.param('userId')+'&partnerId='+req.param('partnerId')+
            //                         '&isDelegate='+req.param('isDelegate')+'&isAgency='+req.param('isAgency')+'&brokerTIN='+req.param('brokerTIN')+
            //                         '&brokerId='+req.param('brokerId');

              var options = {
              /*  url: encodeURI(url),
                headers: {
                 'authorization': 'Basic QlJLUlBSVFVTUjpCUktSUFJUVFNUUkdO'
               }*/
               url : url
              };

              function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  console.log('-----',body);
                  res.json(body);
                }else{
                  res.status = 500;
                  res.json({error : error});
                }
              }
              request(options, callback);
            })




module.exports = router;
