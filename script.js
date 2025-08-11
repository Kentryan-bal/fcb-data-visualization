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

// Mock/Sample data for when API fails
const sampleTrends = [
	{
		name: "PacquiaoVSBarrios",
		volume: 54000
	},
	{
		name: "BiniConcert",
		volume: 100000
	},
	{
		name: "BlackpinkConcert",
		volume: 200000
	},
	{
		name: "TechNews",
		volume: 85000
	},
	{
		name: "ClimateChange",
		volume: 67000
	},
	{
		name: "SportsUpdate",
		volume: 92000
	},
	{
		name: "MovieRelease",
		volume: 78000
	},
	{
		name: "GameLaunch",
		volume: 125000
	},
	{
		name: "MusicFestival",
		volume: 110000
	},
	{
		name: "BreakingNews",
		volume: 150000
	}
];

// Function to create the chart
function createChart(trendingTopics, dataSource = "API") {
	console.log(`Creating chart with ${trendingTopics.length} items from ${dataSource}`);
	
	// topics will be an array that contains the lists of all trending topics:
	// ["PacquiaoVSBarrios", "BiniConcert"]
	let topics = trendingTopics.map(topic => {
		return topic.name;
	})

	console.log("Topics:", topics);

	let volumes = trendingTopics.map(topic => {
		return topic.volume || 0; // Default to 0 if volume is missing
	})

	console.log("Volumes:", volumes);

	const myChart = document.getElementById("myChart");

	console.log("Canvas element:", myChart);

	if (!myChart) {
		console.error("Canvas element not found!");
		return;
	}

	try {
		let barChart = new Chart(myChart, {
			type: 'bar',
			data: {
				labels: topics,
				datasets: [{
					label: `# of tweets/posts (${dataSource})`,
					data: volumes,
					borderWidth: 2,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 205, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(201, 203, 207, 0.2)',
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 205, 86, 0.2)'
					],
					borderColor: [
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(255, 205, 86)',
						'rgb(75, 192, 192)',
						'rgb(54, 162, 235)',
						'rgb(153, 102, 255)',
						'rgb(201, 203, 207)',
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(255, 205, 86)'
					],
					hoverBackgroundColor: [
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(255, 205, 86)',
						'rgb(75, 192, 192)',
						'rgb(54, 162, 235)',
						'rgb(153, 102, 255)',
						'rgb(201, 203, 207)',
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(255, 205, 86)'
					]
				}]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						beginAtZero: true
					},
					y: {
						beginAtZero: true
					}
				}
			}
		});
		
		console.log(`Chart created successfully with ${dataSource} data!`);
		
	} catch (error) {
		console.error("Error creating chart:", error);
	}
}

// fetch method is used to send a request to an API
fetch(url, options)
.then(res => {
	console.log("API Response status:", res.status);
	
	// Check if the response is ok
	if (!res.ok) {
		if (res.status === 429) {
			throw new Error("Rate limit exceeded (429). API requests limit reached.");
		} else {
			throw new Error(`HTTP ${res.status}: ${res.statusText}`);
		}
	}
	
	return res.json();
})
.then(result => {
	console.log("API Result:", result);
	
	// Check if result and trends exist
	if (!result) {
		throw new Error("API returned null response");
	}
	
	if (!result.trends) {
		console.log("Available properties:", Object.keys(result));
		throw new Error("API response missing 'trends' property");
	}
	
	if (!Array.isArray(result.trends)) {
		throw new Error("Trends is not an array");
	}
	
	if (result.trends.length === 0) {
		throw new Error("API returned empty trends array");
	}
	
	console.log(`Successfully got ${result.trends.length} trends from API`);

	let trendingTopics = [];
	// for loop that will get 10 trending topics from the trending topics API
	// this forloop will get the first 10 trending topics
	for (let i = 0; i < Math.min(10, result.trends.length); i++){
		trendingTopics.push(result.trends[i]);
	}
	
	console.log("Trending topics from API:", trendingTopics);
	
	// Create chart with real API data
	createChart(trendingTopics, "Twitter API");
})
.catch(error => {
	console.error("API Error:", error);
	console.log("Using sample data instead...");
	
	// Display user-friendly error message
	if (error.message.includes("429")) {
		console.log("⚠️ You've reached your API rate limit. Using sample data.");
	} else if (error.message.includes("fetch")) {
		console.log("⚠️ Network error. Check your connection. Using sample data.");
	} else {
		console.log(`⚠️ API Error: ${error.message}. Using sample data.`);
	}
	
	// Use sample data when API fails
	createChart(sampleTrends, "Sample Data");
});

// Your original commented code is preserved below:

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