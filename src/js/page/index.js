/**
 *
 * @authors wuzhe (you@example.org)
 * @date    2018-01-17 09:57:26
 * @version $Id$
 */
import '../../css/common/reset.css';
import '../../css/lib/bootstrap.min.css';
import '../../css/page/index.less';

 $('.g-bd').append('<p class="text-center success">这是由js生成的一句话。</p>');
/* var iframeError = setTimeout(error, 5000);;


function load(e) {
    alert(e);
}

function error() {
    alert('error');
}
$(document).ready(function () {
    $('iframe').on('load', (function () {
        load('ok');
        clearTimeout(iframeError);
    }));

});*/

var iframe = $("iframe").get(0);

if (iframe.attachEvent){
    iframe.attachEvent("onload", function(){
        alert("加载成功！");
    });
} else {
    iframe.onload = function(){
        alert("加载成功");
    };
}

