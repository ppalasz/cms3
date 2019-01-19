<?
class Admin
{
	
	private function GetAdminRight($right)
	{
		$rights = array();
		
		
	
		$sql="select 1 as ok from `".FIX."right` p inner join `".FIX."group_right` gr on p.id_right=gr.id_right ";
		$sql.="inner join `".FIX."administrator_group` ag on gr.id_group=ag.id_group ";
		$sql.="inner join `".FIX."group` g on g.id_group=ag.id_group  ";
		$sql.=" where ag.id_administrator='".$this->id_admin."'";
		$sql.=" and p.right_name='".mysql_escape_string($right)."'";
		
		$row=Database::GetRow($sql);
		
	//	echo($sql);
		
	    if($row["ok"]=="1")
	    	return(true);
	    else
	        return(false);
	}
}

class Security
{
	static public function CodePassword($value)
	{		
		$value=md5($value);		
		return($value);	
	}

	function IP($ip2long = true)
	{
 		if($_SERVER['HTTP_CLIENT_IP'])
 		{
 			 $ip = $_SERVER['HTTP_CLIENT_IP'];
 		}
 		else if($_SERVER['HTTP_X_FORWARDED_FOR'])
 		{
  			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
 		}
 		else
 		{
  			$ip = $_SERVER['REMOTE_ADDR'];
 		}

 		if($ip2long)
 		{
  			$ip = ip2long($ip);
 		}

 		return $ip;
		}

}

?>

