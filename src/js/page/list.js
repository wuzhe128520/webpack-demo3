/**
 *
 * @authors wuzhe (you@example.org)
 * @date    2018-01-17 10:43:08
 * @version $Id$
 */
 import '../../css/common/reset.css';
 import '../../css/lib/bootstrap.min.css';
 import '../../css/page/list.less';
var html = ' ';
for (var i = 0; i < 5; i++) {
    html += '<li>列表' + (i + 1) + '</li>';
}
$('#list').html(html);
