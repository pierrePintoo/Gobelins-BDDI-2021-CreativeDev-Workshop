const canvas_one = document.getElementById('chartOneContainer');
const ctx_one = canvas_one.getContext("2d");


let chart_one = new Chart(ctx_one, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Femelle', 'Mâle'],
        datasets: [{
            // label: 'My First dataset',
            backgroundColor: [
                'rgba(19, 58, 84, 1)',
                'rgba(67, 160, 184, 1)',
            ],
            borderColor: [
                'transparent', 
                'transparent'
            ],
            data: [44, 56],
        }]
    },

    options: {
        
        maintainAspectRatio : false,
        responsive: false,
        aspectRatio : 1,
        cutoutPercentage: 90,
        title: {
            display: true,
            text: 'Genre des spécimens (%)',
            fontFamily: "'Oyko', arial, sans-serif", 
            fontColor: '#FFF',
            fontSize: '18',
        },
        legend: {
            labels: {
                fontFamily: "'Oyko', arial, sans-serif", 
                fontColor: '#FFF',
            }
        }
        
    }
});

const canvas_two = document.getElementById('chartTwoContainer');
const ctx_two = canvas_two.getContext("2d");


let chart_two = new Chart(ctx_two, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Grande Ville', 'Campagne'],
        datasets: [{
            // label: 'My First dataset',
            backgroundColor: [
                'rgba(19, 58, 84, 1)',
                'rgba(67, 160, 184, 1)',
            ],
            borderColor: [
                'transparent', 
                'transparent'
            ],
            data: [55, 45],
        }]
    },

    options: {
        
        maintainAspectRatio : false,
        responsive: false,
        aspectRatio : 1,
        cutoutPercentage: 90,
        title: {
            display: true,
            text: 'Origine des spécimens (%)',
            fontFamily: "'Oyko', arial, sans-serif", 
            fontColor: '#FFF',
            fontSize: '18',
        },
        legend: {
            labels: {
                fontFamily: "'Oyko', arial, sans-serif", 
                fontColor: '#FFF',
            }
        }
        
    }
});


const canvas_three = document.getElementById('chartThreeContainer');
const ctx_three = canvas_three.getContext("2d");


let chart_three = new Chart(ctx_three, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ['Non', 'Oui'],
        datasets: [{
            // label: 'My First dataset',
            backgroundColor: [
                'rgba(19, 58, 84, 1)',
                'rgba(67, 160, 184, 1)',
            ],
            borderColor: [
                'transparent', 
                'transparent'
            ],
            data: [12, 88],
        }]
    },

    options: {
        
        maintainAspectRatio : false,
        responsive: false,
        aspectRatio : 1,
        title: {
            display: true,
            text: 'Gobelins épanoui.e.s (%)',
            fontFamily: "'Oyko', arial, sans-serif", 
            fontColor: '#FFF',
            fontSize: '18',
        },
        legend: {
            labels: {
                fontFamily: "'Oyko', arial, sans-serif", 
                fontColor: '#FFF',
            }
        }
        
    }
});

