<?
class Database
{

	static function Connect($db_config)
	{
		global $my_database;	
	
		$link = mysql_pconnect($db_config["server"], $db_config["login"], $db_config["password"]) or die (mysql_error());
	    
		mysql_select_db ($db_config["database"]) 
			or die (Error::SQLError(mysql_error(),"") );
		
		//LogActivity();
		
		$sql="SET character_set_client = utf8;";
		Database::GetRow($sql);
		$sql="SET character_set_results = utf8;";
		Database::GetRow($sql);
		$sql="SET character_set_connection = utf8;";
		Database::GetRow($sql);
		$sql="SET character_set_server= utf8;";
		Database::GetRow($sql);
		
		
		
		return($link);	
	}
	
	
	static function GetRow($sql,$field=-1)
	{
		$result=mysql_query ($sql) 
				or die (Error::SQLError(mysql_error(),$sql));
		
		
		if(!$result) //brak wyniku
			return(false);
			
		if($result=="1") //update lub delete
			return(false);
		 
		if (!($row = @mysql_fetch_array(@$result, MYSQL_BOTH)))		
			return(false);
			
		mysql_free_result($result);
		
		
		if($field>-1)
			return($row[$field]);
		else
			return($row);
	
	}

}

?>