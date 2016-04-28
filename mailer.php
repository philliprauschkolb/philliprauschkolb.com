<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "philliprauschkolb@yahoo.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "<html><body>";
        $email_content = "<style>td{padding:10px}</style>";
        $email_content .= "<h2>Contact Form</h2>"; 
        $email_content .= "<table>"; 
        $email_content .= "<tr><td><b>Name:</b></td><td>$name</td></tr>";
        $email_content .= "<tr><td><b>Email:</b></td><td>$email</td></tr>";
        $email_content .= "<tr><td><b>Message:</b></td><td>$message</td></tr>";
        $email_content .= "</table></body></html>";

        // Build the email headers.
        $email_headers = "From: $name <noreply@mysite.com>";
        $email_headers .= "MIME-Version: 1.0\r\n";
        $email_headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
