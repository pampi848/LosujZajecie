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
    new Task(5, "Math", "Matura enlargement", 180, 20, 1, true),
    new Task(4.5, "Math", "Matura primary", 170, 20, 1, true),
    new Task(5, "English", "Education"),
    new Task(5, "English", "Matura enlargement", 150, 20, 1, true),
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
    new Task(0, "Memy", "Just scroll", 10, 0)
];

function drawLots(){
    var max = tasks.length;
    var which = Math.floor(Math.random()*max);
    var randomProbability = Math.random() * 10;
    if(randomProbability <= tasks[which].probability)return tasks[which];
    else return drawLots();
}

