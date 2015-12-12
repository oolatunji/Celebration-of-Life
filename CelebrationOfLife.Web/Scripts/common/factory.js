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
    },
    updateObject: function (objectToSave, protocol, url) {
        return new Promise(function (fulfill, reject) {
            protocol.put(settingsManager.websiteURL + url, objectToSave).
                        success(function (data) {
                            fulfill(data);
                        }).
                        error(function (data) {
                            reject(data);
                        });
        })
    },
    getObject: function (objectToSave, protocol, url) {
        return new Promise(function (fulfill, reject) {
            protocol.get(settingsManager.websiteURL + url).
                        success(function (data) {
                            fulfill(data);
                        }).
                        error(function (data) {
                            reject(data);
                        });
        })
    }
};