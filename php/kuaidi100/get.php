<?php  
$typeNu = $_GET["nu"];  //快递单号
$curl = curl_init();
curl_setopt ($curl, CURLOPT_URL, 'http://www.kuaidi100.com/autonumber/auto?num='.$typeNu);
curl_setopt ($curl, CURLOPT_HEADER,0);
curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($curl, CURLOPT_USERAGENT,$_SERVER['HTTP_USER_AGENT']);
curl_setopt ($curl, CURLOPT_TIMEOUT,5);
$infos = curl_exec($curl);
curl_close ($curl);
$infos = json_decode($infos);
$typeCom = $infos[0]->comCode;  

 
$url ='http://www.kuaidi100.com/query?type='.$typeCom .'&postid='.$typeNu.'&id=1&valicode='; 

//优先使用curl模式发送数据
if (function_exists('curl_init') == 1){ 
  $curl = curl_init();
  curl_setopt ($curl, CURLOPT_URL, $url);
  curl_setopt ($curl, CURLOPT_HEADER,0);
  curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt ($curl, CURLOPT_USERAGENT,$_SERVER['HTTP_USER_AGENT']);
  curl_setopt ($curl, CURLOPT_TIMEOUT,5);
  $get_content = curl_exec($curl);
  curl_close ($curl);  
}else{
  include("snoopy.php");
  $snoopy = new snoopy();
  $snoopy->referer = 'http://www.google.com/';//伪装来源
  $snoopy->fetch($url);
  $get_content = $snoopy->results;
} 
$str = ''; 
$temArr = json_decode($get_content); 
if(!$temArr)
{
	exit('网络延迟，请重试！');
}
if($temArr->status ==201){
	exit($temArr->message);
} 
if($temArr->status <> 200){
	exit($temArr->message);
} 

foreach($temArr->data as $v ){ 
	$str .= $v->time.'    '.$v->context."\n\r";
} 
echo $str;
?>
