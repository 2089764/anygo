<?php  
function song($name){
 
                $content2 = file_get_contents("http://shopcgi.qqmusic.qq.com/fcgi-bin/shopsearch.fcg?value=".$name);
 
                $str2=substr($content2,15);
 
                $str2=substr($str2,0,-2);
 
                $tempstrs = explode(",",$str2);
 
                $endstr = array();
 
                $i=0;
 

                foreach($tempstrs as $tempstr)
 
                {
 
                    $endstr[$i] = str_replace(":",'":',$tempstr);
 
                    if($i != 0)
 
                    {
 
                        $endstr[$i] = '"'.$endstr[$i];
 
                    }
 
                    $i++;
 
                }
 
                $endstr[0] = str_replace('{','{"',$endstr[0]);
 
                $endstr[5] = str_replace('[{','[{"',$endstr[5]);
 
                $str2 = implode(",",$endstr);
 
                $str2 = str_replace("[","",$str2);
 
                $str2 = str_replace("]","",$str2);
 
                $str2 = str_replace("\"{","{\"",$str2);
 
                $tempstrs = explode(",",$str2);
 
                $tempstrs[5] = '"songlist1":{"idx":"1"';
 
                $i=0;
 
                $x=2;
 
                foreach($tempstrs as $json){
 
                        $jsons[$i] = iconv('gb2312', 'utf-8//IGNORE', $json);
 
                        if(substr($json,0,8)=='{"idx":"'){
 
                                $a = $i-1;
 
                                $jsons[$i] = iconv('gb2312', 'utf-8//IGNORE', '"songlist'.$x.'":{"idx":"'.$x.'"');
 
                                $x++;
 
                        }
 
                        $i++;
 
                }
 
                $str = implode(",",$jsons);
 
                $result=json_decode($str,true);
 
                return $result;
 
        }
		
$name = "浏阳河";
 
$songname = iconv('utf-8','gb2312',$name );//因为我本地写的时候是utf-8的编码,所以这里歌曲名称的字符串要转换成gb2312
 
$songnameurlcode = urlencode($songname);
 
$musicinfo = song($songnameurlcode);
 
print_r($musicinfo);
//$musicurl = 'http://stream1'.$musicinfo[songlist1][location].".qqmusic.qq.com/3".$musicinfo[songlist1][song_id].".mp3";
echo "\r\nlocation\r\n";
echo $$$$musicinfo[songlist1][location];
echo "\r\nsong_id\r\n";
echo $$$$musicinfo[songlist1][song_id];
$$$$musicurl = 'http://stream1'.$$$$musicinfo[songlist1][location].".qqmusic.qq.com/3".$$$$musicinfo[songlist1][song_id].".mp3";
$$$$resultStr = sprintf($$$$textTpl, $$$$fromUsername, $$$$toUsername, $$$$time, $$$$msgType, $$$$musicinfo[songlist1][song_name],"歌手:".$$$$musicinfo[songlist1][singer_name]." 专辑:".$$$$musicinfo[songlist1][album_name],$$$$musicurl,$$$$musicurl);
echo $$$$resultStr;
 
?>
