const busStop = document.getElementById("busStopId");
const arrival = document.getElementById("arrivalInfo");

async function fetchBusArrival(busStopId) {
  const response = await fetch(`https://sg-bus-arrivals.sigma-schoolsc1.repl.co/?id=${busStopId}`);
  if(response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    throw new Error("Error fetching bus arrival data.");
  } 
}

function formatArrivalData(arrivalData) {
  const buses = arrivalData.services;
  const formattedData = [];
  for(const bus of buses) {
    const arrivalTimeString = `${bus.next_bus_mins} min(s)`;
    formattedData.push (`
    <div>
    <strong>Bus ${bus.bus_no}</strong>: ${arrivalTimeString}
    </div>
    `)
  }
  return formattedData.join("");
}

function displayBusArrival(busStopId) {
  arrival.innerHTML = "Loading...";
  fetchBusArrival(busStopId)
  .then((arrivalData) => {
    const formattedArrivalData = formatArrivalData(arrivalData);
    arrival.innerHTML = formattedArrivalData;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function getBusTiming() {
  const busStopId = busStop.value;
  displayBusArrival(busStopId);
}