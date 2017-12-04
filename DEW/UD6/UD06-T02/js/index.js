/**
 *
 */
var mediumDegree = [];
/**
 *
 */
var advanceDegree = [];
/**
 *
 */
var professor = [];

var elementsSendToMap = [];

var type = ['Todos'];
/**
 *
 * @param {*} type
 * @param {*} course
 * @param {*} country
 * @param {*} location
 */
function TypeMobility(type, course, country, location) {
	this.type = type;
	this.course = course;
	this.country = country;
	this.location = location;
}

function Location(course, city, latitud, longitud) {
	this.course = course;
	this.city = city;
	this.latitud = latitud;
	this.longitud = longitud;
}

var typeMobility = document.getElementById('typeMobility');
typeMobility.addEventListener('change', loadDataComboBox, false);

var toggle = document.getElementById('toggle');
toggle.addEventListener('change', toggleSelected, false);

/**
 *
 */
function init() {
	for (var e in data) {
		let obj = data[e];
		switch (obj.tipo) {
		case 'Grado Medio':
			var md = new TypeMobility(obj.tipo, obj.ciclo, obj.pais, obj.localizacion);
			mediumDegree.push(md);
			break;
		case 'Grado Superior':
			var ad = new TypeMobility(obj.tipo, obj.ciclo, obj.pais, obj.localizacion);
			advanceDegree.push(ad);
			break;
		case 'Profesorado':
			var pfr = new TypeMobility(obj.tipo, obj.ciclo, obj.pais, obj.localizacion);
			professor.push(pfr);
			break;
		}
	}
	type.push(mediumDegree[0].type, advanceDegree[0].type, professor[0].type);
	writeDropDown(type, 'typeMobility');
	toggleSelected();
	loadDataComboBox();
}

let countryGrp = document.getElementById('countryGrp');
let courseGrp = document.getElementById('courseGrp');
countryGrp.style.display = 'none';
courseGrp.style.display = 'none';

/**
 *
 */
function toggleSelected() {
	if (!toggle.checked) {
		countryGrp.style.display = 'none';
		courseGrp.style.display = '';
	} else {
		courseGrp.style.display = 'none';
		countryGrp.style.display = '';
	}
}

var country = document.getElementById('country');
country.addEventListener('change', function () {
	elementsSendToMap = showCountry();
	myMap(elementsSendToMap, 1);
},false);

/**
 * 
 */
function showCountry() {
	let tmp = [];
	for (let e in data) {
		if(data[e].pais == country.value){
			let obj = new Location(data[e].ciclo, data[e].localizacion.ciudad, 
				data[e].localizacion.latitud, data[e].localizacion.longitud);
			tmp.push(obj);	
		}
	}	
	return tmp;
}

/**
 * 
 */
function showCountryByCourse(array) {
	var chckCountry = document.getElementById('checkCountry');
	let tmp=[];
	for (let i = 0; i < array.length; i++) {
		tmp.push(array[i].pais);		
	}
	tmp = uniq(tmp);
	deleteTreeElements(chckCountry, false);
	
	if(tmp.length > 0){
		let btnSelectAll = createElement('label', chckCountry, 'Marcar/Desmarcar todos', 'class', 'btn btn-primary', 'for', 'selectAll');
		createElement('input', btnSelectAll, null, 'type', 'checkbox', 'id', 'selectAll');
		for (let i = 0; i < tmp.length; i++) {
			let label = createElement('label', chckCountry, tmp[i], 'class', 'btn btn-default', 'for', 'option' + i);
			createElement('input', label, null, 'type', 'checkbox', 'id', 'option' + i, 'class', 'check');
		}
	
		btnSelectAll.addEventListener('click', selectAllCountryCheckBox,false);
		selectAllCountryCheckBox();	
	}
	return tmp;
}

function countryByCourse(array) {
	let tmp = [];	
	for (let i = 0; i < array.length; i++) {
		tmp.push(array[i].country);
	}
	return tmp;
}

/**
 *
 */
