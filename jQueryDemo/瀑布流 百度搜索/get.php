<?php
	header('content-type:text/html;charset="utf-8"');

	$user = $_GET['user'];
	$pwd = $_GET['pwd'];
	echo "您的用户名：${'user'},您的密码：${'pwd'}";
?>