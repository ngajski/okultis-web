<?php
header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Honeypot check
if (!empty($_POST['website'])) {
    // Bot detected — pretend success
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
    $recaptchaSecret = '6LcaSnEsAAAAAL67h51SWKVHCkzPSHJy4jGDtXtV';
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaData = http_build_query([
        'secret'   => $recaptchaSecret,
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

// Prepare email
$to      = 'hello@okultis.com';
$subject = 'New contact from okultis.com: ' . mb_substr($name, 0, 50);

$body  = "Name:    {$name}\n";
$body .= "Email:   {$email}\n\n";
$body .= "Message:\n{$message}\n";

$headers  = "From: noreply@okultis.com\r\n";
$headers .= "Reply-To: " . filter_var($email, FILTER_SANITIZE_EMAIL) . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent! We\'ll be in touch soon.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
