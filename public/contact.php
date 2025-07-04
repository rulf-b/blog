<?php
// İletişim formundan gelen verileri e-posta ile gönderir
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    $to = ''; // Buraya kendi e-posta adresinizi yazın
    $subject = 'Web Sitesi İletişim Formu';
    $body = "Ad: $name\nE-posta: $email\nMesaj: $message";
    $headers = "From: iletisim@SITENIZ.com\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'E-posta gönderilemedi.']);
    }
    exit;
}
?>
