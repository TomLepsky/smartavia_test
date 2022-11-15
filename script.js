document.addEventListener("DOMContentLoaded", function() {
	window.counterName = 'counter';
	window.maxCounter = 3;
	window.sendBtn = 'sendButton';
	window.requestQty = 0;

	localStorage.removeItem(counterName);
	document.getElementById(sendBtn).addEventListener("click", handler);
});

function handler() {
	if (isMaxRequests()) {
		return;
	}
	incr();
	if (isMaxRequests()) {
		lockBtn();
	}
	let rowId = ++requestQty;
	renderRow(rowId, 'waiting...', true);
	fetch('btcaddr.php', {method: 'GET'})
		.then(response => {
			decr();
			unlockBtn();
			if (response.ok) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(new Error('Error occured: ' + response.statusText));
			}
		})
		.then(response => {
				return response.json();
		})
		.then(data => {
			if (!isFakeJson(data)) {
				updateRow(rowId, data.addr);
			} else {
				throw new Error(data.error);
			}
		})
		.catch(error => {
			deleteRow(rowId);
			renderNotification("Task successfully crashed!");
			console.log(error);
		});
}

function isFakeJson(json) {
	return 'error' in json ? true : false;
}

function incr() {
	let counter = localStorage.getItem(counterName);
	if (counter === null) {
		localStorage.setItem(counterName, 1);
	} else {
		counter = parseInt(counter);
		if (counter < maxCounter) {
			localStorage.setItem(counterName, ++counter);
		}
	}
}

function decr() {
	let counter = localStorage.getItem(counterName);
	if (counter !== null) {
		counter = parseInt(counter);
		if (counter > 0) {
			localStorage.setItem(counterName, --counter);
		}
	}
}

function lockBtn() {
	document.getElementById(sendBtn).disabled = true; 
}

function unlockBtn() {
	document.getElementById(sendBtn).disabled = false; 
}

function isMaxRequests() {
	return parseInt(localStorage.getItem(counterName)) >= maxCounter ? true : false;
}

function getRow(rowNum, addr, waiting) {
	let tr = document.createElement('tr');
	tr.setAttribute("id", getRowId(rowNum));
	let th = document.createElement('th');
	th.setAttribute("scope", "row");
	if (waiting) {
		th.appendChild(getSpinner());
	} else {
		th.innerHTML = 'OK';
	}

	let tdAddr = document.createElement('td');
	tdAddr.innerHTML = addr;

	tr.appendChild(th);
	tr.appendChild(tdAddr);

	return tr;
}

function renderRow(rowNum, addr, waiting = false) {
	let tbody = document.getElementById("info");
	tbody.appendChild(getRow(rowNum, addr, waiting));
}

function updateRow(rowId, addr) {
	let oldRow = document.getElementById(getRowId(rowId));
	let newRow = getRow(rowId, addr);
	oldRow.replaceWith(newRow);
}

function deleteRow(rowId) {
	let row = document.getElementById(getRowId(rowId));
	row.remove();
}

function renderNotification(msg) {
	let notification = document.createElement('div');
	notification.className = "alert alert-warning alert-dismissible fade show";
	notification.setAttribute("role", "alert");
	notification.innerHTML = msg;

	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("data-bs-dismiss", "alert");
	btn.setAttribute("aria-label", "Close");
	btn.className = "btn-close";

	notification.appendChild(btn);
	document.getElementById("notification").appendChild(notification);
}

function getSpinner() {
	let spinner = document.createElement('div');
	spinner.className = "spinner-border";
	spinner.setAttribute("role", "status");

	return spinner;
}

function getRowId(id) {
	return "rowId_" + id;
}
