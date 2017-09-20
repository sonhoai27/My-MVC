<?php
    //route nay laf hoi den class row khi them vao trong index.
    Route::set('index.php', function(){
        Controller_Index::Controller_Home('Controller_Index'); //class gọi tới controller home
    });
?>