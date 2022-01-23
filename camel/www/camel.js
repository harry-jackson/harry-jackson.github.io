    

width = 592;
height = 234;

if (window.screen.width < window.screen.height) {
	svgContainerClass = 'svg-container-desktop';
} else {
	svgContainerClass = 'svg-container';
}

var svg = d3.select('body')
	.append("div")
	
	.classed(svgContainerClass, true)
	.append('svg')
	.attr("id", "boardsvg")
	.attr("preserveAspectRatio", "xMidYMin meet")
	.attr("viewBox", "0 0 592 234")

var rectWidth = 32;
var pad_x = 32;
var pad_y = 32;
var camelHeight = 32;


var camelSVG = "m18.30451,0.068373l0,0.6736l0,2.983312l0,2.069065l-2.090435,0l-3.672484,0l0,-2.886994l-8.325015,0l0,2.886994l-3.400295,0l0,2.284723c-0.276631,0 -0.553265,0 -0.829894,0l0,3.336917l0.512999,0l0,-1.565095l0.316895,0l0,4.043879l0,8.813263l-0.510445,0l0,1.082594l0.510445,0l1.587822,0l0.510446,0l0,-1.082594l-0.510446,0l0,-8.813263l1.395483,0l0,8.813263l-0.510443,0l0,1.082594l0.510443,0l1.58783,0l0.510464,0l0,-1.082594l-0.510464,0l0,-8.813263l6.255521,0l0,8.813263l-0.510413,0l0,1.082594l0.510413,0l1.587816,0l0.510475,0l0,-1.082594l-0.510475,0l0,-8.813263l1.39551,0l0,8.813263l-0.510475,0l0,1.082594l0.510475,0l1.587813,0l0.510473,0l0,-1.082594l-0.510473,0l0,-10.56197l0,-0.529287l5.463633,0l0,-5.822429l0,-2.613471l3.210777,0l0,-2.438906l-4.466763,0l0,-0.6736l-0.962334,0l0,0.6736l-0.192484,0l0,-0.6736l-0.962395,0z";
var camelBig = "m71.522087,12.906593l0,2.474377l0,10.958807l0,7.600515l-7.67897,0l-13.49044,0l0,-10.605042l-30.580889,0l0,10.605042l-12.490562,0l0,8.39254c-1.016163,0 -2.032334,0 -3.048505,0l0,12.257751l1.884442,0l0,-5.749176l1.164063,0l0,14.854671l0,32.374439l-1.875053,0l0,3.976906l1.875053,0l5.832677,0l1.875054,0l0,-3.976906l-1.875054,0l0,-32.374439l5.126145,0l0,32.374439l-1.875061,0l0,3.976906l1.875061,0l5.832668,0l1.875046,0l0,-3.976906l-1.875046,0l0,-32.374439l22.978912,0l0,32.374439l-1.875046,0l0,3.976906l1.875046,0l5.832684,0l1.875046,0l0,-3.976906l-1.875046,0l0,-32.374439l5.126137,0l0,32.374439l-1.875061,0l0,3.976906l1.875061,0l5.832668,0l1.875061,0l0,-3.976906l-1.875061,0l0,-38.798042l0,-1.944214l20.069893,0l0,-21.38797l0,-9.600292l11.794479,0l0,-8.95903l-16.408012,0l0,-2.474377l-3.535164,0l0,2.474377l-0.707039,0l0,-2.474377l-3.535187,0z";
var camelMed = "m23.426344,1.083303l0,0.856355l0,3.79268l0,2.630404l-2.657627,0l-4.668806,0l0,-3.67026l-10.583594,0l0,3.67026l-4.322831,0l0,2.904572c-0.35168,0 -0.703365,0 -1.055044,0l0,4.24218l0.652178,0l0,-1.989678l0.402866,0l0,5.141002l0,11.20429l-0.648928,0l0,1.376379l0.648928,0l2.018624,0l0.648881,0l0,-1.376379l-0.648881,0l0,-11.20429l1.774044,0l0,11.20429l-0.64888,0l0,1.376379l0.64888,0l2.018633,0l0.648943,0l0,-1.376379l-0.648943,0l0,-11.20429l7.952674,0l0,11.20429l-0.648947,0l0,1.376379l0.648947,0l2.018575,0l0.648943,0l0,-1.376379l-0.648943,0l0,-11.20429l1.774109,0l0,11.20429l-0.648941,0l0,1.376379l0.648941,0l2.018572,0l0.648941,0l0,-1.376379l-0.648941,0l0,-13.427397l0,-0.672858l6.945908,0l0,-7.40211l0,-3.322517l4.08189,0l0,-3.100567l-5.678558,0l0,-0.856355l-1.223482,0l0,0.856355l-0.24465,0l0,-0.856355l-1.22348,0z";

