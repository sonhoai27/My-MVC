<!-- <?php
    class Database {
        public static $host = "localhost";
        public static $dbName = "shop";
        public static $userName = "root";
        public static $pass = "";

        private static function connect(){
            $pdo = new PDO(
                "mysql:host=".self::$host.";
                dbname=".self::$dbName.";
                charset=utf8",
                self::$userName,
                self::$pass
            );
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        }
        public static function query ($query, $params = array()){
            $statement = self::connect()->prepare($query);
            $statement->execute($params);
            if(explode(' ', $query)[0] == "SELECT"){
                $data = $statement->fetchALL();
                return $data;
            }
        }

    }
?> -->