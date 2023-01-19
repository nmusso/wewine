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
					<!-- TEST -->
					<div class="row mt-3">
						<div class="col-sm-1"></div>
						<div class="col-12 col-sm-8 card">
							<div class="card-body">
								<a href="profile.php?profile=0`">
									<div class="row">
										<div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
											<img src="../upload/9_propic.jpg"
												class="img-fluid rounded-circle img-thumbnail p-1 propic" />
										</div>
										<div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
											<div class="card-body p-0">
												<p class="card-text">aleciro</p>
											</div>
										</div>
									</div>
								</a>
								<p class="card-text my-3">Questo è un post</p>
								<p class="card-text"><small class="text-muted">Posted 10 minutes ago</small></p>
								<img class="card-img-bottom" src="../upload/9_1.jpeg" alt="Card image cap">				
								<div class="row pt-3 pr-1 mb-1">
									<div class="col-10 col-sm-10"></div>
									<div class="col-1 col-sm-1">
										<i class="fa-solid fa-heart"></i>
									</div>
									<div class="col-1 col-sm-1">
										<i class="fa-regular fa-comment"></i>
									</div>
								</div>

								<div class="row mt-3 m-0">
									<div class="col-12 col-sm-12 p-0">
										<div class="card border-0 p-0">
											<div class="row m-0">
												<div class="col-11 col-sm-11 p-0">
													<div class="d-flex form-inputs">
														<input id="searchBar" class="form-control" type="text" placeholder="Search any profile...">
														<i class="bx bx-search"></i>
													</div>
												</div>
												<div class="col-1 col-sm-1 p-0">
													<button id="but" type="button" class="btn btn-dark">
														<i class="fas fa-search"></i>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="row  mt-1">
									<div class="col-12 col-sm-12 p-0">
										<div class="card mx-2 px-2">
											<div class="row">
												<div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
													<img src="../upload/9_propic.jpg" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
												</div>
												<div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
													<div class="row">
														<div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
															<p class="card-text">aleciro</p>
														</div>
													</div>
													<div class="row mb-2">
														<div class="col-12 col-sm-12">
															Ti ho commentato la foto e ha detto che è porprio tanto tanto tanto bella.
															Ciao da dallla cane ciro.
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="row  mt-1">
									<div class="col-12 col-sm-12 p-0">
										<div class="card mx-2 px-2">
											<div class="row">
												<div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
													<img src="../upload/9_propic.jpg" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
												</div>
												<div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
													<div class="row">
														<div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
															<p class="card-text">aleciro</p>
														</div>
													</div>
													<div class="row mb-2">
														<div class="col-12 col-sm-12">
															Ti ho commentato la foto e ha detto che è porprio tanto tanto tanto bella.
															Ciao da dallla cane ciro.
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
						<div class="col-sm-3"></div>
					</div>

					<div class="row mt-3">
						<div class="col-sm-1"></div>
						<div class="col-12 col-sm-8 card">
							<div class="card-body">
								<a href="profile.php?profile=0`">
									<div class="row">
										<div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
											<img src="../upload/9_propic.jpg"
												class="img-fluid rounded-circle img-thumbnail p-1 propic" />
										</div>
										<div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
											<div class="card-body p-0">
												<p class="card-text">aleciro</p>
											</div>
										</div>
									</div>
								</a>
								<p class="card-text my-3">Questo è un post</p>
								<p class="card-text"><small class="text-muted">Posted 10 minutes ago</small></p>
								<img class="card-img-bottom" src="../upload/9_2.png" alt="Card image cap">
								<div class="row pt-3 pr-1">
									<div class="col-10 col-sm-10"></div>
									<div class="col-1 col-sm-1">
										<i class="fa-regular fa-heart"></i>
									</div>
									<div class="col-1 col-sm-1">
										<i class="fa-regular fa-comment"></i>
									</div>
								</div>
							</div>
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