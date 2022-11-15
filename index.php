<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
	<script type="text/javascript" src="script.js"></script>
	<title>SmartAvia-test</title>
</head>
<body>
	<div class="container bg-light">
		<div class="row">
			<div class="col"></div>
			<div class="col-8 col-my-auto">
				<div class="col text-center p-4">
					<button type="button" id="sendButton" class="btn btn-primary">Получить адрес</button>
				</div>
			</div>
			<div class="col"></div>
		</div>

		<div class="row">
			<div class="col"></div>
			<div class="col-8 col-my-auto p-3" id="notification"></div>
			<div class="col"></div>
		</div>

		<div class="row">
			<div class="col"></div>
			<div class="col-8">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Адрес</th>
						</tr>
					</thead>
					<tbody id="info">
						
					</tbody>
				</table>
			</div>
			<div class="col"></div>
		</div>
	</div>
	

</body>
</html>