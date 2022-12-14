var arr = [
    {
        "Name": "Crawlig Web",
        "Time": 5,
        "Divisions": 5
    },
    {
        "Name": "Scraping Content",
        "Time": 10,
        "Divisions": 5
    },
    {
        "Name": "Semantic Modeling",
        "Time": 5,
        "Divisions": 4
    },
    {
        "Name": "NLP",
        "Time": 8,
        "Divisions": 5
    },
    {
        "Name": "Competitive Analysis",
        "Time": 5,
        "Divisions": 4
    }
];

var collection = document.querySelector('.collection');
var load = document.querySelector('.loader');

var input = document.querySelector(".input");
var btn = document.querySelector(".btn");

input.addEventListener("keydown", function () {
    btn.removeAttribute('disabled');
    btn.style.opacity = 1;
    btn.style.cursor = "pointer";
});

input.addEventListener("keyup", function () {
    if (input.value == '') {
        btn.setAttribute('disabled', "");
        btn.style.opacity = 0.6;
        btn.style.cursor = "default";
    }
});

function loader(){
    btn.value = "";
}

btn.addEventListener("click", function () {
    if (input.value !== '') {
        load.style.display = "block";
        loader();
        btn.style.opacity = 0.6;
        btn.style.cursor = "default";
    }
});

btn.addEventListener('click', function(){
    btn.setAttribute('disabled', "");
})

btn.addEventListener('click', labelRender);
btn.addEventListener('click', percentage);

function labelRender() {
    let container = document.querySelector(".collection");
    if (container.hasChildNodes()) {
        container.innerHTML = "";
    }
    for (let i = 0; i < arr.length; i++) {
        var list = document.createElement('li');
        list.setAttribute('class', 'label');
        list.innerHTML = `${arr[i].Name}\u00A0\u00A0`;
        list.setAttribute('data-value', `... 0%`);
        collection.appendChild(list);
    }
}

function percentage() {
    // var delayArr = [];
    var round = [];
    var count = [];
    var listItem = [];
    // var delay = [];
    var timeLaps = [];
    var time = [];
    // var div = [];
    count[0] = 0;

    for (let label = 0; label < arr.length; label++) {
        timeLaps[label] = (arr[label].Time / arr[label].Divisions) * 1000;
        round[label] = 100 / arr[label].Divisions;
        time[label] = (arr[label].Time * 1000);
        // delay[label] = timeLaps / round;
        listItem[label] = collection.children[label];
        // div[label] = arr[label].Divisions;
        // delayArr[label] = timeLaps / round;
        if(label == 0){
            continue;
        }
        count[label] = count[label - 1] + (arr[label - 1].Time * 1000);
    }

    for(let i = 0; i < arr.length; i++){
        setTimeout(set, count[i], i);
    }

    function set(value){

        var z = round[value];
        var timeInterval = setInterval(function(){
            listItem[value].setAttribute('data-value', `... ${z}%`);
            if(z == 100){
                if(value != 0){
                    listItem[value - 1].style.borderLeft = "2px solid #478bf9";
                }
                listItem[value].setAttribute('data-value', "???");
                listItem[value].style.setProperty('--backgroundColor', '#478bf9');
                clearInterval(timeInterval);
            }
            z += round[value];
        }, timeLaps[value])
        if(value == arr.length - 1){
            setTimeout(function(){
            // load.style.animation = 'none';
            load.style.display = 'none';
            btn.value = "Analyze";
            btn.style.opacity = 1;
            }, arr[value].Time * 1000)
        }
   }
}