var sf = rectWidth / 452
colors = d3.schemeCategory10;

var camels = [];

var dice = [];


for (var i = 0; i < 5; i++) {
   camels.push({id: i, y: pad_y + camelHeight * i, 
   	x: pad_x});

   dice.push({id: i, x: 300 + rectWidth * i, rolled: false})
}

path = [];
squares = [];
for (var i = 0; i < 16; i++){
	path.push({x: pad_x + rectWidth * i, y: pad_y + rectWidth * 5});
	for (var j = 0; j <6; j++){
		squares.push({x: pad_x + rectWidth * i, y: pad_y + rectWidth * j})
	}
}



var drag = d3.drag().on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended)
					

var camel = svg.append('g').selectAll('camel')
				.data(camels)
				.enter()
				.append('path')
				.attr('d', camelMed)
				
				.attr('transform', function(d) {return "translate(" + d.x + "," + d.y + ")";})

				.attr('class', 'camel')
				.call(drag)
				.attr('x', function(d) {return d.x})
				.attr('y', function(d) {return d.y})
				.attr('width', rectWidth)
				.attr('height', rectWidth)
				.style('fill', function(d) {return colors[d.id]})
				.style('stroke-width', 5)


var tiledrag = d3.drag().on('start', dragstarted)
						.on('drag', tiledragged)
						.on('end', tiledragended)

var rectangle = svg.append('g').selectAll('rect')
					.data(path)
					.enter()
					.append('rect')
					.attr('x', function(d) {return d.x })
					.attr('y', function(d) {return d.y})
					.attr('width', rectWidth)
					.attr('height', rectWidth)

rollDie = function(d, i){
if (dice[i].rolled){
	dice[i].rolled = false;
	d3.select(this).style('opacity', 1)
} else {
	dice[i].rolled = true;
	d3.select(this).style('opacity', 0.25)
}
}

var theDice = svg.append('g').selectAll('rect')
					.data(dice)
					.enter()
					.append('rect')
					.attr('x', function(d) {return d.x })
					.attr('y', 0)
					.attr('width', rectWidth)
					.attr('height', rectWidth)
					.style('fill', function(d, i) {return colors[i]})
					.on('click', rollDie)



