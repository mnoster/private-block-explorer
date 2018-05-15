import axios from "axios"

let address
let company

const registerCompany = async () => {
	address = document.querySelector("input[name='address']").value
	company = document.querySelector("input[name='company']").value
	console.log(address, company)
	try{
		let res  = await( await fetch(`${"http://localhost:8000/register?address="+ address +"&company="+ company}`)).json()
		console.log(res)
		showResponse(res)		
	}catch(err){
		console.log(err)
	}
}

const getEventHistory = async () => {
	const $events = $("#events")

	$events.html('Fetching...')

	let res = await axios.post("http://localhost:8000/getEventHistory")

	const $blocks = document.getElementsByClassName("blocks")
	
	$events.text(JSON.stringify(res, null, 2))
	$events.highlight(/^0x[a-zA-Z0-9]{40}/, "bool")
	$events.highlight('"', "quotes")
	$events.highlight("}", "curly")
	$events.highlight("{", "curly")
	$events.highlight(/true|false/, "bool")
	$events.highlight(/:|,/, "colon")

	$blocks[0].innerHTML = res.data.length + " Transactions"
	console.log(res)
}

const formData = () => {
	let medicineForm = document.getElementById("medicine-form")
	let record = {
		address: address || "0x82b4ac04e5c998f7a87887db4fc8881ddbf02435",
		company: company || 'healthinc',
		medType: medicineForm[0].value,
		location: medicineForm[1].value,
		timestamp: medicineForm[2].value,
		optional:medicineForm[3].value
	}
	console.log("medicine record: ", record)
	return record
}

const addMedicineRecord = async () => {
	let record = formData()
	try{
		let res = await axios.post("http://localhost:8000/addMedicineRecord",record)
		showLog(res)
	}catch(err){
		console.log(err)
		transactionError()
	}
}

const removeMedicineRecord = async () => {
	let record = formData()
	try{
		let res = await axios.post("http://localhost:8000/removeMedicineRecord",record)
		showLog(res)
	}catch(err){
		console.log(err)
	}
}

const checkMedicineRecord = async () => {
	let record = formData()
	let res = await axios.post("http://localhost:8000/getMedicineRecord",record)
	console.log("res: ",res)
}

const showResponse = (res) => {
	const $msg = document.getElementById("message")
	$msg.innerHTML = res.message
}

const showLog = (res) => {
	const $tx = $("#tx")
	console.log("respo: ", res)
	$tx.text(JSON.stringify(res.data.medicine.logs[0], null, 2))

	$tx.highlight(/^0x[a-zA-Z0-9]{40}/, "bool")
	$tx.highlight('"', "quotes")
	$tx.highlight("}", "curly")
	$tx.highlight("{", "curly")
	$tx.highlight(/true|false/, "bool")
	$tx.highlight(/:|,/, "colon")
	getEventHistory()
	// $tx.highlight(/[0-9]|%/, "numbers")
}


const loadHandlers = () => {
	let $registerButton = document.getElementById("register-button")
	let $addMedicineButton = document.getElementById("add-button")
	let $removeMedicineButton = document.getElementById("remove-button")
	let $checkMedicineButton = document.getElementById("check-button")
	let $refreshButton = document.getElementById("refresh-button")

	$registerButton.addEventListener('click',function(){
		registerCompany()
	})
	$addMedicineButton.addEventListener('click',function(){
		addMedicineRecord()
	})
	$removeMedicineButton.addEventListener('click',function(){
		removeMedicineRecord()
	})
	$checkMedicineButton.addEventListener('click',function(){
		checkMedicineRecord()
	})
	$refreshButton.addEventListener('click',function(){
		getEventHistory()
	})
}

const transactionError = () => {
	alert("There was an error with your transaction.")
}

// Syntax highlighting function
jQuery.fn.highlight = function (str, className) {
	var regex
	regex = new RegExp(str, "gi");
	return this.each(function () {
	  this.innerHTML = this.innerHTML.replace(regex, function (matched) { return "<span class=\"" + className + "\">" + matched + "</span>"; });
	});
  };


getEventHistory()
loadHandlers()
