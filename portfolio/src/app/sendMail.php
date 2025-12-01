<?php

switch ($_SERVER['REQUEST_METHOD']) {

    case "OPTIONS":
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: *");

        // Empfange JSON aus Angular (Text-Payload)
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (!$params) {
            http_response_code(400);
            echo "Invalid JSON";
            exit;
        }

        $name = htmlspecialchars($params->name ?? '');
        $email = htmlspecialchars($params->email ?? '');
        $message = nl2br(htmlspecialchars($params->message ?? ''));

        $recipient = 'info@faraji.dev';
        $subject = "Kontaktformular – Nachricht von $name <$email>";

        $body = "
            <html>
                <body>
                    <h2>Neue Kontaktanfrage</h2>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                    <p><strong>Nachricht:</strong><br>$message</p>
                </body>
            </html>
        ";

        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: noreply@faraji.dev\r\n";

        mail($recipient, $subject, $body, $headers);

        echo "OK";
        exit;

    default:
        header("Allow: POST", true, 405);
        exit;
}
