<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
		<script src="http://libs.baidu.com/bootstrap/2.0.4/js/bootstrap.min.js"></script>
		<link href="http://libs.baidu.com/bootstrap/2.0.4/css/bootstrap.min.css" rel="stylesheet"/>
		<title>天气查询简单版</title>
	</head>
	<body>
		<form class="form-horizontal" action="" method="post">
			<legend>
				Weather
			</legend>
			<div class="control-group">
				<label class="control-label" for="idCity">城市：</label>
				<div class="controls">
					<input name="city" type="text" name="city" id="idCity" placeholder="请输入城市名字" maxlength="64">
				</div>
			</div>
			<div class="control-group">
				<div class="controls">
					<button type="submit" class="btn btn-primary" style="margin: 10px">
						确定
					</button>
					<button type="reset" class="btn btn-inverse" style="margin: 10px">
						重置
					</button>
				</div>
			</div>
		</form>
		<hr/>
		<?php
		header("Content-Type: text/html; charset=utf-8");
		function getWeather($city) {
			$wcity = file_get_contents("wcity.txt");
			$pattern = '/([0-9]+)=' . $city . '/';
			preg_match($pattern, $wcity, $matches, PREG_OFFSET_CAPTURE);
			if ($matches == null) {
				return null;
			}
			$cityID = $matches[1][0];
			$data = file_get_contents('http://www.weather.com.cn/data/sk/' . $cityID . '.html');
			return json_decode($data, true);
		}

		if ($_POST != null && $_POST["city"] != null) {
			$weather = getWeather($_POST["city"]);
			if ($weather == null) {?>
			<div class="alert alert-block" style="margin: 20px">
				<button type="button" class="close" data-dismiss="alert">
					&times;
				</button>
				<h4>警告!</h4>
				发生错误了亲，您输入的城市好像没有找到哦！
			</div>
			<?php return;
			}
			$info = $weather["weatherinfo"];
			?>
			<table class="table table-striped table-bordered" style="margin-left: 20px;width: 200px">
				<thead>
					<th>实时天气信息</th>
				</thead>
				<tbody>
			<?php
			echo "<tr><td>城市：</td><td>".$info["city"]."</td></tr>";
			echo "<tr><td>城市ID：</td><td>".$info["cityid"]."</td></tr>";
			echo "<tr><td>气温：</td><td>".$info["temp"]."℃</td></tr>";
			echo "<tr><td>风向：</td><td>".$info["WD"]."</td></tr>";
			echo "<tr><td>风力：</td><td>".$info["WS"]."</td></tr>";
			echo "<tr><td>湿度：</td><td>".$info["SD"]."</td></tr>";
			echo "<tr><td>更新时间：</td><td>".$info["time"]."</td></tr>";
			?>								
				</tbody>
			</table>
			<?php
		}
		?>
	</body>
</html>
