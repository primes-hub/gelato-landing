<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

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

// 메일 제목
$subject = '[젤라또 문의] ' . $company . ' / ' . $phone;

// 메일 본문
$body = "회사명 : {$company}\n대표자명 : {$name}\n연락처 : {$phone}\n\n문의내용 : {$message}";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.cafe24.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'help@hes.co.kr';
    $mail->Password   = ''; // FTP 업로드 후 직접 입력
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('help@hes.co.kr', '젤라또 문의');
    $mail->addAddress('help@hes.co.kr');

    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();

    header('Location: /gelato/mail/thankyou.html');
    exit();
} catch (Exception $e) {
    exit('메일 전송 실패: ' . $mail->ErrorInfo);
}
