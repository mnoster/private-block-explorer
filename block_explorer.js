import axios from "axios"


const getEventHistory = async () => {
	let res = await axios.post("http://54.214.107.168:8000/getEventHistory")
	const $events = document.getElementById("events")
	$events.innerHTML = JSON.stringify(res)
	console.log(res)
}

getEventHistory()
