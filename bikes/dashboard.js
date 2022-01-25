

percent = function(n) {return Math.round(100 * n) + "%";}

var select = d3.select("#select_div")
      .append("select")

mymap = L.map('mapid').setView([51.509865, -0.118092], 13).setMaxBounds([[51.510701,-0.121723],[51.531091,-0.075901]]).setZoom(14).setMinZoom(14);

//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 18,
//    id: 'streets-v11',
//    accessToken: 'pk.eyJ1IjoiaGF6bWFuNzQiLCJhIjoiY2pyeXUxMG9kMHluZjN5bWQwY3ZhYWV2NiJ9.inD2_S3GVdhSNEqW4PDuAA'
//}).addTo(mymap);

const bounds = [
	[-122.66336, 37.492987], // Southwest coordinates
	[-122.250481, 37.871651] // Northeast coordinates
];

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
	maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
	accessToken: 'pk.eyJ1IjoiaGF6bWFuNzQiLCJhIjoiY2pyeXUxMG9kMHluZjN5bWQwY3ZhYWV2NiJ9.inD2_S3GVdhSNEqW4PDuAA'
}).addTo(mymap);

width_overall = mymap.getSize().x;
height_overall = 210;

var svg = d3.select('body').append('svg')
	.attr('width', width_overall)
	.attr('height', 115);

bar_data = [{Type:"Actual",Bikes:2},{Type:"Prediction",Bikes:2}]

var margin = {
	top: 55,
	right: 20,
	bottom: 30,
	left: 20
},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

make_text = function(station_name) {
	var text = "<p style='text-align:center'><B>" + station_name + "</b></p>" 
	return text;
}

text_box = svg.append("foreignObject")
    .attr("width", width)
		.attr("height", margin.top)
		.attr("transform", "translate(" + margin.left + ",5)")
	.append("xhtml:body")
		.style("font", "12px 'Arial'")
		//.html(make_text("Hello, world!", 5, 10, 8, 0.1, 0));

title_1 = svg.append("foreignObject")
	.attr("width", width)
	.attr("height", margin.top)
	.attr("transform", "translate(" + 0 + ",23)")
	.append("xhtml:body")
	.style("font", "12px 'Arial'")
	.html("<B><font color='salmon'>Current Bikes</B></font color> and <B><font color='steelblue'>Predicted Bikes in 30 minutes</B></font color>")

marker_data = [{Type:"Empty", x:0},{Type:"Full", x:1}]

var x = d3.scaleLinear()
	.rangeRound([0, width]);

var y = d3.scaleLinear()
	.rangeRound([height, 0]);

x.domain([0, 1]);
y.domain([0, 1]);



g.append("g")
.attr("class", "x_axis")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))

g.selectAll(".marker")
	.data(marker_data)	
	.enter()
	.append("line")
	.attr("class", "marker")
	.attr("x1", d => x(d.x))
	.attr("x2", d => x(d.x))
	.attr("y1", y(1))
	.attr("y2", y(0));

g.selectAll(".markertext")
	.data(marker_data)	
	.enter()
	.append("text")
	.attr("class", "markertext")
	.attr("x", d => x(d.x))
	.attr("y", y(1))
	.attr("dy", "-0.3em")
	.attr("text-anchor", "middle")
	.style("font", "12px 'Arial'")
	.text(d => d.Type);

band_data = {l:2,u:2};

		g.append("rect")
		.datum(band_data)
		.attr("class", "area")
		.attr("x", x(0))
		.attr("y", 0)
		.attr("width", x(1))
		.attr("height", y(0));

		var arrow = g.append("line")
								.attr("class", "arrow")
		                         .attr("x1", 0)
		                         .attr("y1", y(0.5))
	                          .attr("x2", 0)
	                          .attr("y2", y(0.5));

radius_function = function(d) {return d.Type == "Prediction" ? 5 : 10}

g.selectAll(".dot")
.data(bar_data)
.enter().append("circle")
.attr("class", "dot")
.attr("r", radius_function)
.style("fill", d => {return d.Type == "Prediction" ? "steelblue" : "salmon"})
.attr("cx", function (d) {
	return x(d.Bikes);
})
.attr("cy", y(0.5));

