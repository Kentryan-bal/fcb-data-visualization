console.log("Hello world!");

// let us contain the span element into variable
const dateElement = document.getElementById('date');

console.log(dateElement);

// generate the current date:
let currentDate = new Date();

console.log(currentDate);

dateElement.innerHTML = currentDate.toLocaleDateString('en-US', {year: "numeric", month : "long", day: "numeric"});

// Twitter trends API:
const url = 'https://twitter-trends5.p.rapidapi.com/twitter/request.php';

const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '79e5c3e722msh633e635b7a9be5cp128750jsnc6eda5d339f7',
		'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: new URLSearchParams({woeid : "23424934"})
};


// fetch method is used to send a request to an API
fetch(url, options)
.then(res => res.json())
.then(result => {
	console.log(result.trends)

	let trendingTopics = [];
	// for loop that will get 10 trending topics from the trending topics API
	// this forloop will get the fist 10 trending topics
	for (let i = 0; i < 10; i++){
		trendingTopics.push(result.trends[i]);
	}

	// topics will be an array that contains the lists of all trending topics:
	// ["PacquiaoVSBarrios", "BiniConcert"]
	let topics = trendingTopics.map(topic => {

		return topic.name;
	})

	console.log(topics);

	let volumes = trendingTopics.map(topic => {

		return topic.volume;
	})

	console.log(volumes);

	const myChart = document.getElementById("myChart");

	console.log(myChart);

	 let barChart = new Chart(myChart, {
	        type: 'bar',
	        data: {
	          labels: topics,
	          datasets: [{
	            label: '# of tweets/xeets',
	            data: volumes,
	            borderWidth: 2,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(255, 159, 64, 0.2)',
	                'rgba(255, 205, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(201, 203, 207, 0.2)'
	            ],
	            borderColor: [
	                'rgb(255, 99, 132)',
	                'rgb(255, 159, 64)',
	                'rgb(255, 205, 86)',
	                'rgb(75, 192, 192)',
	                'rgb(54, 162, 235)',
	                'rgb(153, 102, 255)',
	                'rgb(201, 203, 207)'
	            ],
	            hoverBackgroundColor: [
	                'rgb(255, 99, 132)',
	                'rgb(255, 159, 64)',
	                'rgb(255, 205, 86)',
	                'rgb(75, 192, 192)',
	                'rgb(54, 162, 235)',
	                'rgb(153, 102, 255)',
	                'rgb(201, 203, 207)'
	            ]
	          }]
	        },
	        options: {
	          indexAxis: 'y',
	          scales: {
	            y: {
	              beginAtZero: true
	            }
	          }
	        }
	    });
})

// let myPost = {
// 	name : "PacquiaoVSBarrios",
// 	query: "Pacquiao+VS+Barrios",
// 	url: "search?q=%22Pacquiao+VS+Barrios%22",
// 	volume: 54000
// }

// console.log(myPost.name);
// console.log(myPost.query);
// console.log(myPost.url);
// console.log(myPost.volume);

// mock data
// let graphData = [
// 	{
// 		name : "PacquiaoVSBarrios",
// 		query: "Pacquiao+VS+Barrios",
// 		url: "search?q=%22Pacquiao+VS+Barrios%22",
// 		volume: 54000
// 	},
// 	{
// 		name : "BiniConcert",
// 		query: "Bini+Concert",
// 		url: "search?q=%Bini+Concert%22",
// 		volume: 100000
// 	},
// 	{
// 		name : "BlackpinkConcert",
// 		query: "Blackpink+Concert",
// 		url: "search?q=%Blackpink+Concert%22",
// 		volume: 200000
// 	}

// ]

// console.log(graphData[1].name);




