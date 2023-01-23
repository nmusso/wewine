<!doctype html>
<html lang="it">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Bootstrap CSS -->
    <link rel="icon" type="image/x-icon" href="upload/icon.ico">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="css/style.css">

	<title>WeWine</title>
</head>

<body class="bg-light">
	<div id="container" class="container-fluid p-0 overflow-hidden min-vh-100 d-flex flex-column">
		<div id="header" class="row mb-5">
            <div id="title" class="col-12">
                <header class="wine text-white py-1">
                    <h1 class="font-weight-light text-center">WeWine</h1>
                </header>
            </div>
		</div>     
        <main>
        </main>
	</div>
	<?php
    if(isset($templateParams["js"])):
        foreach($templateParams["js"] as $script):
    ?>
        <script src="<?php echo $script; ?>"></script>
    <?php
        endforeach;
    endif;
    ?>
</body>

</html>