const axios = require("axios");
var url = "http://localhost:3000/KeyValue";

module.exports = {
    keys: function() {
        var count = 1;
        axios.get(url, { headers: { Accept: "application/json" } })
        .then(res => {
            res.data.forEach(keyValue => {
                console.log(count + ") " + keyValue.key);
                count++;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    members: function (key) {
        var newUrl = url + "/" + key;
        var count = 1;
        axios.get(newUrl, { headers: { Accept: "application/json" } })
        .then(res => {
            if(res.data.key) {
                res.data.value.forEach(value => {
                    console.log(count + ") " + value);
                    count++;
                });
            } else {
                console.log("Key: " + key + " does not exist.");
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    add: function (key, value) {
        var newUrl = url + "/" + key;
        axios.get(newUrl, { headers: { Accept: "application/json" } })
        .then(res => {
            if (!res.data.key) {
                axios.post(url, {
                    key: key,
                    value: [value]
                })
                .then(function () {
                    console.log("Key: " + key + " created successfully.");
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else {
                var responseValues = res.data.value;
                if (!responseValues.includes(value)) {
                    responseValues.push(value);
                    axios.patch(newUrl, {
                        key: key,
                        value: responseValues
                    })
                    .then(function () {
                        console.log("Value: " + value + " added successfully to Key: " + key + ".");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                } else {
                    console.log("Value: " + value + " already exists in Key: " + key + ".");
                }
                
            }
        });
    },
    remove: function (key, value) {
        var newUrl = url + "/" + key;
        axios.get(newUrl, { headers: { Accept: "application/json" } })
        .then(res => {
            if (res.data.key) {
                if(res.data.value.includes(value)) {
                    if(res.data.value.length > 1) {
                        var responseValues = res.data.value;
                        const index = responseValues.indexOf(value);
                        responseValues.splice(index, 1);
                    
                        axios.patch(newUrl, {
                            key: key,
                            value: responseValues
                        })
                        .then(function () {
                            console.log("Value: " + value + " removed successfully from Key: " + key + ".");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        axios.delete(newUrl, { headers: { Accept: "application/json" } })
                        .then(function () {
                            console.log("Key: " + key + " was deleted because Value: " + value + " was it's only value.");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }
                } else {
                    console.log("Value: " + value + " does not exist in Key: " + key);
                }
            }else {
                console.log("Key: " + key + " does not exist");
            }
        });
    },
    removeAll: function (key) {
        var newUrl = url + "/" + key;
        axios.get(newUrl, { headers: { Accept: "application/json" } })
        .then(res => {
            if (res.data.key) {
                axios.delete(newUrl, { headers: { Accept: "application/json" } })
                .then(function () {
                    console.log("Key: " + key + " deleted successfully");
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else {
                console.log("Key: " + key + " does not exist");
            }
        });
    },
    clear: function () {
        axios.get(url, { headers: { Accept: "application/json" } })
        .then(res => {
            res.data.forEach(keyValue => {
                var newUrl = url + "/" + keyValue.key;
                axios.delete(newUrl, { headers: { Accept: "application/json" } })
                .then(function () {
                    console.log("Key: " + keyValue.key + " deleted successfully");
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    keyexists: function (key) {
        var newUrl = url + "/" + key;
        axios.get(newUrl, { headers: { Accept: "application/json" } })
        .then(res => {
            if (res.data.key) {
                console.log("true");
            }else {
                console.log("false");
            }
        });
    },
    valueExists: function (key, value) {
        var newUrl = url + "/" + key;
        axios.get(newUrl, { headers: { Accept: "application/json" } })
        .then(res => {
            if (res.data.key) {
                if(res.data.value.includes(value)) {
                    console.log("true");
                } else {
                    console.log("false");
                }
            }else {
                console.log("false");
            }
        });
    },
    allMembers: function () {
        var count = 1;
        axios.get(url, { headers: { Accept: "application/json" } })
        .then(res => {
            res.data.forEach(keyValue => {
                if (keyValue.value.length > 1) {
                    keyValue.value.forEach(value => {
                        console.log(count + ") " + value);
                        count++;
                    });
                }else {
                    console.log(count + ") " + keyValue.value);
                    count++;
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    items: function () {
        var count = 1;
        axios.get(url, { headers: { Accept: "application/json" } })
        .then(res => {
            res.data.forEach(keyValue => {
                if (keyValue.value.length > 1) {
                    keyValue.value.forEach(value => {
                        console.log(count + ") " + keyValue.key + ": " + value);
                        count++;
                    });
                }else {
                    console.log(count + ") " + keyValue.key + ": " + keyValue.value);
                    count++;
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};