var svg_h = d3.select('body').append('svg')
	.attr('width', width_overall)
	.attr('height', 125);


	bar_data = [{Bikes:0,Probability:0},{Bikes:1,Probability:0}]

	var margin_h = {
		top: 25,
		right: 20,
		bottom: 18,
		left: 20
	},
	width_h = +svg_h.attr("width") - margin_h.left - margin_h.right,
	height_h = +svg_h.attr("height") - margin_h.top - margin_h.bottom,
	g_h = svg_h.append("g").attr("transform", "translate(" + margin_h.left + "," + margin_h.top + ")");
	
	title_2 = svg_h.append("foreignObject")
	.attr("width", width_h)
	.attr("height", margin_h.top)
	.attr("transform", "translate(" + 0 + ",5)")
	.append("xhtml:body")
	.style("font", "12px 'Arial'")
	.html("Previous 24 hours: <B><font color='salmon'>Actual</B></font color> and <B><font color='steelblue'>Predicted</B></font color> Bikes")


  var n_steps = 47

	data_h = d3.range(n_steps - 1).map(function(d) {return {h: d, m:0, l:0, u:0, b:0}});
	data_h_extended = data_h.concat([{h:n_steps, m:0, l:0, u:0, b:0}]);

	var x_h = d3.scaleLinear()
		.range([0, width_h]);
	
	var y_h = d3.scaleLinear()
		.rangeRound([height_h, 0]);
	
	x_h.domain([0,n_steps]);
	y_h.domain([0, 1]);
	
	
	g_h.append("g")
	.attr("class", "x_axis")
	.attr("transform", "translate(0," + height_h + ")")
	.call(d3.axisBottom(x_h))
	
	g_h.append("g")
	.attr("class", "y_axis")
	.call(d3.axisLeft(y_h));
	
var line = d3.line()
.x(function(d) {return x_h(d.h);})
.y(function(d) {return y_h(d.b);})
.curve(d3.curveStepBefore);

var line2 = d3.line()
.x(function(d) {return x_h(d.h);})
.y(function(d) {return y_h(d.m);})
.curve(d3.curveStepBefore);

var area = d3.area()
    .x(function(d) { return x_h(d.h); })
    .y0(function(d) { return y_h(d.l); })
		.y1(function(d) { return y_h(d.u); })
		.curve(d3.curveStepBefore);

		g_h.append("path")
		.datum(data_h_extended)
		.attr("class", "area")
		.attr("d", area);

g_h.append("path")
	.datum(data_h_extended)
	.attr("class", "line2")
	.attr("d", line2);

	g_h.append("path")
	.datum(data_h)
	.attr("class", "line")
	.attr("d", line);

	
//console.log("hi")



switch_bikepoint = function(id, openPopup) {
	
	window.history.pushState({}, "", "?id=" + id);
	select.property('value', id);
	if (openPopup) {
		var current_popup = popups.find(d => {return d.id == id}).popup;
		mymap.setView([current_popup._latlng.lat, current_popup._latlng.lng], 15);
		popups.find(d => {return d.id == id}).popup.openPopup();
	} 
	filepath = "data/" + id + "/data.json";

	var data = leaflet_data.find((d) => d.StationId === Number(id))

	//d3.json(filepath).then(function(data) {
		
		bardata = data;
		station_name = leaflet_data.find((d) => d.StationId === Number(id)).StationName;

		predicted_bikes = data.Mean;
		predict_l = data.LB
		predict_u = data.UB
		text_box.html(make_text(station_name, data.Bikes, data.EmptyDocks, predicted_bikes, data.Prob_0, data.Prob_1));

		bar_data = [{Type:"Actual",Bikes:data.Bikes},{Type:"Prediction",Bikes:predicted_bikes}];

		x.domain([0, data.Bikes + data.EmptyDocks]);

		g.selectAll(".x_axis")
			.call(d3.axisBottom(x))

		band_data = {l:predict_l,w:predict_u - predict_l};

		g.selectAll(".area")
		.datum(band_data)
		.attr("x", d => x(d.l))
		.attr("y", 0)
		.attr("width", d => x(d.w))
		.attr("height", y(0));
		
		arrow_data = {l:Math.min(data.Bikes, predicted_bikes),u:Math.max(data.Bikes, predicted_bikes)}

		g.selectAll(".arrow")
		.datum(arrow_data)
		.attr("x1", d => x(d.l))
	  .attr("x2", d => x(d.u));

		var bars = g.selectAll(".dot")
			.data(bar_data);

		bars
			.style("fill", d => {return d.Type == "Prediction" ? "steeblue" : "salmon"})
			.attr("cx", function (d) {
				return x(d.Bikes);
			})
			.attr("r", radius_function);

			data_h = data.History;
			data_h_extended = data_h.concat([{h:n_steps, m:predicted_bikes, l:predict_l, u:predict_u, b:0}]);

			y_h.domain([0, data.Bikes + data.EmptyDocks]);
			g_h.selectAll(".y_axis")
			.call(d3.axisLeft(y_h));

			g_h.selectAll(".line") 
				.datum(data_h)
				.attr("d", line);
			
			g_h.selectAll(".line2") 
				.datum(data_h_extended)
				.attr("d", line2);

			g_h.selectAll(".area")
				.datum(data_h_extended)
				.attr("d", area);

			//console.log("f")

	//});
	
};

