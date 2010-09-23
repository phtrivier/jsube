var g_i18n = {
    "en" : { 

    },
    "fr" : {
	
    }
};

NoCanvas = function () {
};

NoCanvas.prototype.append_i18n = function (selector, lg, key) {
    $(selector).append(g_home_i18n[lg][key]);
}

$(document).ready(function () {
    var lg = get_lg();
    n = new NoCanvas();
//    n.append_i18n("#sorry")
});