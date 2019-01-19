<?
if((session_id()==""))
{
	session_set_cookie_params(5*3600,"/");
	session_start();
	$_SESSION["started"]++;
}



//ob_implicit_flush(0);

mb_internal_encoding("UTF-8");

if (!isset($old_error_reporting))
{
	error_reporting(E_ALL);
	@ini_set('display_errors', '1');
}
error_reporting(E_ERROR);
@ob_end_clean();


define("DOMAIN",$_SERVER["SERVER_NAME"]);
define("WWW","http://".DOMAIN."/");

ini_set("session.cookie_domain", ".".DOMAIN);

$origin = $_SERVER['HTTP_ORIGIN'];

//print("origin=".$origin);
//exit();
/*
$allowed_domains = array(
	'http://angular.brtsoft.pl/', 'http://evil.com/','http://localhost:4200/'   
);

if (in_array($origin, $allowed_domains)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

*/

header('Content-Type: application/json');
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 1');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}


$db_config["server"]	=	"localhost";
$db_config["database"]	=	"brtsoft27";
$db_config["login"]	=	"brtsoft27";
$db_config["password"]	=	"geoforum123";

define("FIX","zzz_");
?>