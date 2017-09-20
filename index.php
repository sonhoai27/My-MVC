<?php
require_once("Routes.php"); //them nay vao, thì phải them class Route vào

function __autoload($class_name){
    if(file_exists("./app/classes/".$class_name.".php")){
        require_once("./app/classes/".$class_name.".php");
    }
    elseif (file_exists('./app/controllers/'.$class_name.'.php')){
        require_once("./app/controllers/".$class_name.".php");
    }
}
?>