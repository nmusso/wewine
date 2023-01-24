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
	
	<script src="https://unpkg.com/html5-qrcode@2.0.9/dist/html5-qrcode.min.js"></script>

	<title>iSocial</title>
</head>

<body class="bg-light">
	<div id="container" class="container-fluid p-0 overflow-hidden min-vh-100 d-flex flex-column">
		<div id="header" class="row">
		</div>
		<div class="row">
			<div id="nav" class="col-sm-2 px-0 wine">
				<div id="fluidRow" class="row m-auto">
					<div id="title" class="col-12">
						<header class="wine text-white py-1">
							<h1 class="font-weight-light text-center">WeWine</h1>
						</header>
					</div>
					<div class="col-12">
						<nav>
							<ul class="nav nav-pills wine">
								<li id="li-search" class="nav-item text-center col col-sm-12">
									<a class="nav-link text-white my-3 mx-0" href="search.php" aria-label="Search">
										<i class="fa-solid fa-magnifying-glass line" alt="Search" title="Search" aria-hidden="true"></i>
										<p class="desc line">Search</p>
									</a>
								</li>
								<li id="li-add" class="nav-item text-center col col-sm-12">
									<a class="nav-link text-white my-3 mx-0" href="post-editor.php" aria-label="Add post">
										<i class="fa-solid fa-circle-plus line" alt="Add post" title="Add post" aria-hidden="true"></i>
										<p class="desc line">Add</p>
									</a>
								</li>
								<li id="li-home" class="nav-item text-center col col-sm-12">
									<a class="nav-link text-white  my-3 mx-0" href="index.php" aria-label="Home">
										<i class="fa-solid fa-house line" alt="Home" title="Home" aria-hidden="true"></i>
										<p class="desc line">Home</p>
									</a>
								</li>
								<li id="li-notify" class="nav-item text-center col col-sm-12">
									<a class="nav-link text-white my-3 mx-0" href="notifications.php" aria-label="Notifications">
										<i id="bell" class="fa-solid fa-bell line" alt="Notifications" title="Notifications" aria-hidden="true"></i>
										<p class="desc line">Notifications</p>
									</a>
								</li>
								<li id="li-profile" class="nav-item text-center col col-sm-12">
									<a id="a-profile" class="nav-link text-white my-3 mx-0" href="profile.php?profile=0" aria-label="My profile">
										<i class="fa-solid fa-circle-user line" alt="My profile" title="My profile" aria-hidden="true"></i>
										<p class="desc line">Profile</p>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
			<div class="col-sm-2"></div>
			<div id="mainSection" class="col-12 col-sm-10">
				<main>

					
				</main>
			</div>
			<div id="bottomPlaceholder" class="my-3"></div>

			<div class="toast wine text-white fixed-top top-0 end-0 justify-content-center" id="myToast">
				<div class="toast-header wine text-white">
					<strong class="me-auto text-white"><a href="#" id="toast-link" class="</a>"><i class="bi-gift-fill text-white"></i>Notification</a></strong>
					<small id ="toast-diffTime">time ago</small>
					<button type="button" class="btn-close  btn-close-white"  data-bs-dismiss="toast"></button>
				</div>		
				<a href="#" id="toast-link-text">
					<div class="toast-body text-white" id="toast-text">
						Text
					</div>
				</a>
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