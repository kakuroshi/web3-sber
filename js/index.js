import abi from "./abi.js";

const contractAddress = "0xCB6CE19DDF0836C554411d5af71d14Afd2013deD";
let myContract, web3, accounts, currentAccount;

async function getTransactions() {
	let divTr = document.querySelector(".divTr");
	if (divTr) {
		divTr.remove();
	}

	let divTrSend = document.querySelector(".divTrSend");
	if (divTrSend) {
		divTrSend.remove();
	}

	getTransfersToAccpt(await getTransfers());
	getTrSender(await getTransfers());
	document.querySelector(".balance").textContent =
		"Баланс кошелька: " +
		(await web3.eth.getBalance(document.getElementById("toggle").value)) /
		10 ** 18 +
		" Eth";
}

document.querySelector(".typeInp").addEventListener("click", () => {
	let inpHide = document.querySelector(".codeWord");
	let hide = document.querySelector(".typeInp");

	if (inpHide.type === "password") {
		inpHide.type = "text";
		hide.textContent = "⦿";
	} else {
		inpHide.type = "password";
		hide.textContent = "◠";
	}
});

document
	.querySelector(".css-modal-details")
	.addEventListener("click", async () => {
		let modalContent = document.querySelector(".cmt");

		let arr = await getTransfers();

		if (document.querySelector(".divHistory")) {
			for (let j = 0; arr[0].length > j; j++) {
				document.querySelector(".divHistory").remove();
			}
		}

		for (let i = 0; i < arr[0].length; i++) {
			if (
				(currentAccount == arr[0][i].sender ||
					currentAccount == arr[0][i].recipient) &&
				arr[0][i].end_transfer
			) {
				let sender = document.createElement("p");
				let recipient = document.createElement("p");
				let sum = document.createElement("p");
				let status = document.createElement("p");
				let divHistory = document.createElement("div");
				divHistory.classList.add("divHistory");

				if (arr[0][i][3]) {
					status.textContent = "Статус перевода: Принят";
					status.style.color = "green";
				} else {
					status.textContent = "Статус перевода: Отклонён";
					status.style.color = "red";
				}

				sender.textContent = "Отправтель: " + arr[0][i][0];

				recipient.textContent = "Получатель: " + arr[0][i][1];

				sum.textContent = "Сумма: " + arr[0][i][2] / 10 ** 18 + " Eth";

				divHistory.append(sender, recipient, sum, status);

				modalContent.append(divHistory);
			}
		}
	});

async function getAccounts() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	accounts = await web3.eth.getAccounts();

	currentAccount = accounts[0];
	getTransfersToAccpt(await getTransfers());

	// Список
	let selectElement = document.getElementById("toggle");
	let selEl = document.getElementById("transferSel");

	let accnts = accounts;

	for (let i = 0; i < accnts.length; i++) {
		let address = document.createElement("option");

		address.text = accnts[i];
		selEl.add(address);
	}

	for (let i = 0; i < accnts.length; i++) {
		let address = document.createElement("option");

		address.text = accnts[i];
		selectElement.add(address);
	}
	document.querySelector(".balance").textContent =
		"Баланс кошелька: " +
		(await web3.eth.getBalance(selectElement.value)) / 10 ** 18 +
		" Eth";

	selectElement.addEventListener("change", async () => {
		currentAccount = selectElement.value;

		let usr = await getUserInfo(currentAccount, currentAccount);

		if (usr.role != 1) {
			document.querySelector(".upToAdmin").style.display = "none";
			document.querySelector(".setUpToAdmin").style.display = "none";
			document.querySelector('.add-category').style.display = "none";
		} else if (usr.role == 1) {
			document.querySelector(".upToAdmin").style.display = "block";
			document.querySelector(".setUpToAdmin").style.display = "block";
			document.querySelector('.add-category').style.display = "block";
		}

		getTransactions();
	});

	document.querySelector(".transferBtn").addEventListener("click", async () => {
		let accTo = document.getElementById("transferSel");
		let selectedAcc = accTo.options[accTo.selectedIndex];
		let valueToTransfer = document.querySelector(".valueTransfer");
		let codeWrd = document.querySelector(".codeWord");
		let category =
			document.getElementById("category-selec").options[
			document.getElementById("category-selec").selectedIndex
			];

		if (
			valueToTransfer.value < 0 ||
			valueToTransfer.value >
			(await web3.eth.getBalance(selectElement.value)) / 10 ** 18
		) {
			alert("Неккоректное число");
		} else if (codeWrd.value.trim() === "") {
			alert("Ввеите кодовое слово");
		} else if (selectedAcc.value == currentAccount) {
			alert("Вы не можете переводить деньги самому себе");
		} else if (
			valueToTransfer.value.slice(-1) == "." ||
			valueToTransfer.value.includes("..")
		) {
			alert("Неправильная расстановка точек в сумме для перевода.");
		} else {
			transferMoney(
				currentAccount,
				selectedAcc.value,
				valueToTransfer.value,
				codeWrd.value,
				category.classList.value.slice(5)
			);
			getTransactions();
			valueToTransfer.value = "";
			codeWrd.value = "";
		}
	});

	selectUsers(currentAccount);
	selectApplications(currentAccount);
	getCategories(currentAccount);
}

