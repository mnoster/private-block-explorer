import axios from "axios"

let events
let decodedEvents
let $events
let $submit
const loadHandlers = () => {
	$events = document.getElementById("events")
	$submit = document.getElementById("submit-btn")
	$submit.addEventListener("click", function(e){
		$events.innerHTML = lookup()
	})
}

const getEventHistory = async () => {
	let res = await axios.post("http://54.214.107.168:8000/getEventHistory")
	// $events.innerHTML = JSON.stringify(res)
	events = res.data.events
	decodedEvents = res.data.decodedEvents
	console.log(res)
}

const lookup = () => {
	let tx = document.getElementById("tx").value
	for(let i = 0; i < events.length; i++){
		if(events[i].transactionHash === tx){
			return [JSON.stringify(events[i]) , decodedEvents[i]]
		}
	}
	console.log("tx: " + tx + ' not found')
	return 
}


loadHandlers()
getEventHistory()
