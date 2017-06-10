var request = require('request');

Cloud = {

    share: function(target_server, data, callback, err_callback){
        if (target_server.indexOf('http://') == -1 && target_server.indexOf('https://') == -1){
            target_server = 'http://'+target_server;
        }

        var uri = target_server+'/api/1.0/docs';

        request({
            method: 'POST',
            uri: uri,
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
            },
            function(err, res, body){
                if (err){
                    err_callback(err.message);
                    return;
                }

                if (body.status == 'error'){
                    err_callback(body.message);
                    return;
                }

                callback(body.result);
            });
    },

    getVersion: function(callback){
        request({
            method: 'GET',
            uri: 'http://www.sqltabs.com/version',
            },
            function(err, res, body){
                if (err){
                    return; // ignore errors
                }

                callback(body);
            });
    }
}
module.exports = Cloud;
