<?php
include_once('./_common.php');


$com_title = $_POST['com_title'];
$com_name = $_POST['com_name'];
$com_tel1 = $_POST['com_tel1'];
$com_tel2 = $_POST['com_tel2'];
$com_tel3 = $_POST['com_tel3'];
$com_detail = $_POST['com_detail'];


$sql = "insert into contact_table (com_title, com_name, com_tel1, com_tel2, com_tel3, com_detail) values ('$com_title','$com_name','$com_tel1','$com_tel2','$com_tel3','$com_detail')";


$result = sql_query($sql);

if($result){
       echo "true";
}else{
    echo "false";
}