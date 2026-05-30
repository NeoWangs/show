window.onload = function () {
	function orientationChange() {
		if (window.orientation == 90 || window.orientation == -90) {
			//$('#rotate').show();
		} else {
			//$('#rotate').hide();
		}
	}
	orientationChange();
	window.onresize = orientationChange;

}

//统计渠道

function getQueryString(name) {	
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
}