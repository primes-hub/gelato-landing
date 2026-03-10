<?php
// honeypot 스팸 차단
if (!empty($_POST['website'])) {
    exit;
}

// 개인정보 동의 체크
if (empty($_POST['privacy_agree'])) {
    exit('개인정보 동의 필요');
}

// 입력값 정리
$company  = htmlspecialchars(trim($_POST['company'] ?? ''));
$name     = htmlspecialchars(trim($_POST['name'] ?? ''));
$phone1   = htmlspecialchars(trim($_POST['phone1'] ?? ''));
$phone2   = htmlspecialchars(trim($_POST['phone2'] ?? ''));
$phone3   = htmlspecialchars(trim($_POST['phone3'] ?? ''));
$message  = htmlspecialchars(trim($_POST['message'] ?? ''));
$phone    = $phone1 . '-' . $phone2 . '-' . $phone3;

// 필수값 검증
if (empty($company) || empty($name) || empty($phone1) || empty($phone2) || empty($phone3) || empty($message)) {
    exit('필수 항목을 모두 입력해주세요.');
}

// 메일 설정
$to      = 'help@hes.co.kr';
$subject = '[젤라또 문의] ' . $company . ' / ' . $phone;
$body    = "회사명 : {$company}\n대표자명 : {$name}\n연락처 : {$phone}\n\n문의내용 : {$message}";

$headers  = "From: help@hes.co.kr\r\n";
$headers .= "Reply-To: help@hes.co.kr\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    header('Location: /gelato/mail/thankyou.html');
    exit();
} else {
    exit('메일 전송 실패');
}
