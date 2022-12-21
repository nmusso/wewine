<!doctype html>
<html lang="it">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="../css/style.css">

	<title>iSocial</title>
</head>

<body class="bg-light">
	<div id="container" class="container-fluid p-0 overflow-hidden min-vh-100 d-flex flex-column">
		<div id="header" class="row mb-5">
            <div id="title" class="col-12">
                <header class="bg-dark text-white py-1">
                    <h1 class="font-weight-light text-center">iSocial</h1>
                </header>
            </div>
		</div>     
        <main>
            <div class="row my-5">
                <div class="col-2 col-sm-4"></div>
                <div class="col-8 col-sm-4">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                        <div class="d-flex flex-row-reverse mb-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="d-flex flex-row-reverse mb-3">
                            <a id="register" href="#">Register now</a>
                        </div>       
                    </form>
                </div>
                <div class="col-2 col-sm-4"></div>
            </div>
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