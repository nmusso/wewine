<!doctype html>
<html lang="it">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="css/style.css">

	<title>iSocial</title>
</head>

<body class="bg-light">
	<div id="container" class="container-fluid p-0 overflow-hidden min-vh-100 d-flex flex-column">
		<div id="header" class="row">
		</div>
		<div class="row">
			<div id="nav" class="col-sm-2 px-0 bg-dark">
				<div id="fluidRow" class="row m-auto">
					<div id="title" class="col-12">
						<header class="bg-dark text-white py-1">
							<h1 class="font-weight-light text-center">iSocial</h1>
						</header>
					</div>
					<div class="col-12">
						<ul class="nav nav-pills bg-dark">
							<li id="li-search" class="nav-item text-center col col-sm-12">
								<a class="nav-link text-white my-3 mx-0" href="search.php"><i
										class="fa-solid fa-magnifying-glass line" aria-hidden="true"></i>
									<p class="desc line">Search</p>
								</a>
							</li>
							<li id="li-add" class="nav-item text-center col col-sm-12">
								<a class="nav-link text-white my-3 mx-0" href="post-editor.php"><i
										class="fa-solid fa-circle-plus line" aria-hidden="true"></i>
									<p class="desc line">Add</p>
								</a>
							</li>
							<li id="li-home" class="nav-item text-center col col-sm-12">
								<a class="nav-link text-white  my-3 mx-0" href="index.php"><i class="fa-solid fa-house line"
										aria-hidden="true"></i>
									<p class="desc line">Home</p>
								</a>
							</li>
							<li id="li-notify" class="nav-item text-center col col-sm-12">
								<a class="nav-link text-white my-3 mx-0" href="notifications.php"><i class="fa-solid fa-bell line"
										aria-hidden="true"></i>
									<p class="desc line">Notifications</p>
								</a>
							</li>
							<li id="li-profile" class="nav-item text-center col col-sm-12">
								<a class="nav-link text-white my-3 mx-0" href="profile.php"><i
										class="fa-solid fa-circle-user line" aria-hidden="true"></i>
									<p class="desc line">Profile</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-sm-2"></div>
			<div id="mainSection" class="col-12 col-sm-10">
				<main>
				</main>
			</div>
		</div>
	</div>
	<?php
    if (isset($templateParams["js"])):
	    foreach ($templateParams["js"] as $script):
    ?>
	<script src="<?php echo $script; ?>"></script>
	<?php
	    endforeach;
    endif;
    ?>
</body>

</html>