import axios from "axios"

let events
let decodedEvents
let $events
let $submit
let overview = {
	$to : '',
	$from : '',
	$inputData: '',
	$eventType: '',
	$timestamp: '',
	$block: ''
}


const loadHandlers = () => {
	$events = document.getElementById("events")
	$submit = document.getElementById("submit-btn")
	overview.$to = document.getElementById("to")
	overview.$from = document.getElementById("from")
	overview.$inputData = document.getElementById("input-data")
	overview.$eventType = document.getElementById("event-type")
	overview.$timestamp = document.getElementById("timestamp")
	overview.$block = document.getElementById("block")
	$submit.addEventListener("click", function(e){
		$events.innerHTML = lookup()
	})
}

const getEventHistory = async () => {
	let res = await axios.post("http://54.214.107.168:8000/getEventHistory")
	events = res.data.events
	decodedEvents = res.data.decodedEvents
	console.log(res)
}

const lookup = async () => {

	let tx = document.getElementById("tx").value
	try{
		let res =  await axios.post("http://54.214.107.168:8000/getTransaction", {tx: tx})
		console.log("res: ", res)
		populateFields(res.data)
	}catch(error){
		alert("Error looking up transaction")
	}
	return 
}

const populateFields = (data) => {
	overview.$to.innerHTML = data.to
	overview.$from.innerHTML = data.from
	overview.$inputData.innerHTML = matchEventData(data.transactionHash)
	overview.$eventType.innerHTML = matchEventData(data.transactionHash)[0]
	overview.$timestamp.innerHTML = data.timestamp
	overview.$block.innerHTML = data.blockNumber
	$events.innerHTML = JSON.stringify(data.logs[0])
}

const matchEventData = (tx) => {
	for(let i = 0; i < events.length; i++){
		if(events[i].transactionHash === tx){
			let result = decodedEvents[i]
			return result
		}
	}
	console.log("tx: " + tx + ' not found')
}

getEventHistory()
loadHandlers()
