<?php

require __DIR__ . '/vendor/autoload.php';

// Read .env file from parent directory
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 1));
$dotenv->load();

// Define one list per language
$lists = [
    'English' => 'a495c96e4f58aa6d7178959bc84a91e4',
    'French' => 'dd1b61900f60346f5d80692aae07784a'
];

$messages = [
    'English' => [
        'SUCCESS' => 'Great, the next step is to check your email inbox (or spam folder) for a confirmation email that will activate your subscription.',
        'ERROR'    => 'There was a problem signing you up for the email list. Please try again.',
        'FORMAT' => 'Please enter a valid email address.'
    ],
    'French' => [
        'SUCCESS' => 'Parfait! Vérifiez maintenant votre boîte de réception (ou dossier de pourriels) pour y trouver un courriel de confirmation qui vous permettra d\'activer votre abonnement',
        'ERROR'    => 'Un problème est survenu lors de votre abonnement à l’infolettre. Veuillez réessayer.',
        'FORMAT' => 'Veuillez inscrire une adresse courriel valide.'
    ]
];

if ( $_SERVER[ 'REQUEST_METHOD' ] !== 'POST' ) {
    renderResponse( true, $error_message_general );
}
else {
    $api_key = getenv( 'API_KEY' );
    $language = array_key_exists( 'Language', $_POST ) ? $_POST['Language'] : '';
    $list_id = $lists[$_POST['Language']];

    $email = array_key_exists( 'Email', $_POST ) ? $_POST[ 'Email' ] : '';
    $email = cleanInput( $email );

    if ( filter_var( $email, FILTER_VALIDATE_EMAIL ) && $list_id ) {
        try {
            $auth = array(
                'api_key' => $api_key
            );
            $wrap = new CS_REST_Subscribers( $list_id, $auth );

            $result = $wrap->add( array(
                'EmailAddress' => $email,
                'CustomFields' => array(
                    array(
                        'Key' => 'PostalCode',
                        'Value' => $_POST['PostalCode']
                    )
                    ),
                'ConsentToTrack' => 'yes',
                'Resubscribe' => true
            ) );

            if ( $result->was_successful() )
                renderResponse( false, $messages[$language]['SUCCESS'] );
            else
                renderResponse( true, $messages[$language]['ERROR'] );
        }
        catch ( Exception $e ) {
            renderResponse( true, $messages[$language]['ERROR'] );
        }
    }
    else {
        renderResponse( true, $messages[$language]['FORMAT'] );
    }

}

function renderResponse( $error, $message ) {
    header( 'Content-Type: application/json' );
    $result = [
        'error' => $error,
        'message' => $message
    ];
    echo json_encode( $result );
    die();
}

function cleanInput( $data ) {
    $data = trim( $data );
    $data = stripslashes( $data );
    $data = htmlspecialchars( $data );
    return $data;
}
