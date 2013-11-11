<?php
header("Content-Type: text/html; charset=utf-8");
//require_once "simple_html_dom.php";
$oldvalue=$_GET["name"];  //歌名
$value="朴树送别";
//echo binhex($oldvalue);
//echo "\r\n";
//echo binhex($value);
//$value = iconv("gbk","utf-8//IGNORE",$value);
//echo $value;
$result=find($value,$oldvalue);
function binhex($str) {$hex = "";
    $i = 0;
    do {
        $hex .= sprintf("%02x", ord($str{$i}));
        $i++;
    } while ($i < strlen($str));
    return $hex;
}
function find($value,$oldvalue)
{
    $qurl='http://nnlife.duapp.com/xiami.php?key='.urlencode($oldvalue);
    $qurl = str_replace(" ", "%20", $qurl);
    $qurl = str_replace("+", "%20", $qurl);
	$nqurl='http://nnlife.duapp.com/xiami.php?key='.$value;
	//echo $qurl."</br>";
	//echo binhex($qurl)."</br>";
	//echo binhex($nqurl)."</br>";
	$html = file_get_contents($qurl);
	//var_dump($html);
	if($html)
	{
		$musijson = json_decode($html);
		//print_r(json_decode($html)->song->song_name);
		//print_r($musijson->song->song_name);
		//print_r($musijson->song->artist_name);
		//print_r($musijson->song->song_location);
		//return -2;
		if($musijson && $musijson->song->song_name)
		{	
			 return array('title'=>$musijson->song->song_name,'author'=>$musijson->song->artist_name,'url'=>$musijson->song->song_location);
		}
	}
}

//echo $json_string;
$arr = array( 
	"errcode"=> 0,
	"msgtype"=> "music", 
	"music"=> array( 
	'title' =>$result['title'], 
	'description' => $result['author'],   
	//'description' => "特别感谢老萨提供虾米音乐API",   
	'musicurl' => $result['url'],    
	'hqmusicurl' => $result['url'],   
	),
);   
$json_string = json_encode($arr);   
//echo "";
echo $json_string;


?>