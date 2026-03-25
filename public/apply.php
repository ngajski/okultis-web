<?php
header('Content-Type: application/json');

// Load config
$config = require __DIR__ . '/config.php';

// PHPMailer
require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Honeypot check
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true, 'message' => 'Application sent! We\'ll review it and get back to you.']);
    exit;
}

// Collect & sanitize
$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$linkedin = trim($_POST['linkedin'] ?? '');
$role     = trim($_POST['role'] ?? '');
$message  = trim($_POST['message'] ?? '');

// Validate
$errors = [];

if ($name === '') {
    $errors[] = 'Name is required.';
}

if ($email === '') {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}

if ($role === '') {
    $errors[] = 'Position is required.';
}

if ($message === '') {
    $errors[] = 'Cover letter is required.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Send email via PHPMailer SMTP
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = $config['smtp_enc'];
    $mail->Port       = $config['smtp_port'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($config['smtp_user'], 'Okultis Website');
    $mail->addAddress('hello@okultis.com');
    $mail->addReplyTo(filter_var($email, FILTER_SANITIZE_EMAIL), $name);

    $mail->isHTML(false);
    $mail->Subject = 'New application from okultis.com: ' . mb_substr($name, 0, 50) . ' - ' . mb_substr($role, 0, 50);

    $body = "Name:     {$name}\nEmail:    {$email}\n";
    if ($linkedin !== '') {
        $body .= "LinkedIn: {$linkedin}\n";
    }
    $body .= "Position: {$role}\n\nCover letter:\n{$message}\n";

    $mail->Body = $body;
    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Application sent! We\'ll review it and get back to you.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send application. Please try again later.']);
}