function getTrSender(arr) {
	const divTr = document.createElement("div");
	divTr.classList.add("divTrSend");

	for (let i = 0; i < arr[0].length; i++) {
		if (currentAccount == arr[0][i].sender && !arr[0][i].end_transfer) {
			let transactions = document.createElement("div");
			transactions.classList.add("acptDiv");

			let recipient = document.createElement("h3");
			recipient.textContent = arr[0][i].recipient;
			recipient.id = i;

			let sum = document.createElement("p");
			sum.textContent = arr[0][i].amount / 10 ** 18 + " Eth";

			let trCancel = document.createElement("button");
			trCancel.classList.add("trCancel");
			trCancel.textContent = "Отменить перевод";
			trCancel.addEventListener("click", async (e) => {
				if (confirm("Вы действительно хотите отменить перевод?")) {
					cancelTransfer(
						currentAccount,
						e.target.parentNode.firstElementChild.id
					);
					alert("Транзакция отменена");

					getTransactions();
				}
			});

			transactions.append(recipient, sum, trCancel);
			divTr.append(transactions);
		}
	}

	document.querySelector(".sentTransfers").append(divTr);
}

async function cancelTransfer(currentAcc, idTr) {
	const cancellTransaction = await myContract.methods
		.refuse_transfer_sender(idTr)
		.send({
			from: currentAcc,
			to: currentAcc,
			gas: 1000000,
		});
}

function getTransfersToAccpt(arr) {
	// Переводы для принятия
	const divTr = document.createElement("div");
	divTr.classList.add("divTr");

	for (let i = 0; i < arr[0].length; i++) {
		if (currentAccount == arr[0][i].recipient && !arr[0][i].end_transfer) {
			let acptDiv = document.createElement("div");
			acptDiv.classList.add("acptDiv");

			let sender = document.createElement("h3");
			sender.textContent = arr[0][i].sender;
			sender.id = i;

			let sum = document.createElement("p");
			sum.textContent = arr[0][i].amount / 10 ** 18 + " Eth";

			let acptBtnTrnsfr = document.createElement("button");
			acptBtnTrnsfr.classList.add("acptBtnTrnsfr");
			acptBtnTrnsfr.textContent = "Принять";
			acptBtnTrnsfr.addEventListener("click", (e) => {
				if (document.querySelector(".acptInpCdWrd").firstElementChild != null) {
					document.querySelector(".acptInpCdWrd").firstElementChild.remove();
					document.querySelector(".acptInpCdWrd").firstElementChild.remove();
				}

				let cdWrdInp = document.createElement("input");
				cdWrdInp.classList.add("acptCodeWordInp");
				cdWrdInp.placeholder = "Введите кодовое слово";

				let acptBtnTrnsfr = document.createElement("button");
				acptBtnTrnsfr.classList.add("acptBtnTr");
				acptBtnTrnsfr.textContent = "Принять";

				document.querySelector(".acptInpCdWrd").append(cdWrdInp, acptBtnTrnsfr);

				acptBtnTrnsfr.addEventListener("click", () => {
					acceptTransfer(
						currentAccount,
						e.target.parentNode.firstElementChild.id,
						cdWrdInp.value
					);
					getTransactions();
				});
			});

			acptDiv.append(sender, sum, acptBtnTrnsfr);
			divTr.append(acptDiv);
		}
	}

	document.querySelector(".accept").append(divTr);
}

async function transferMoney(urAccount, account, money, codeWord, category) {
	let finalCodeWord = web3.utils.sha3(codeWord);

	const transfer = await myContract.methods
		.send_money(account, finalCodeWord, category)
		.send({
			from: urAccount,
			to: contractAddress,
			value: web3.utils.toWei(money, "ether"),
			gas: 1000000,
		});
}

