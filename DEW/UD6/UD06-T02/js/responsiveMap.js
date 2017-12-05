var query900 = Modernizr.mq('(min-width: 1920px)');
var query768 = Modernizr.mq('(min-width: 768px)');
var lat,
	long,
	zoom;
if (query900) {
	lat = 52.5840664;
	long = 31.0702264;
	zoom = 4;
} else if (query768) {
	lat = 52.263063;
	long = 19.556182;
	zoom = 4;
} else {
	lat = 51.992581;
	long = 16.919815;
	zoom = 3;
}

/**
 * 
 * @param {*} pointer 
 * @param {*} infoCourse 
 */
function myMap(infoCourse, newMarker) {
	let myCenter = new google.maps.LatLng(lat, long);
	if (infoCourse != undefined)
		if (infoCourse.length == 1){
			zoom = 7;
			myCenter = {lat: infoCourse[0].latitud, lng: infoCourse[0].longitud};
		}
	var mapCanvas = document.getElementById('googleMap');
	var map = new google.maps.Map(mapCanvas, {
		center: myCenter,
		zoom: zoom
	});
	if(newMarker == 1){
		var listCousesByCity = coursesByCity(infoCourse);
	
		var icon = {url: '../svg/pin.svg', // url
			scaledSize: new google.maps.Size(60, 60),
		};

		var limites = new google.maps.LatLngBounds();
		var infowindow = new google.maps.InfoWindow();
		var marker,i;
		for (i = 0; i < infoCourse.length; i++) {
			
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(infoCourse[i].latitud, infoCourse[i].longitud),				 
				animation: google.maps.Animation.BOUNCE,
				icon: icon,
				map: map
			});
			
			if (infoCourse.length != 1)
				limites.extend(marker.position);
			
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent('<strong>' + infoCourse[i].city + '</strong></br>' + listCousesByCity[''+i].course);
					infowindow.open(map, marker);
				};
			})(marker, i));
		}
		if (infoCourse.length != 1)		
			map.fitBounds(limites);
		
		google.maps.event.addDomListener(window, 'load', myMap);
	}
}

function coursesByCity(list) {
	let cities = [];
	for (let i = 0; i < list.length; i++) {	
		cities.push(list[i].city);
	}
	cities = uniq(cities);

	let tmp = [];
	for (let i = 0; i < cities.length; i++) {
		let city = cities[i];
		let course = [];
		for (let j = 0; j < list.length; j++) {
			if (city == cities[i]) {			
				course.push(list[j].course);
			}
		}		
		tmp.push([city,course]);
		// tmp.push({city:city,course:course});
	}
	return tmp;
}