// service functions
// get search
exports.getCards = function (id) {
    if(!id){
        return [{id:1},{id:2}];
    }
    return [{id:1}];
};