async function getTransfers() {
	const allTransfers = [];

	allTransfers[allTransfers.length] = await myContract.methods
		.get_transfers()
		.call({
			from: web3.eth.accounts[0],
			gas: 10000000,
		});

	return allTransfers;
}

async function acceptTransfer(urAccount, idTransfer, codeWr) {
	let codeWord = "";

	await getTransfers()
		.then((transfers) => {
			codeWord = transfers[0][idTransfer].code_word;
		})
		.then();

	console.log(codeWord);

	let convertedCodeWord = web3.utils.sha3(codeWr);

	console.log(convertedCodeWord);

	if (convertedCodeWord == codeWord) {
		const get = await myContract.methods
			.accept_the_transfer(convertedCodeWord, idTransfer)
			.send({
				from: web3.utils.toChecksumAddress(urAccount),
				to: urAccount,
				gas: 6000000,
			})
			.then(async (receipt) => {
				alert("Транзакция прошла успешно!");
				location.reload();
			});
		return true;
	} else {
		alert("Неверное кодовое слово! Транзакция не прошла!");
		return false;
	}
}

async function upToAdmin(urAccount, account) {
	const result = await myContract.methods.addAdmin(account).send({
		from: urAccount,
		to: contractAddress,
		gas: 1000000,
	});

	console.log(result);
}

async function getUsers(urAccount) {
	let users = await myContract.methods.viewUsers().call({
		from: urAccount,
		gas: 10000000,
	});

	return users;
}

async function getUserInfo(urAccount, account) {
	let user = await myContract.methods.viewUserInf(account).call({
		from: urAccount,
		gas: 1000000,
	});

	return user;
}

async function selectUsers(urAcc) {
	const users = await getUsers(urAcc);

	let selectElement = document.getElementById("usrsUpAppl");

	for (let i = 0; i < users.length; i++) {
		if ((await getUserInfo(urAcc, users[i])).role == 0) {
			let address = document.createElement("option");

			address.text = users[i];
			selectElement.add(address);
		}
	}
}

document.querySelector(".setUpAdm").addEventListener("click", async () => {
	console.log(document.getElementById("usrsUpAppl").value);
	await upToAdmin(currentAccount, document.getElementById("usrsUpAppl").value);
	window.location.reload();
});

async function golosToAdm(urAccount, id) {
	const result = await myContract.methods.golosToUp(id).send({
		from: urAccount,
		to: contractAddress,
		gas: 1000000,
	});

	console.log(result);
}

async function viewApplications(urAccount) {
	let applications = await myContract.methods.viewApplications().call({
		from: urAccount,
		gas: 10000000,
	});

	return applications;
}
async function selectApplications(urAcc) {
	const applications = await viewApplications(urAcc);

	let selectElement = document.getElementById("usrsUp");

	for (let i = 0; i < applications.length; i++) {
		if (!applications[i].status) {
			let address = document.createElement("option");

			address.text = applications[i].applicant;
			selectElement.add(address);

			address.classList.add(`selec${i}`);
		}
	}
}

document.querySelector(".voteForUser").addEventListener("click", async () => {
	const selectedOption =
		document.getElementById("usrsUp").options[
		document.getElementById("usrsUp").selectedIndex
		];

	await golosToAdm(currentAccount, selectedOption.classList.value.slice(5));

	window.location.reload();
});

async function getCategories(urAccount) {
	const categories = await myContract.methods.viewCategories().call({
		from: urAccount,
		gas: 10000000,
	});

	let selectElement = document.getElementById("category-selec");

	for (let i = 0; i < categories.length; i++) {
		let categ = document.createElement("option");

		categ.text = categories[i].name;
		selectElement.add(categ);

		categ.classList.add(`categ${i}`);
	}
}

async function addCategory(urAcc, nameCategory) {
	const result = await myContract.methods.addCategory(nameCategory).send({
		from: urAcc,
		to: contractAddress,
		gas: 1000000,
	});

	return result;
}

document.querySelector('.add-category-button').addEventListener('click', () => {
	let nameCateg = document.querySelector('.input-category-name').value

	addCategory(currentAccount, nameCateg)

	setTimeout(() => window.location.reload(), 500)
})

getAccounts();

myContract = new web3.eth.Contract(abi, contractAddress);
