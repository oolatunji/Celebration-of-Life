var factory = {};

factory.colService = {
    saveObject: function (objectToSave, protocol, url) {
        return new Promise(function (fulfill, reject){
            protocol.post(settingsManager.websiteURL + url, objectToSave).
                        success(function (data) {
                            fulfill (data);
                        }).
                        error(function (data) {
                            reject(data);
                        });
        })
    }
};