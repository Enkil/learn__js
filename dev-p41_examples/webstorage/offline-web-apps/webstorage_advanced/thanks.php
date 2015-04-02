<?php
$message = htmlentities( trim($_POST['message']) );
?>

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width">
<style type="text/css">
@font-face{
	src: url('nobile.ttf');
	font-family: 'nobile';
}

body{
	background-image: url('pattern_044.gif');
}
h1, h2, p{
	font-family: 'nobile' serif !important;
	color: #333;
}
#draft{
	font-family: 'nobile' serif;
	font-size: 1.1em;
	color: #222;
}

#warning{
	font-family: 'nobile';
	background-color: #cb0000;
	color: #ffffff;
}
</style>

</head>
<body>
<h1>Thanks</h1>
<p>Your message '<?php echo($message); ?>' has been submitted.</p>
</body>
</html>