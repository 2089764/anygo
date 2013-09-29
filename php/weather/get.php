<?php
header("Content-Type: text/html; charset=utf-8");
//require_once "simple_html_dom.php";
//$value=$_GET["name"];  //城市
$value="深圳";  //歌名
//echo binhex($oldvalue);
//echo "\r\n";
//echo binhex($value);
//$value = iconv("gbk","utf-8//IGNORE",$value);
//echo $value;
$result=getWeather($value);

/**
*   说明:天气接口
*   @param    查询城市名称 
*   @return    返回该地天气JSON
*/
function getWeather($city){
	$wcity = file_get_contents("wcity.txt");
	$array = preg_split('/[\r\n]+/', $wcity , -1, PREG_SPLIT_NO_EMPTY);
	$data_url = 'http://www.weather.com.cn/data/cityinfo/';
	$ext = '.html';
	$citys=array();
	foreach($array as $value){
	$arr=array();
	$arr=explode("=",$value);
	$citys[$arr[1]]=$arr[0];
	}
	//$pattern = '/([0-9]+)='.iconv("utf8","gb2312",$city).'/';
	//preg_match($pattern, $wcity, $matches, PREG_OFFSET_CAPTURE);
	$cityID = empty($citys[$city])?'101010100':$citys[$city];
	$data = file_get_contents($data_url.$cityID.$ext);
	return json_decode($data);
}

var_dump($result);
//$json_string = json_encode($arr);   
//echo "";
//echo $json_string;


?>