<?php
	header('content-type:text/html;charset="utf-8"');

	$user = $_POST['user'];
	$pwd = $_POST['pwd'];
	echo "欢迎您,您的用户名：${'user'},您的密码：${'pwd'}";
?>