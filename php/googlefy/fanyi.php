<?php
    /* Google翻译PHP接口
     * 官成文 2009-03-28
     * http://blog.csdn.net/aprin/
     * 注意：如果翻译文本为UTF-8编码，则要删去mb_convert_encoding函数
     */
$search = array ("'<script[^>]*?>.*?</script>'si",  // 去掉 javascript  
                 "'<[\/\!]*?[^<>]*?>'si",           // 去掉 HTML 标记  
                 "'([\r\n])[\s]+'",                 // 去掉空白字符  
                 "'&(quot|#34);'i",                 // 替换 HTML 实体  
                 "'&(amp|#38);'i",  
                 "'&(lt|#60);'i",  
                 "'&(gt|#62);'i",  
                 "'&(nbsp|#160);'i",  
                 "'&(iexcl|#161);'i",  
                 "'&(cent|#162);'i",  
                 "'&(pound|#163);'i",  
                 "'&(copy|#169);'i",  
                 "'&#(\d+);'e");                    // 作为 PHP 代码运行  
  
$replace = array ("",  
                  "",  
                  "\\1",  
                  "\"",  
                  "&",  
                  "<",  
                  ">",  
                  " ",  
                  chr(161),  
                  chr(162),  
                  chr(163),  
                  chr(169),  
                  "chr(\\1)"); 

function html2text($str,$encode = 'GB2312')
{
 
  $str = preg_replace("//is", "", $str);
  $str = preg_replace("//is", "", $str);
  $str = preg_replace("/
/i", "\n", $str);
  $str = preg_replace("/ /i", "\n\n", $str);
  $str = preg_replace("/ /i", "\n", $str);
  $str = preg_replace("/ /i", "\n", $str);
  $str = preg_replace("/ /i", "\n", $str);
  $str = preg_replace("/ /i", "\n", $str);

  $str = preg_replace("/\ \;/i", " ", $str);
  $str = preg_replace("/\ /i", " ", $str);
 
  $str = preg_replace("/\&\;/i", "&", $str);
  $str = preg_replace("/\&/i", "&", $str);
 
  $str = preg_replace("/\<\;/i", "<", $str);
  $str = preg_replace("/\</i", "<", $str);
 
  $str = preg_replace("/\&ldquo\;/i", '"', $str);
  $str = preg_replace("/\&ldquo/i", '"', $str);

    $str = preg_replace("/\&lsquo\;/i", "'", $str);
    $str = preg_replace("/\&lsquo/i", "'", $str);

    $str = preg_replace("/\&rsquo\;/i", "'", $str);
    $str = preg_replace("/\&rsquo/i", "'", $str);

  $str = preg_replace("/\>\;/i", ">", $str);
  $str = preg_replace("/\>/i", ">", $str);

  $str = preg_replace("/\&rdquo\;/i", '"', $str);
  $str = preg_replace("/\&rdquo/i", '"', $str);

  $str = strip_tags($str);
  $str = html_entity_decode($str, ENT_QUOTES, $encode);
  $str = preg_replace("/\&\#.*?\;/i", "", $str);
     
  return $str;
}

function DeleteHtml($str)
{
	$str = trim($str);
	$str = strip_tags($str,"");
	$str = ereg_replace("\t","",$str);
	$str = ereg_replace("\r\n","",$str);
	$str = ereg_replace("\r","",$str);
	$str = ereg_replace("\n","",$str);
	$str = ereg_replace(" "," ",$str);
	return trim($str);
}
function htmtocode($content) {   
        $content = str_replace("\n", " ", str_replace(" ", " ", $content));   
        return $content;    
} 
    class Google_API_translator { 
        public $url = "http://translate.google.com/translate_t";
        public $text = "";//翻译文本
        public $out = ""; //翻译输出
        
        function setText($text){
            $this->text = $text;
        } 
        
        function translate() { 
            $this->out = ""; 
            
            $gphtml = $this->postPage($this->url, $this->text); 
            
            //提取翻译结果
            //echo $gphtml;
            $out = substr($gphtml, strpos($gphtml,"<span id=result_box"));
            //echo $out;
            $out = substr($out, 39);
            $out = substr($out, 0, strpos($out, "</div>"));
            $out = html2text($out);
            $out = htmtocode($out);
            //echo $out;
            //$out = DeleteHtml($out);
            //echo strlen($out);
            //$out=str_replace("<span>"," ",$out);
            //$out=str_replace("</span>"," ",$out);
            $this->out = $out;
            //echo $out;
            return $this->out; 
        } 
        
        function postPage($url, $text) { 
            $html =''; 
            
            if($url != "" && $text != "") { 
                $ch = curl_init($url); 
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
                curl_setopt($ch, CURLOPT_HEADER, 1); 
                //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
                curl_setopt($ch, CURLOPT_TIMEOUT, 15); 
                
                /*
                 *hl - 界面语言，此处无用。
                 *langpair - src lang to dest lang
                 *ie - urlencode的编码方式?
                 *text - 要翻译的文本
                 */
                $fields = array('hl=zh-CN', 'langpair=zh-CN|en', 'ie=UTF-8','text='.$text);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, implode('&', $fields));                                                     
                
                $html = curl_exec($ch); 
                if(curl_errno($ch)) $html = ""; 
                curl_close ($ch); 
            } 
            return $html; 
        } 
    } 
    
    //just for test
    $value=$_GET["txt"];  //歌名
    //$value = iconv("gbk","utf-8//IGNORE",$value);
    $g = new Google_API_translator(); 
    $g->setText($value); 
    $g->translate();
    //$g->out = iconv("gbk","utf-8//IGNORE",$g->out);
//$g->out=html2text($g->out)

    echo $g->out;
?>