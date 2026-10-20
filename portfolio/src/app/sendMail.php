<?php

// Erlaubte Absender-Seiten für Browser-Anfragen (CORS).
// localhost nur drin lassen, solange du lokal gegen dieses Skript testest.
$allowedOrigins = [
    'https://faraji.dev',
    'https://www.faraji.dev',
    'http://localhost:4200',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
}

switch ($_SERVER['REQUEST_METHOD']) {

    case "OPTIONS":
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        exit;

    case "POST":
        $params = json_decode(file_get_contents('php://input'));

        if (!$params) {
            http_response_code(400);
            echo "Invalid JSON";
            exit;
        }

        // Honeypot "company" (im Angular-Formular bereits vorhanden): Menschen sehen das Feld nicht.
        // Ist es gefüllt, war es ein Bot. Wir antworten "OK", damit der Bot
        // keinen Grund hat, es anders zu versuchen, senden aber nichts.
        if (!empty($params->company ?? '')) {
            echo "OK";
            exit;
        }

        // Zeilenumbrüche entfernen: Name und E-Mail landen im Betreff bzw. in
        // Mail-Headern, und \r\n dort würde Header-Injection ermöglichen.
        $nameRaw    = trim(str_replace(["\r", "\n"], ' ', (string)($params->name ?? '')));
        $emailRaw   = trim((string)($params->email ?? ''));
        $messageRaw = trim((string)($params->message ?? ''));

        // Validierung: Pflichtfelder, gültige E-Mail, sinnvolle Längen.
        if (
            $nameRaw === '' || mb_strlen($nameRaw) > 100 ||
            !filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ||
            $messageRaw === '' || mb_strlen($messageRaw) > 5000
        ) {
            http_response_code(422);
            echo "Invalid input";
            exit;
        }

        // Für den HTML-Body escapen.
        $name    = htmlspecialchars($nameRaw, ENT_QUOTES, 'UTF-8');
        $email   = htmlspecialchars($emailRaw, ENT_QUOTES, 'UTF-8');
        $message = nl2br(htmlspecialchars($messageRaw, ENT_QUOTES, 'UTF-8'));

        $recipient = 'info@faraji.dev';

        // Betreff UTF-8-kodieren, damit Umlaute und der Gedankenstrich korrekt ankommen.
        $subjectText = "Kontaktformular – Nachricht von $nameRaw";
        $subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

        $body = "
            <html><body>
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Nachricht:</strong><br>$message</p>
            </body></html>
        ";

        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: noreply@faraji.dev\r\n";
        // Antworten gehen direkt an den Absender. Sicher, weil die Adresse
        // oben validiert wurde und keine Zeilenumbrüche enthalten kann.
        $headers .= "Reply-To: $emailRaw\r\n";

        // Rückgabewert prüfen, statt immer "OK" zu melden.
        if (!mail($recipient, $subject, $body, $headers)) {
            http_response_code(500);
            echo "Mail failed";
            exit;
        }

        echo "OK";
        exit;

    default:
        header("Allow: POST", true, 405);
        exit;
}
