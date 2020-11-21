const connection = new WebSocket('ws://if1015covidproject-consumers.herokuapp.com/requests');

connection.onopen = () => {
    console.log('connected to requests server');
};

connection.onclose = () => {
    console.log('connection closed');
};

connection.onmessage = e => {
    const data = JSON.parse(e.data);
    
    const countriesDataDiv = document.getElementById('countriesData');
        countriesDataDiv.innerHTML = `${data.countriesData} <br> ${countriesDataDiv.innerHTML}`;

    const brazilDataDiv = document.getElementById('brazilData');
    brazilDataDiv.innerHTML = `${data.brazilData}V <br> ${brazilDataDiv.innerHTML}`;
};