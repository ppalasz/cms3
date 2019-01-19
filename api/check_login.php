<?
require("config.php");
require("error_functions.php");
require("security.php");
require("db.php");


Database::Connect($db_config);

$message = "admin is NOT logged";
$id_user = (int)$_SESSION["id_user"];

if($_REQUEST["token"] == "")
{
    $_REQUEST = json_decode(file_get_contents('php://input'), true);
}
$token = $_REQUEST["token"];
$refresh = (bool)$_REQUEST["refresh"];
$minutesLeft = 0;

if($id_user>0)
{      
    $token = $_SESSION["token"];  
    $userName = $_SESSION["userName"];  
}
  
if($token != "")
{
    $sql = "select id_user,     
        (TIME_TO_SEC(expire_date) - TIME_TO_SEC(Now()) )  as 'secondsLeft'
        from ".FIX."admin_session where 
            token ='".mysql_escape_string($token)."' and expire_date>=Now() and is_enabled=1 ";
        
    $row = Database::GetRow($sql);
    $id_user = (int)@$row["id_user"];  
    $minutesLeft = (int)@$row["secondsLeft"]/60;  
    if($minutesLeft <= 0)
    {
        $id_user = 0;
        $token = 0;
        $userName = "";
    }

    if($id_user>0)
    {
         $message = "admin is still logged";
    }
}
else
{
    $result = array();
    print json_encode($result);
    exit();
}    

if($id_user>0)
{
    if($userName == "")
    {
        $sql="select * from  ".FIX."administrator 
                where id_administrator=".(int)$id_user."  ";

        $row = Database::GetRow($sql);
        $userName = $row["firstname"]." ".$row["surname"];
        $_SESSION["userName"] = $userName;        
    }
}



if($id_user>0)
{
    $message = "admin is logged" ;     

    if($refresh)
    {
        $sql = "update ".FIX."admin_session  set        
        expire_date = DATE_ADD( Now(), INTERVAL 15 MINUTE),
        is_enabled=(expire_date>=Now()) ,
        visits = visits + 1  ";   
    }
    else
    {
        $sql = "update ".FIX."admin_session set
         visits = visits + 1   ";         
    }
    $sql.=" where token ='".mysql_escape_string($token)."' 
    and is_enabled=(expire_date>=Now()) 
    and id_user=".$id_user." ";

    Database::GetRow($sql);
}

$result = array(
    id_user => $id_user,
    result => ($id_user>0),
    token => $token,
    message => $message,
    userName => $userName,
    minutesLeft => round($minutesLeft,2)    
);

print json_encode($result);
exit();

?>