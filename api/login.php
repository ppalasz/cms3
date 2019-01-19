<?
require("config.php");
require("error_functions.php");
require("security.php");
require("db.php");

Database::Connect($db_config);

if($_REQUEST["username"]=="")
{
	$_REQUEST = json_decode(file_get_contents('php://input'), true);
}

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$OK=false;
$sql="dd";

if($username!="" && $password!='')
{		
	$sql="select * from  ".FIX."administrator 
			where login='".mysql_escape_string($username)."'  
			and password= '".mysql_escape_string(Security::CodePassword($password))."'";
			

	$row = Database::GetRow($sql);
	$id_administrator = $row["id_administrator"];
	$ip = Security::IP(false);
	$expire_date = date()+1;
	$userName = $row["firstname"]." ".$row["surname"];
	$minutesLeft = 15;

	if($id_administrator>0)
	{
		$token = session_id();
		$sql="insert into `".FIX."admin_session`
			 (`token`, `id_user`, `ip`, `expire_date`, `visits`, `is_enabled`, 
			 `created_on_readonly`)
			 values
			 ('".$token."', '$id_administrator', '".$ip."', DATE_ADD( Now(), INTERVAL ".$minutesLeft." MINUTE), 1, 1, 
			 '".date()."')	 " ;

		Database::GetRow($sql);
		
		$OK = true;
		$result = array(
			id_user => $id_administrator,
			result => true,
			message => 'login successful for admin '.$username." from ".$ip,
			token => $token,
			userName => $userName,
			minutesLeft => 	$minutesLeft,	
		);
		$_SESSION["userName"] = $userName;
		$_SESSION["token"] = $token;
		$_SESSION["id_user"] = $id_administrator;
	}
	
}


if(!$OK)
{
	unset($_SESSION);
	$result = array(
		id_user => null,
		result => false,
		message => 'login failed for admini '.$username.' '.$_SESSION["started"]." from ".$_SERVER['HTTP_ORIGIN'],
		token => null,
		userName => null
	);
}



print json_encode($result);
exit();

?>