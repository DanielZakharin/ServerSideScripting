"use strict";

let dataArr = [];
/*[
 {
 "id": 12,
 "time": "2017-03-02 22:55",
 "category": "Wife",
 "title": "Title 1",
 "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
 "coordinates": {
 "lat": 60.2196781,
 "lng": 24.8079786
 },
 "thumbnail": "http://placekitten.com/320/300",
 "image": "http://placekitten.com/768/720",
 "original": "http://placekitten.com/2048/1920"
 },
 {
 "id": 15,
 "time": "2017-03-01 19:23",
 "category": "Wife",
 "title": "Title 2",
 "details": "Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
 "coordinates": {"lat": 60.3196781, "lng": 24.9079786},
 "thumbnail": "http://placekitten.com/321/300",
 "image": "http://placekitten.com/770/720",
 "original": "http://placekitten.com/2041/1920"
 },
 {
 "id": 34,
 "time": "2017-12-04 09:45",
 "category": "Girlfriend",
 "title": "Title 3",
 "details": "Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
 "coordinates": {"lat": 60.3196781, "lng": 24.9079786},
 "thumbnail": "http://placekitten.com/319/300",
 "image": "http://placekitten.com/769/720",
 "original": "http://placekitten.com/2039/1920"
 }
 ];
 let dataToUse = dataArr;
 */
let categoryArray = [];

let map;

let currentLatLng = {};

let markerArray = [];


/*
 Once running
 */

GetData();

function GetData() {
    const myRequest = new Request('./data.json', {
        headers: new Headers({
            'Content-Type': 'text/json'
        })
    });

    fetch(myRequest).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    }).then((response) => {
        dataArr = response;
        Populate(dataArr);
        FindAllCategories();
        PopulateDropdown();
    }).catch(function (error) {
        console.log('Problem :( ' + error.message);
    });
}

function FindAllCategories() {
    categoryArray = dataArr.map(object => {
        return object.category;
    })
    categoryArray = categoryArray.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    })
};

function PopulateDropdown() {
    for (let category of categoryArray) {
        console.log(category);
        document.getElementById("categories_dropdown").innerHTML += `
        <li class="cat-category"><a href="#">` + category + `</a></li>
    `
    }
}

function Populate(sourceArray) {
    console.log("jeeben");
    for (let i = 0; i < sourceArray.length; i++) {
        console.log("looping")
        document.getElementById("main").innerHTML += `
<div class="container-fluid cat-container" >
    <div class="row cat-row">
        <div class="col-md-3 col-md-offset-1 col-sm-6 col-xs-12">
            <img class="thumbnail cat-thumbnail" src="` + sourceArray[i].thumbnail + `"/>
        </div>
        <div class="col-md-5 col-sm-6 col-xs-12 container cat-information">
            <div class="row" style="margin-bottom:2em;">
                <h3 class="cat-title col-xs-5 ">` + sourceArray[i].title + ` <span class="label label-info">` + sourceArray[i].category + `</span> </h3>  
                <p class="col-xs-5" style="text-align: right">` + ConvertDate(sourceArray[i].time) + `</p>
            </div>
            <div class="row">
                <p class="col-md-10">` + sourceArray[i].details + `</p>
            </div>
        </div>
        

    </div>
    <div class="row text-center" id="button-footer">
        <button data-identification="` + sourceArray[i].id + `" class="btn button-footer-button" data-toggle="modal" data-target="#myModal">View</button>
    </div>
    
</div>`
    }
}

function EmptyContent() {
    $("#main").empty();
}

function ConvertDate(dateString) {
    /*const date = new Date(Date.parse(dataArr[0].time));
     console.log("original date " + dateString + "\nnewDate " + date.getDay().toString() + "." + date.getMonth() + "." + date.getYear())*/
    const dateMembers = dateString.split(new RegExp("[- ]", "g"));
    console.log(dateMembers);
    return dateMembers[2] + "." + dateMembers[1] + "." + dateMembers[0];
}

function initMap() {
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
    });
}

function moveGoogleMapToCoordinate(lat, lng) {
    const center = new google.maps.LatLng(lat, lng);
    map.setZoom(15);
    map.panTo(center);
}

function getCatById(id) {
    for (let cat of dataArr) {
        if (cat.id == id) {
            return cat;
        }
    }
}

function clearMapMarkers(){
    for (let marker of markerArray){
        marker.setMap(null);
    }
    markerArray = [];
}

/*$(".view-btn").click(function () {
 //$(".modal-content").empty().append(`<img class="col-xs-12" src="` + dataArr[$(this).attr("data-identification")].image + `"/>`);
 console.log($(this).attr("data-identification") + " <----");
 document.getElementById("cat-image").src = $(this).attr("data-identification");

 });
 */

$(".dropdown").on("click", ".cat-category", function () {
    console.log("cat category clicked");
    EmptyContent();
    const indexOfLink = $(this).index();
    if (indexOfLink == 0) {
        Populate(dataArr);
    } else {
        const ilteredDataArr = dataArr.filter(object => object.category == categoryArray[$(this).index() - 1]);
        Populate(ilteredDataArr);
    }
});

$("#main").on("click", ".button-footer-button", function () {
    const selectedCat = getCatById($(this).attr("data-identification"));
    document.getElementById("cat-image").src = selectedCat.image;
    currentLatLng = selectedCat.coordinates;
    clearMapMarkers();
    markerArray.push(new google.maps.Marker({
            position: selectedCat.coordinates,
            map: map,
            title: 'Hello World!'
        })
    );

});

$("#myModal").on("shown.bs.modal", (e) => {
    google.maps.event.trigger(map, "resize");
    moveGoogleMapToCoordinate(currentLatLng.lat, currentLatLng.lng);
});


//<li><a href="#">Action</a></li>

