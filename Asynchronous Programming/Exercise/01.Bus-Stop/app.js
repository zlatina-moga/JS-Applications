function getInfo() {
    const stopInput = document.getElementById('stopId');
    const stop = stopInput.value;
    stopInput.value = '';
    
    const busesUL = document.getElementById('buses');
    busesUL.innerHTML = ''

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stop}`;
    

    fetch(url)
        .then (response => {
            if (!response.ok){
                throw response
            }
            return response.json()
        })
        .then(data => {
            document.getElementById('stopName').textContent = data.name;
            Object.entries(data.buses).map(([bus, time]) => {
                const li = document.createElement('li')
                li.textContent = `Bus ${bus} arrives in ${time} minutes`;
                busesUL.appendChild(li)
            })
        })
        .catch(error => {
            document.getElementById('stopName').textContent = 'Error';
        })

}