make_popup_text = function(d, f_date_now, f_date_future) {
	var total_docks = Number(d.Bikes) + Number(d.EmptyDocks);
	var occupancy = d.Bikes + "/" + total_docks;

	
	var text = "<b>" + d.StationName + 
		"</b><br>At " + f_date_now + ":" +
		"<br>" + occupancy + " Docks Occupied"

  if (d.Bikes == 0) {
		var text = text + " <B>Empty</B>"
	}
	if (d.EmptyDocks == 0) {
		var text = text + " <B>Full</B>"
	}

	if (d.Prob_1 > 0.01) {
		var text = text + "<br><br><font color='red'><B>" + percent(d.Prob_1) + " chance there will be no empty docks<br>at " + f_date_future +"."
	} 
	if (d.Prob_0 > 0.01) {
		var text = text + "<br><br><font color='red'><B>" + percent(d.Prob_0) + " chance there will be no bikes<br>at " + f_date_future +"."
	}
	return text;
}

//d3.tsv("data/LeafletData.txt").then(function(data) {
d3.json('https://bikedata-hj-default-rtdb.europe-west1.firebasedatabase.app/bikedata.json').then(function(data) {
	//console.log(data);
	leaflet_data = data;
	var svg = 'icons/4_default.svg' // insert your own svg
	var iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);

	icons = new Object();

	icons.default =  d3.range(0, 13).map(function(d) {return L.icon( {iconUrl: "icons/" + d + "_default.svg", iconAnchor:   [13, 13], popupAnchor: [0, -13]} )});
	icons.nearlyempty =  d3.range(0, 13).map(function(d) {return L.icon( {iconUrl: "icons/" + d + "_nearlyempty.svg", iconAnchor:   [13, 13], popupAnchor: [0, -13]} )});
	icons.nearlyfull =  d3.range(0, 13).map(function(d) {return L.icon( {iconUrl: "icons/" + d + "_nearlyfull.svg", iconAnchor:   [13, 13], popupAnchor: [0, -13]} )});


	popups = data.map(function(d) {
		//console.log(d.StationId)
		date_now = new Date(d.Collected);
		date_future = new Date(date_now.getTime() + 30*60000);

		f_date_now = d3.timeFormat("%H:%M")(new Date(date_now));
		f_date_future = d3.timeFormat("%H:%M")(new Date(date_future));

		var total_docks = Number(d.Bikes) + Number(d.EmptyDocks);
		
		if (total_docks == 0) {
			d.Bikes = 0;
			total_docks = 0;
			icon_index = 0;
		} else {
			icon_index = Math.round(12 * d.Bikes/total_docks) ;
		}

		

		if (icon_index == 0 && d.Bikes != 0) {
			icon_index = 1;
		}
		if (icon_index == 12 && d.EmptyDocks != 0) {
			icon_index = 11;
		}

		future_status = "default";
		if (d.Prob_0 > 0.25) {
			future_status = "nearlyempty";
		}
		if (d.Prob_1 > 0.25) {
			future_status = "nearlyfull";
		}

		var marker = L.marker([d.lat, d.lon], {icon: icons[future_status][icon_index]}).addTo(mymap);
		
		var popup = marker.bindPopup(make_popup_text(d, f_date_now, f_date_future))
		.on("popupopen", function(e) {switch_bikepoint(d.StationId, false)});
		return {id: d.StationId, popup: popup};
	})

    select
      .on("change", function(d) {
		var value = d3.select(this).property("value");
		switch_bikepoint(value, true);
        //console.log(value);
      });

    select.selectAll("option")
      .data(data)
      .enter()
        .append("option")
        .attr("value", function (d) { return d.StationId; })
        .text(function (d) { return d.StationName; });
	  idata = data

	  id = (window.location.search || "?id=").substr(4);

	  if (id !== "") {
		  //console.log("x")
		  switch_bikepoint(id, true);
	  }
});


