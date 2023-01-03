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
		<div id="header" class="row">
		</div>
		<div class="row flex-grow-1">
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
								<a class="nav-link text-white  my-3 mx-0" href="index.php"><i
										class="fa-solid fa-house line" aria-hidden="true"></i>
									<p class="desc line">Home</p>
								</a>
							</li>
							<li id="li-notify" class="nav-item text-center col col-sm-12">
								<a class="nav-link text-white my-3 mx-0" href="notifications.php"><i
										class="fa-solid fa-bell line" aria-hidden="true"></i>
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
			<div class="col-sm-10">
				<main>
					<!-- TEST -->
					<div class="row">
						<div class="col-sm-1"></div>
						<div class="col-12 col-sm-8">
							<div class="card ">
								<div class="card-body">
									<div class="row mt-2 mb-1">
										<div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1">
											<img src="../upload/rit.jpg" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
										</div>
										<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
											<a href="" class="profileSwitch">
												<div class="row">
													<div class="col-12 text-center fw-bold num">
														21
													</div>
												</div>
												<div class="row">
													<div class="col-12 text-center">
														Post
													</div>
												</div>
											</a>
										</div>
										<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
											<a href="" class="profileSwitch">
												<div class="row">
													<div class="col-12 text-center fw-bold">
														103
													</div>
												</div>
												<div class="row">
													<div class="col-12 text-center">
														Followers
													</div>
												</div>
											</a>
										</div>
										<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
											<a href="" class="profileSwitch">
												<div class="row">
													<div class="col-12 text-center fw-bold">
														51
													</div>
												</div>
												<div class="row">
													<div class="col-12 text-center">
														Followed
													</div>
												</div>
											</a>
										</div>
									</div>

									<div class="row">
										<div class="col-12">
											<p class="mt-2 mb-0 fs-4 fw-bold">username</p>
											<p class="m-0 fw-lighter">Nome Cognome</p>
											<div class="mt-3">
												Questa è la mia bio ciao mi piacciono i cani e il padel.
												Ho pochi follower ma faccio tanti post.
												Ciao voi come state io sto bene.
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<div class="col-sm-3"></div>
					</div>
					<!-- POST UTENTE -->
					<div class="row mt-3">
						<div class="col-sm-1"></div>
						<div class="col-12 col-sm-8 card">
							<div class="card-body">
								<a>
									<div class="row">
										<div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
											<img src="../upload/rit.jpg" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
										</div>
										<div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
											<div class="card-body">
												<p class="card-text">Ciao</p>
											</div>
										</div>
									</div>
								</a>
								<p class="card-text">This is a wider card with supporting text below as a natural
									lead-in to
									additional content. This content is a little bit longer.</p>
								<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
								<img class="card-img-bottom" src="../upload/9_1.png" alt="Card image cap">
							</div>
							
						</div>
						<div class="col-sm-3"></div>
					</div>

					<div class="row mt-3">
						<div class="col-sm-1"></div>
						<div class="col-12 col-sm-8 card">
							<div class="card-body">
								<a>
									<div class="row">
										<div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
											<img src="../upload/io.jpg" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
										</div>
										<div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
											<div class="card-body">
												<p class="card-text">Ciao</p>
											</div>
										</div>
									</div>
								</a>
								<p class="card-text">This is a wider card with supporting text below as a natural
									lead-in to
									additional content. This content is a little bit longer.</p>
								<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
							</div>
							<img class="card-img-bottom" src="../upload/9_2.png" alt="Card image cap">
						</div>
						<div class="col-sm-3"></div>
					</div>
					<!-- TEST -->
				</main>
			</div>
		</div>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="https://kit.fontawesome.com/7dda2fa6a2.js"></script>
	<script src="../js/bootstrap.js"></script>

</body>

</html>