<?php

if(isset($_POST) && !empty($_POST)) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($username == 'admin' && $password == 'admin') {
        ?>
    {
        "success":true,
        "secret": "secret"
    }
            <?php
        } else {
            ?>
    {
        "succes":false,
        "message": "invalid credentials"
    }
            <?php
        }
    } else {
        ?>
    {
        "succes": false,
        "message": "only Post access accepted"
    }
        <?php
    }
?>