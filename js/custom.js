/**
 * Created by Ja on 16.02.2017.
 */
var Task = function (probability, name, description, time, rest, timesDaily, matura) {
    this.matura = matura || false;
    this.timesDaily = timesDaily || null;
    this.probability = probability || 0;
    this.time = (typeof time === "undefined") ? 25 : time; //min
    this.fixedtime = (time != null) ? true : false;
    this.name = name;
    this.description = description; //Education, Entertainment, Free Time, Job, Matura
    this.rest = rest || 5;
};

var tasks = [
    new Task(6, "Programming", "Education"),
    new Task(8, "Programming", "Job", 45, 10),
    new Task(4.5, "Programming", "Matura practice", 150, 20, 1, true),
    new Task(5, "Programming", "Matura theory", 90, 20, 1, true),
    new Task(5, "Math", "Education"),
    new Task(5, "Math", "Matura extended", 180, 20, 1, true),
    new Task(4.5, "Math", "Matura primary", 170, 20, 1, true),
    new Task(5, "English", "Education"),
    new Task(5, "English", "Matura extended", 150, 20, 1, true),
    new Task(4.5, "English", "Matura primary", 120, 20, 1, true),
    new Task(7, "World of Warships", "Just play, you earned", null),
    new Task(4, "The Way", "Just play, you earned", 30),
    new Task(6, "Free Time", "Just procrastinate, you can ;)", 30),
    new Task(8, "Go, make a tea.", "Or another drink :D", 3, 0),
    new Task(6, "YouTube", "One any move.", null),
    new Task(4, "Training", "Just take ass up! ;D", 25, 7),
    new Task(4, "Unfinished stories", "Let's read a book.", 30, 5),
    new Task(4, "Jumper deep", "Let's read a book.", 30, 5),
    new Task(4, "Short story of time", "Let's read a book.", 30, 5),
    new Task(4, "Memy", "Just scroll", 10, 0),
    new Task(0, "Gitara siema", "Let's play guitar hello.", 25, 10),
    new Task(10, "Test", "ciążowyonie:///", 1, 2)
];

function getTask() {
    if(currentTask != null){
        if(confirm("Are you sure, you want change task?")){
            $("#play > div").html("Start");
            timerClicked = !timerClicked;
            changeFavicon("fav.png");
            return drawLots();
        }
    }
    else{
        $("#play > div").html("Start");
        timerClicked = !timerClicked;
        changeFavicon("fav.png");
        return drawLots();
    }
}

function drawLots(){
    if(timer)clearInterval(timer);
    var max = tasks.length;
    var which = Math.floor(Math.random()*max);
    var randomProbability = Math.random() * 10;

    console.log(tasks[which]);
    if(oneMaturaForDay && tasks[which].matura)return drawLots();
    if(randomProbability <= tasks[which].probability) return setTask(tasks[which]);
    else return drawLots();
}

function setTask(thisTask){
    currentTask = thisTask;
    $("#task > .pads").html(thisTask.name);
    $("#task > #description").html(thisTask.description);
    if(thisTask.time != null)$("#time").html(thisTask.time+"min");
    else $("#time").html("Please, click stop, when you finish your task.");
    secondsElem.html("00");
    minutesElem.html("00");
    titleElem.html("00:00 " + thisTask.name);
}

function setTime() {
    var start = new Date();
    var stop = new Date(start.getMilliseconds() + currentTask.time * 1000);
}
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
$("#container").css("height", screenHeight + "px");
document.getElementsByClassName("pads")[0].style.paddingTop = screenHeight/4 - 55 + "px";
document.getElementsByClassName("pads")[1].style.paddingTop = screenHeight/4 - 55 + "px";
document.getElementsByClassName("pads")[2].style.paddingTop = screenHeight/4 - 55 + "px";
document.getElementsByClassName("pads")[3].style.paddingTop = screenHeight/4 - 55 + "px";
var currentTask = null;
var oneMaturaForDay = false;
var timerElem = $("#timer");
var secondsElem = $("#seconds");
var minutesElem = $("#minutes");
var taskElem = $("#task");
var titleElem = $("#title");
var timer = null;
var timerClicked = false;
var iconElem = $("#icon");
var freetime = false;
$("#play").on("click",function () {
    if(currentTask != null) {
        //toggle
        if (timerClicked) {
            clearInterval(timer);
            changeFavicon("fav.png");
            $("#play > div").html("Start");
        }
        else {
            timer = setInterval(function () {
                sec = parseInt(secondsElem.html());
                min = parseInt(minutesElem.html());
                sec++;

                console.log(sec, min);
                if (sec >= 60) {
                    sec = 0;
                    min++;
                }
                if (sec < 10)sec = "0" + sec;
                if (min < 10)min = "0" + min;
                titleElem.html(min + ":" + sec + " " + currentTask.name);
                //change icon
                if(!freetime)switch (sec % 4){
                    case 0:
                        changeFavicon("fav1.png");
                        break;
                    case 1:
                        changeFavicon("fav2.png");
                        break;
                    case 2:
                        changeFavicon("fav3.png");
                        break;
                    case 3:
                        changeFavicon("fav4.png");
                        break;
                }
                else changeFavicon("fav.png");
                //end case
                if(currentTask.time == min){
                    if(currentTask.matura)oneMaturaForDay = true;
                    if(currentTask.rest != null && !freetime){
                        min = "00";
                        sec = "00";
                        freetime = true;
                        currentTask.name = "End of task";
                        currentTask.time = currentTask.rest;
                    }
                    else{
                        freetime = false;
                        clearInterval(timer);
                        $("#play > div").html("The End");
                        currentTask = null;
                    }
                }

                secondsElem.html(sec);
                minutesElem.html(min);
            }, 1000);
            $("#play > div").html("Stop");

        }
        timerClicked = !timerClicked;
    }
});

function changeFavicon(href) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
};