tiles = [{id: 0,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 1,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 2,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 3,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 4,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 5,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 6,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'}, 
		 {id: 7,tile: -1, trap: 1, home_x:rectWidth*17, home_y:rectWidth*2, color:'steelblue'},
		 {id: 8,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 9,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 10,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 11,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 12,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 13,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 14,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'},
		 {id: 15,tile: -1, trap: -1, home_x:rectWidth * 17, home_y:rectWidth * 3, color:'brown'}]

var tile = svg.append('g').selectAll('.tile')
			.data(tiles)
			.enter()
			.append('rect')
			.attr('class', 'tile')
			.call(tiledrag)
			.attr('x', function(d) {return d.home_x })
			.attr('y', function(d) {return d.home_y})
			.style('fill', function(d) {return d.color})
			.attr('width', rectWidth)
			.attr('height', rectWidth)

function dragstarted(d) {
  
}

function collide(d, p) {

	var otherCamels = camels.filter(function(e) {return e.id != d.id && e.id != p})
	for (var i = 0; i < otherCamels.length; i++){
		
  		if (otherCamels[i].x == d.x && otherCamels[i].y == d.y){

  			var otherId = otherCamels[i].id;
  			camels[otherId].y = camels[otherId].y - rectWidth;
  			camels = collide(otherCamels[i], p);
  		}

  	}
  	return camels;
}

function uncollide(d) {
	var otherCamels = camels.filter(function(e) {return e.id != d.id})
	var loopAgain = true;
	var moveDown = false;
	while(loopAgain){

		loopAgain = false;
		for (var i = 0; i < otherCamels.length; i++){
			moveDown = true;
			for (var j = 0; j < camels.length; j++){
	  		if ( otherCamels[i].y > rectWidth * 4 || (otherCamels[i].x == camels[j].x && otherCamels[i].y == camels[j].y - rectWidth)){
	  			moveDown = false;
	  			break;
	  			
	  		}
	  		
	  		}
	  		if (moveDown){
	  			loopAgain = true;
	  			
	  			var otherId = otherCamels[i].id;
				camels[otherId].y = camels[otherId].y + rectWidth;
	  			break
	  		}
	  	}
  }

  	return camels;
  	
}



function dragged(d) {
  var otherCamels = camels.filter(function(e) {return e.id != d.id})

  var m = d3.mouse(document.getElementById('boardsvg'));
  var x = m[0];
  var y = m[1];
  if (y >= 0 && x >= 0){
  	var squarex = Math.min(rectWidth * Math.floor(x / rectWidth), rectWidth * 16)
  	var squarey = Math.min(rectWidth * Math.floor(y / rectWidth), rectWidth*5)

  	//d3.select(this).attr('transform', function(d) {return "translate(" + d.x + "," + d.y+ ")"});
	d.x = squarex;
  	d.y = squarey;
  	camels = collide(d, d.id)
  	camels = uncollide(d);
  	

  	camel.transition().duration(0).attr('transform', function(d) {return "translate(" + d.x + "," + d.y + ")"})
  	
  }
  
}



function dragended(d) {

  
  uncollide([]);

  camel.transition().duration(500).ease(d3.easeBounce).attr('transform', function(d) {return "translate(" + d.x + "," + d.y + ")"})
  
  
}

function tiledragged(d, i){

	var m = d3.mouse(document.getElementById('boardsvg'));
	var x = m[0]
	var y = m[1]
	if (y > rectWidth * 5){
		x = Math.min(rectWidth * Math.floor(x / rectWidth), rectWidth * 16)
  		y = rectWidth * 6;
  		tiles[i].tile = (x) / rectWidth;
	}
	d3.select(this).attr('x', x).attr('y', y);
}

function tiledragended(d, i){
	var m = d3.mouse(document.getElementById('boardsvg'));
	var x = m[0]
	var y = m[1]
	tile_clash = tiles.filter((tile) => tile.tile >= tiles[i].tile - 1 && tile.tile <= tiles[i].tile + 1).length > 1
	camel_clash = camels.filter((camel) => camel.x === tiles[i].tile * rectWidth).length > 0
	if (camel_clash || tile_clash || y <= rectWidth * 5){
		tiles[i].tile = -1;
		d3.select(this).attr('x', function(d) {return d.home_x})
			.attr('y', function(d) {return d.home_y});
	}
}

var positions = [0, 0, 0, 0, 0]
var stack = [-1, 0, 1, 2, 3]
function getPos(){
for (var i = 0; i < camels.length; i++){
	positions[i] = camels[i].x/rectWidth;
	var minusOne = true;
	for (var j = 0; j < camels.length; j++){
		if (camels[j].x === camels[i].x && 
			camels[j].y === camels[i].y - rectWidth){
			stack[i] = j;
			minusOne = false;
		}
	}
	if (minusOne){
		stack[i] = -1;
	}
}
}


allPositions = [];

function setTraps() {
	traps=[];
	for (var ti = 0; ti < 2000; ti++){
		traps.push(0);
	}

	for (var i = 0; i < tiles.length; i++){
		if (tiles[i].tile > -1){
			traps[tiles[i].tile] = tiles[i].trap;
		}
	}
}
function getResults(){
	getPos();
	var thesedice = dice.filter(function(d) {return !d.rolled}).map(function(d) {return d.id});
	setTraps();
	calc(thesedice, positions, stack, traps, false);
	
	getEV(allPositions);

}
var nBreak = 0;
function calc(dice, positions, stack, traps, alreadyWon){

	if (dice.length === 0){
		
		allPositions.push([positions, stack]);
	}
	

	

	for (var di = 0; di < dice.length; di++){
		for (var roll = 1; roll < 4; roll++){
			die = dice[di];

			var newPositions = JSON.parse(JSON.stringify(positions))
			var newStack = JSON.parse(JSON.stringify(stack))
			var newDice = JSON.parse(JSON.stringify(dice))
			
			// unstack moved camel
			var toUnstack = newStack.indexOf(die);
			if (toUnstack > -1){
				newStack[toUnstack] = -1;
			}

			// add roll to i'th position
			var newPosition = newPositions[die] + roll;
			var underneath = false;
			if (traps[newPosition] === 1){
				newPosition = newPosition + 1;
			} else if (traps[newPosition] === -1){
				newPosition = newPosition - 1;
				underneath = true;
			}

			// terrible hack
			var stackMove = die;

			while (newStack[stackMove] > -2){
				if (newStack[stackMove] === -1){
					newStack[stackMove] = -2;
					break;
				}
				stackMove = newStack[stackMove]
			}

			// stack moved camel
			if (underneath){
			for (var i = 0; i < newPositions.length; i++){
				// find upmost camel at newPosition
				if (i !== die && newPositions[i] === newPosition && newStack.indexOf(i) === -1){

					newStack[die] = i;

				}
			}
			} else {
			for (var i = 0; i < newPositions.length; i++){
				// find upmost camel at newPosition
				if (i !== die && newPositions[i] === newPosition && newStack[i] === -1){

					newStack[i] = die;

				}
			}
			}
			// move camel
			newPositions[die] = newPosition;
			
			// move camels stacked on moved camel
			var stackMove = newStack[die];

			while (stackMove > -1){
				newPositions[stackMove] = newPosition;
				
				stackMove = newStack[stackMove];

			}
			// fix terrible hack
			for (var ci = 0; ci < 5; ci++){
				if (newStack[ci] === -2){
					newStack[ci] = -1;
				}
			}

			// filter dice to remove die

			newDice.splice(newDice.indexOf(die), 1)
			// if the race is over, return

			if (newPosition > 16 && !alreadyWon){
				var maxVal = Math.max.apply(null, newPositions)
				var secondVal = secondMax(newPositions)

				for (var camel = 0; camel < 5; camel++){
					if (newPositions[camel] === maxVal && 
						newStack[camel] === -1){
						var winner = camel + 0;

						newPositions[camel] = 1000;
					}
				}
				for (var camel = 0; camel < 5; camel++){
					if (camel != winner && newPositions[camel] === secondVal && 
						(newStack[camel] === -1 ||
							newStack[camel] === winner)) {
						newPositions[camel] =  500;
						newStack[camel] = -1;
						var secondWinner = camel;
					} 
				}
				for (var camel = 0; camel < 5; camel++){
					if (newStack[camel] === secondWinner) {
						newStack[camel] = -1;
					} 
				}

				calc(newDice, newPositions, newStack, traps, true);
			} else {
				calc(newDice, newPositions, newStack, traps, alreadyWon);
			}
			// recursively calc on new positions & dice
			
		}
	}
}

var secondMax = function (arr){ 
    var max = Math.max.apply(null, arr), // get the max of the array
        maxi = arr.indexOf(max);
    arr[maxi] = -Infinity; // replace max in the array with -infinity
    var secondMax = Math.max.apply(null, arr); // get the new max 
    arr[maxi] = max;
    return secondMax;
};

allResults = [[0, 0, 0], [0, 0, 0], [0, 0, 0],[0, 0, 0], [0, 0, 0]];

function getEV(allPositions){
	for (var i = 0; i < allPositions.length; i++){
		var res = [-1, -1, -1, -1, -1];
		var maxVal = Math.max.apply(null, allPositions[i][0])
		var secondVal = secondMax(allPositions[i][0])
		for (var camel = 0; camel < 5; camel++){
			if (allPositions[i][0][camel] === maxVal && 
				allPositions[i][1][camel] === -1){
				var winner = camel + 0;
				allResults[camel][2] = allResults[camel][2] + 1;
			}
		}
		for (var camel = 0; camel < 5; camel++){
			if (camel != winner && allPositions[i][0][camel] === secondVal && 
				(allPositions[i][1][camel] === -1 ||
					allPositions[i][1][camel] === winner)) {
				allResults[camel][1] = allResults[camel][1] + 1;
			} else if (camel != winner) {
				allResults[camel][0] = allResults[camel][0] + 1;
			} 
		}
		
	}
}


d3.select('body').append("p")

d3.select('body')
	.append("button")
    .text("simulate")
    .attr('x', 0)
    .attr('y', 0)
	.on("click", simulate);

d3.select('body').append("p")

betValues = [5, 3, 2]

table_data = [['<img src="www/camel0.png" height = 32 width = 32>', "", "", "", "", "", "", ""], 
			['<img src="www/camel1.png" height = 32 width = 32>', "", "", "", "", "", "", ""], 
			['<img src="www/camel2.png" height = 32 width = 32>', "", "", "", "", "", "", ""], 
			['<img src="www/camel3.png" height = 32 width = 32>', "", "", "", "", "", "", ""], 
			['<img src="www/camel4.png" height = 32 width = 32>', "", "", "", "", "", "", ""]]

// the columns you'd like to display
var columns = ["", "EV(5)", "EV(3)", "EV(2)", "_____", "P(1st)", "P(2nd)", "P(3rd-5th)"];

var table = d3.select("body").append("table"),
	thead = table.append("thead"),
	tbody = table.append("tbody");
	
// append the header row
thead.append("tr")
	.selectAll("th")
	.data(columns)
	.enter()
	.append("th")
		.text(function(column) { return column; });

// create a row for each object in the data
rows = tbody.selectAll("tr")
	.data(table_data)
	.enter()
	.append("tr");

// create a cell in each row for each column
cells = rows.selectAll("td")
	.data(function(row) {
		return columns.map(function(column) {
			return {column: column, value: row[columns.indexOf(column)]};
		});
	})
	.enter()
	.append("td")
		.html(function(d) { return d.value; });

function round_to_digits(n, digits) {
	return Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits)
}

function updateTableData() {
	for (var r = 0; r < table_data.length; r++) {
		for (var i = 0; i < betValues.length; i++) {
			var betValue = betValues[i]
			table_data[r][i + 1] = round_to_digits(-1 * allResults[r][0] + 1 * allResults[r][1] + betValue * allResults[r][2], 1)
		}
		for (var i = 0; i < 3; i++) {
			table_data[r][i + 5] = round_to_digits(allResults[r][2 - i], 2)
		}
	}
	rows.data(table_data)
	cells.data(function(row) {
		return columns.map(function(column) {
			return {column: column, value: row[columns.indexOf(column)]};
		})
	}).html(function(d) { return d.value; });
}

function simulate(){
	
	allPositions = [];
	allResults = [[0, 0, 0], [0, 0, 0], [0, 0, 0],[0, 0, 0], [0, 0, 0]];
	getResults();
	allResults = allResults.map(function(d) {return d.map(function(e) { return e / allPositions.length})})
	updateTableData()
	updateHist()
}

	

var hist_width = width
var hist_height = 100

d3.select('body').append("p")

var svg_hist = d3.select('body')
.append("div")
.classed(svgContainerClass, true)
.append('svg')
.attr("preserveAspectRatio", "xMidYMin meet")
.attr("viewBox", "0 0 " + hist_width + " " + hist_height)


var barStart = 43;
var barEnd = 0;
var padx = 0;
var padxright = 48;
var padxleft = 10;
var histwidth = 100;

getBarX = function(i) {return d3.scaleBand().rangeRound([padx + padxleft + i * histwidth, padx + padxleft + i * histwidth + (histwidth - padxright)]).padding(0).domain([0, 1, 2])}
var bary = d3.scaleLinear().rangeRound([barStart, barEnd]).domain([0, 1]);

var histData = allResults;//[0, 1, 2, 3, 4].map(function(d) {return [Math.random(), Math.random(), Math.random()]})

hists = [];

svg_hist.append('g').selectAll('camel')
				.data([0, 1, 2, 3, 4])
				.enter()
				.append('path')
				.attr('d', camelBig)
				
				.attr('transform', function(d, i) {return "translate(" + (100 * d + padx) + "," + barEnd + ")";})

				.attr('class', 'bigcamel')
				.style('fill', function(d) {return colors[d]});

svg_hist.append('g').selectAll('.bar')
				.data([0, 1, 2, 3, 4])
				.enter()
				.append('rect')
				.attr("x", function(d, i) { return 100 * d + padx; })
      			.attr("y", function(d, i) { return barEnd; })
      			.attr('width', 72)
      			.attr('height', 45)
      			.style('stroke-width', 0)
				.attr('class', 'blanksquare')
				.style('fill', 'white');

for (var i = 0; i < 5; i++){
  var barx = getBarX(i)
  hists.push(svg_hist.append('g').selectAll(".bar")
    .data(histData[i])
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return barx(i); })
      .attr("y", function(d, i) { return bary(d); })
      .attr("width", barx.bandwidth())
      .style('fill', function(d) {return colors[i]})
      .attr("height", function(d) { return barStart - bary(d); }));
}

updateHist = function() {
	for (var i = 0; i < 5; i++){
		histData[i] = allResults[i];
		hists[i].data(histData[i]).transition().duration(500).attr("y", function(d, i) { return bary(d); })
			.attr("height", function(d) { return barStart - bary(d); });
	}
}