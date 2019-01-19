<?



class Error
{
	static public function TriggerError($msg,$break=true)
	{		
		
		//trigger_error($msg, E_USER_ERROR);
  		echo("<hr/><font color='red'>".$msg."</font><hr/>");

		if($break)
			exit();
	}

	static public function  CheckFileExists($file,$description="")
	{
		if(!file_exists($file))
		{
			$description=$description.": file '".$file."' doesn't exists";
			Error::PageError("USER_ERROR", $description);
			exit();
			//return(false);		
		}
	}	
		
	////////////////////////////////////////////////////////////////////
			
	static public function SQLError($error,$sql)
	{
	
	//	$return="<!--\n\n\n\n\n".$error."\n\n\n\n".$sql."\n\n\n\n\n\n\n\n-->";
	
	
	    $return="<hr>\n<br>\n".$error."<br>\n<br>\n".$sql."<br>\n<hr>\n";
	    if(false)
	    {
		   mail("ppalasz@brtsoft.com",$_SERVER["HTTP_HOST"]." sql error, departament '".ID_DEPARTAMENT."'",$return);
		   $return="SQL error";
	
	    }
		return($return);
	}

	////////////////////////////////////////////////////////////////////

	static public function PageError($type, $msg, $file="", $line="", $context="") 
	{ 
		$text="";
	    switch ($type) { 
	        // notices 
	        case E_NOTICE: 
	            //print "<hr/>Notice on line ".$line ." of ".$file.": ".$msg." <hr/>"; 
	            break; 
	         
	        // warnings 
	        case E_WARNING: 
	            // report error 
	            if(ini_get('error_reporting')>=E_WARNING)
	            {
	            	$text=@$_SERVER["SCRIPT_FILENAME"].@$_SERVER["REQUEST_URI"];
	            	$text.="<hr/>Warning on line ".$line ." of ".$file.": ".$msg."<br/>".print_r($context,true)."<hr/>";
				} 
	            break; 
	
	        // other 
	        default: 
	        {
	        	$text=@$_SERVER["SCRIPT_FILENAME"].@$_SERVER["REQUEST_URI"];
	            $text.= "<hr/>Error of type ".$type." ".$line ." of ".$file.": ".$msg."<br/>".$context."<hr/>"; 
	        }
	            break; 
	    } 
	    if($text!="")
	    {
		    if(Security::AdminLogged())
		    {
		    	echo($text);	    
		    }
		    else
		    {
		    	$email=ADMIN_MAIL;
		    	//Mailer::SendEmail($email, $text, "GEOFORUM ERROR ".WWW,$email,$email,1);	    
		    }
	    }
	} 

}
?>