function loadDataComboBox() {
	var selected = document.getElementById('typeMobility');
	let tmp = [];
	switch (selected.value) {
	case type[0]:
		groupBy(mediumDegree, 'course', false);
		groupBy(advanceDegree, 'course', false);
		groupBy(professor, 'course', false);
		for (let e in data){
			let obj = new TypeMobility(data[e].tipo, data[e].ciclo, data[e].pais, data[e].localizacion);
			tmp.push(obj);
		}
		groupBy(tmp, 'country', false);
		break;
	case type[1]:
		groupBy(mediumDegree, 'course', true);
		groupBy(mediumDegree, 'country', true);
		break;
	case type[2]:
		groupBy(advanceDegree, 'course', true);
		groupBy(advanceDegree, 'country', true);
		break;
	case type[3]:
		groupBy(professor, 'course', true);
		groupBy(professor, 'country', true);
		break;
	}

}

/**
 *
 */
var selectCourse = document.getElementById('course');
selectCourse.addEventListener('change', function () {
	let elementsSendToMap = [];
	for (let e in data) {
		if (selectCourse.value == data[e].ciclo) {
			elementsSendToMap.push(data[e]);
		}
	}
	btnSubmit.style.display = 'inline-block';
	showCountryByCourse(elementsSendToMap);
}, false);

let btnSubmit = document.getElementById('submit');	
btnSubmit.addEventListener('click', generateMarker, false);

/**
 * 
 * @param {*} params 
 */
function selectAllCountryCheckBox() {
	let selectAll = document.getElementById('selectAll');
	let allCountryCheck = document.querySelectorAll('.check');
	if(selectAll.checked)
		allCountryCheck.forEach(function (e) {
			e.checked = false;
			e.parentNode.className = 'btn btn-default';
		});
	else
		allCountryCheck.forEach(function (e) {
			e.checked = true;
			e.parentNode.className += ' active';
		});
}
/**
 * 
 */
function generateMarker() {
	let allCountryCheck = document.querySelectorAll('.check');
	let checked = 0;
	allCountryCheck.forEach(function (e) {
		if(e.checked)
			checked++;
	});
	if(checked > 0){
		elementsSendToMap = selectedCountry(elementsSendToMap);
		myMap(elementsSendToMap, 1);
	} else
		alert('Debe seleccionar al menos un país');
}

/**
 * 
 * @param {*} elementsSendToMap 
 */
function selectedCountry(elementsSendToMap) {
	let checkBox = document.querySelectorAll('input');
	let selectCourse = document.getElementById('course');
	let tmp = [];
	let checked = [];
	for (let i = 1; i < checkBox.length; i++) {
		if (checkBox[i].checked)
			checked.push(checkBox[i].previousSibling.data);
	}

	for (let e in data){
		for (let j = 0; j < checked.length; j++) {
			if(data[e].pais == checked[j] && data[e].ciclo == selectCourse.value){
				let obj = new Location(data[e].ciclo, data[e].localizacion.ciudad, 
					data[e].localizacion.latitud, data[e].localizacion.longitud);
				tmp.push(obj);
			}
		}
	}
	return tmp;
}

/**
 *
 * @param {*} array
 * @param {*} idToSearch
 * @param {*} all
 */
function groupBy(array, idToSearch, all) {
	let tag = document.getElementById(idToSearch);
	let tmp = ['---- Seleccionar mobilidad de ' + array[0].type + ' ----'];
	for (let i = 0; i < array.length; i++) {
		if (idToSearch == 'course') 
			tmp.push(array[i].course);
		if (idToSearch == 'country') 
			tmp.push(array[i].country);
	}
	if (all) 
		deleteTreeElements(tag, false);
	writeDropDown(tmp = uniq(tmp), idToSearch);
}

/**
 *
 * @param {Array} a - List of elements to 'group by'
 */
function uniq(a) {
	return Array.from(new Set(a));
}

/**
 *
 * @param {*} array
 * @param {*} id
 */
function writeDropDown(array, id) {
	let tag = document.getElementById(id);
	for (let i = 0; i < array.length; i++) {
		createElement('option', tag, array[i]);
	}
}

/**
 *
 */
init();