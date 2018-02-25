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
	let res = await axios.post("http://localhost:8000/getEventHistory")
	const $events = document.getElementById("events")
	const $blocks = document.getElementsByClassName("blocks")
	$events.innerHTML = JSON.stringify(res)
	$blocks[0].innerHTML = res.data.length + " Blocks"
	console.log(res)
}

const formData = () => {
	let medicineForm = document.getElementById("medicine-form")
	let record = {
		address: address || "0xc086bb3c814462f005a58132a2f6856d5a815317",
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
	const $tx = document.getElementById("tx")
	$tx.innerHTML = JSON.stringify(res.data.medicine.logs[0])
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

getEventHistory()
loadHandlers()
