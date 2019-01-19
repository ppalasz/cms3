<?
require("config.php");
require("error_functions.php");
require("security.php");
require("db.php");

$message="admin is NOT logged";

Database::Connect($db_config);

//read token
if($_REQUEST["token"]=="")
{
    $_REQUEST = json_decode(file_get_contents('php://input'), true);
}

$token = $_REQUEST["token"];
if($token != "")
{
    $sql = "update ".FIX."admin_session set is_enabled=0  
            where token ='".mysql_escape_string($token)."' and expire_date>=Now() and is_enabled=1 ";
        
    $row = Database::GetRow($sql);
    $message="admin is logged out";
}

session_start();
session_unset();
session_destroy();
session_write_close();
setcookie(session_name(),'',0,'/');
session_regenerate_id(true);



$result = array(
    id_user => null,
    result => false,
    token =>null,
    minutesLeft => 0,
    message => $message
);



print json_encode($result);
exit();

?>