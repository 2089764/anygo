<?php
header("Content-Type: text/html; charset=utf-8");
require_once "simple_html_dom.php";
$value=$_GET["name"];  //歌名
$value = iconv("gbk","utf-8//IGNORE",$value);
$result=find($value);

function find($value)
{
	$qurl='http://music.baidu.com/search?key='.$value;
	$html1=file_get_html($qurl);
	
	$div=$html1->find('span[class=song-title]',0);//
    echo $div;
    if(!$div && !$div->first_child() && !$div->first_child()->href)
    {
        $link1=$div->first_child()->href;//获取第二步的链接
        $link2='http://music.baidu.com/'.$link1.'/download';//加上download，获得下载页面
    
        $html2=file_get_html($link2);
        
        $download=$html2->getElementById('128');//获得音乐的链接	
        //echo $download."<br/>";
        $url=$download->href;
        $title=$html2->find('span[class=fwb]',0)->plaintext;//
        
        $author=$html2->find('span[class=author_list]',0)->plaintext;//歌手	
        return array('title'=>$title,'author'=>$author,'url'=>substr($url,22));
    }
}
//echo $title."<br/>";
//echo $author."<br/>";
//echo substr($url,22);
//echo $result['title']."<br/>";
//echo $result['author']."<br/>";
//echo $result['title']."<br/>";
//echo $result['author']."<br/>";
//echo $result['url'];

$arr = array( 
	"errcode"=> 0,
	"msgtype"=> "music", 
	"music"=> array( 
	'title' =>$result['title'], 
	//'description' => $result['author'],   
	'description' => "特别感谢大师和房子技术支持",   
	'musicurl' => $result['url'],    
	'hqmusicurl' => $result['url'],   
	),
);   
$json_string = json_encode($arr);   
echo $json_string;


?>