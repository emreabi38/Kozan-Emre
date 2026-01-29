// create-payment.php
require_once 'vendor/autoload.php';
$mollie = new \Mollie\Api\MollieApiClient();
$mollie->setApiKey("test_v6RdGVuDUzy3Jxnf84syruTn7QEqFJ");

$payment = $mollie->payments->create([
    "amount" => [
        "currency" => "EUR",
        "value" => $_GET['amount']
    ],
    "description" => $_GET['description'],
    "redirectUrl" => "https://ihredomain.com/thank-you",
    "webhookUrl"  => "https://ihredomain.com/webhook",
    "metadata" => [
        "email" => $_GET['email'],
        "package" => $_GET['package']
    ]
]);

header("Location: " . $payment->getCheckoutUrl());