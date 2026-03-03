<?php
$sub_menu = "300900";
require_once './_common.php';

auth_check_menu($auth, $sub_menu, 'r');

$sql_common = " from contact_table a ";
$sql_search = " where (1) ";


if ($stx) {
    $sql_search .= " and ( ";
    switch ($sfl) {
        case "bo_table":
            $sql_search .= " ($sfl like '$stx%') ";
            break;
        case "a.gr_id":
            $sql_search .= " ($sfl = '$stx') ";
            break;
        default:
            $sql_search .= " ($sfl like '%$stx%') ";
            break;
    }
    $sql_search .= " ) ";
}


$sql_order = " order by idx desc ";

$sql = " select count(*) as cnt {$sql_common} {$sql_search} {$sql_order} ";
$row = sql_fetch($sql);
$total_count = $row['cnt'];

$rows = $config['cf_page_rows'];
$total_page  = ceil($total_count / $rows);  // 전체 페이지 계산
if ($page < 1) {
    $page = 1; // 페이지가 없으면 첫 페이지 (1 페이지)
}
$from_record = ($page - 1) * $rows; // 시작 열을 구함

$sql = " select * {$sql_common} {$sql_search} {$sql_order} limit {$from_record}, {$rows} ";
$result = sql_query($sql);

$listall = '<a href="' . $_SERVER['SCRIPT_NAME'] . '" class="ov_listall">전체목록</a>';

$g5['title'] = '문의신청현황';
require_once './admin.head.php';

$colspan = 15;
?>
<div class="local_ov01 local_ov">
    <?php echo $listall ?>
    <span class="btn_ov01"><span class="ov_txt">문의글 수</span><span class="ov_num"> <?php echo number_format($total_count) ?>개</span></span>
</div>


<form name="fsearch" id="fsearch" class="local_sch01 local_sch" method="get">
    <label for="sfl" class="sound_only">검색대상</label>
    <select name="sfl" id="sfl">
        <option value="com_title" <?php echo get_selected($sfl, "com_title", true); ?>>회사명</option>
        <option value="com_name" <?php echo get_selected($sfl, "com_name"); ?>>이름</option>
        <option value="com_tel3" <?php echo get_selected($sfl, "com_tel3"); ?>>전화번호 뒷자리</option>
    </select>
    <label for="stx" class="sound_only">검색어<strong class="sound_only"> 필수</strong></label>
    <input type="text" name="stx" value="<?php echo $stx ?>" id="stx" required class="required frm_input">
    <input type="submit" value="검색" class="btn_submit">
</form>


	<div class="tbl_head01 tbl_wrap">
		<table>
			<thead>
                <tr>
                    <th scope="col">회사명</th>
                    <th scope="col">대표자(담당자)</th>
                    <th scope="col">연락처</th>
                    <th scope="col">문의사항</th>
                    <th scope="col">작성날짜</th>
                </tr>
            </thead>
            <tbody>
            	<?php
                for ($i = 0; $row = sql_fetch_array($result); $i++) {
                    $bg = 'bg' . ($i % 2);
                ?>

                    <tr class="<?php echo $bg; ?>">
                    	<td><?php echo $row['com_title'];?></td>
                    	<td><?php echo $row['com_name'];?></td>
                    	<td><?php echo $row['com_tel1'];?>-<?php echo $row['com_tel2'];?>-<?php echo $row['com_tel3'];?></td>
                    	<td><?php echo nl2br($row['com_detail']);?></td>
                    	<td><?php echo $row['reg_dt'];?></td>
                    </tr>
                 <?php }?>
            </tbody>
        </table>
    </div>


<?php echo get_paging(G5_IS_MOBILE ? $config['cf_mobile_pages'] : $config['cf_write_pages'], $page, $total_page, $_SERVER['SCRIPT_NAME'] . '?' . $qstr . '&amp;page='); ?>

<?php
include_once ('./admin.tail.php');