<?php
header("Content-Type: text/html; charset=utf-8");
//require_once "simple_html_dom.php";
$oldvalue=$_GET["name"]; 
function JSON($array) {
 arrayRecursive($array, 'urlencode', true);
 $json = json_encode($array);
 return urldecode($json);
}
function arrayRecursive(&$array, $function, $apply_to_keys_also = false)
{
    static $recursive_counter = 0;
    if (++$recursive_counter > 1000) {
        die('possible deep recursion attack');
    }
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            arrayRecursive($array[$key], $function, $apply_to_keys_also);
        } else {
            $array[$key] = $function($value);
        }
        if ($apply_to_keys_also && is_string($key)) {
            $new_key = $function($key);
            if ($new_key != $key) {
                $array[$new_key] = $array[$key];
                unset($array[$key]);
            }
        }
    }
    $recursive_counter--;
}

function arrContentReplact($array)    
{    
        if(is_array($array))    
        {    
                foreach($array as $k => $v)    
                {    
                $array[$k] = arrContentReplact($array[$k]);    
                }    
        }else   
        {    
                $array = str_replace(array('<![CDATA[', ']]>'), array('', ''), $array);
        }    
        return $array;    
} 
function unescape($str) {
    $str = rawurldecode($str);
    preg_match_all("/(?:%u.{4})|.{4};|&amp;#\d+;|.+/U",$str,$r);
    $ar = $r[0];
    foreach($ar as $k=>$v) {
        if(substr($v,0,2) == "%u")
        {
            $ar[$k] = iconv("UCS-2","utf-8//IGNORE",pack("H4",substr($v,-4)));
        }
        elseif(substr($v,0,3) == "")
        {
            $ar[$k] = iconv("UCS-2","utf-8",pack("H4",substr($v,3,-1)));
        }
        elseif(substr($v,0,2) == "&amp;#")
        {
            echo substr($v,2,-1)."";
            $ar[$k] = iconv("UCS-2","utf-8",pack("n",substr($v,2,-1)));
        }
    }
    return join("",$ar);
}
$mp3_id = '';//音乐ID
$title_name = '';//音乐名称
$x_url='http://www.xiami.com/search?key='.urlencode($oldvalue)."&pos=1";
$x_con=file_get_contents($x_url);
//href="/song/1768918287" title="春天里">
//preg_match_all('/<h4><a href=\"([^<>]+)\" title/',$html,$result);
preg_match_all('/href=\"\/song\/([0-9]+)\" title=/',$x_con, $locations);


//var_dump($locations);
//echo "aaaaa</br>";
//var_dump($locations[1][0]);
//echo $locations."</br>";
$mp3_id=$locations[1][0];
//echo "mp3_id:".$mp3_id."</br>";
//http://www.xiami.com/search?key=%E6%98%A5%E5%A4%A9%E9%87%8C&pos=1
$x_url="http://www.xiami.com/song/playlist/id/".$mp3_id."/object_name/default/object_id/0";
//echo "x_url:".$x_url."</br>";
$x_con=file_get_contents($x_url);
//echo "x_con:";
//var_dump($x_con);
//echo "</br>";
//<location>
//6hAFlm%%%91882pt%mei222872%53t21..FFF9685_pF.xc883%87El%%fio88329_9.32iam777F121m
//</location>
//http://www.xiami.com/song/playlist/id/1768918287/object_name/default/object_id/0
preg_match_all('/\<artist\><!\[CDATA\[(.*?)\]\]>\<\/artist\>/',$x_con, $singer_name);
//echo "</br>singer_name:";
//var_dump($singer_name);
//echo "</br>";
$singer=$singer_name[1][0];
//echo "singer:".$singer."</br>";


preg_match_all('/\<title\><!\[CDATA\[(.*?)\]\]>\<\/title\>/',$x_con, $song_name);
//echo "</br>song_name:";
//var_dump($song_name);
//echo "</br>";

$singname=$song_name[1][0];
//echo "singname:".$singname."</br>";
//echo "</br>";

preg_match_all('/\<album_name\><!\[CDATA\[(.*?)\]\]>\<\/album_name\>/',$x_con, $album_name);
//echo "</br>album_name:";
//var_dump($album_name);
//echo "</br>";

$albumname=$album_name[1][0];
//echo "albumname:".$albumname."</br>";
//echo "</br>";

preg_match_all('/\<location\>(.*?)\<\/location\>/',$x_con, $locations);
//echo "</br>locations:";
//var_dump($locations);
//echo "</br>";


$str=$locations[1][0];
$num=substr($str, 0,1);
//echo "num:".$num."</br>";
$inp=substr($str,1);
//echo "inp:".$inp."</br>";
$iLe=0;
if($num>0){
    $iLe=strlen($inp)%$num;
}
//echo "iLe:".$iLe."</br>";
$a=0;
$ret='';
$arr=array();
for ($i=0; $i<$num; $i++) {
    $arr [$i] = ($iLe>$i?1:0) + (strlen($inp)-$iLe)/$num;
}
for ($i=0; $i<$arr[1]; $i++)
    {
        $a=0;
        for ($j=0; $j<$num; $j++)
        {
            $ret .= substr($inp, $a+$i,1);
            $a += $arr[$j];
        }
}
$ret_url=unescape($ret);
$url=str_replace('^', '0', $ret_url);
$url=str_replace('+', ' ', $url);
$url=preg_replace('/.mp(.*)/', '.mp3', $url);
//echo $url;
$respon = array('music' => array('title' => $singname, 'musicurl' => $url, 'hqmusicurl' =>$url, 'description' =>"专辑:".$albumname.",演唱者:".$singer));
//var_dump($respon);
$respon = JSON($respon);
echo $respon



?>