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
    echo json_encode(['success' => true, 'message' => 'Message sent! We\'ll be in touch soon.']);
    exit;
}

// Collect & sanitize
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

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

if ($message === '') {
    $errors[] = 'Message is required.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// reCAPTCHA v3 verification (skipped when user has rejected cookies)
$recaptchaToken = $_POST['g-recaptcha-response'] ?? '';

if ($recaptchaToken !== '') {
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaData = http_build_query([
        'secret'   => $config['recaptcha_secret'],
        'response' => $recaptchaToken,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $recaptchaContext = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $recaptchaData,
        ],
    ]);

    $recaptchaResult = file_get_contents($recaptchaUrl, false, $recaptchaContext);
    $recaptchaJson = json_decode($recaptchaResult, true);

    if (!$recaptchaJson || empty($recaptchaJson['success']) || ($recaptchaJson['score'] ?? 0) < 0.5) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed. Please try again.']);
        exit;
    }
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
    $mail->Subject = 'New contact from okultis.com: ' . mb_substr($name, 0, 50);
    $mail->Body    = "Name:    {$name}\nEmail:   {$email}\n\nMessage:\n{$message}\n";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Message sent! We\'ll be in touch soon.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
