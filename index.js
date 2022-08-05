let held = 0;
let threshold = 300; //default threshold is 300
let timer_on = false;
let time = 0; //all times in ms
let times = [];

let key_is_down = false;
let col_changed = false;
let change_text = true;

let lightmode = false;

let start_time = Date.now();

let cur_interval;

let timer = document.getElementById("timer");

let list = document.getElementById("listwrap");
let list_size = 0;

document.addEventListener("keydown",handle_down);

document.addEventListener("keyup",handle_up);

// setInterval(() => {console.log("Held ",held," ",start_time)},1000);

//handles keydown event
function handle_down(event){
    if(key_is_down) return;
    key_is_down = true;
    display_time();
    if(event.key==" " && event.target==document.body){
        event.preventDefault();
    }
    if(timer_on){
        clearInterval(cur_interval);
        timer_on = false;
        held = 0;
        console.log("stopped!");
        times.push(time);

        let new_time = document.createElement("div");
        new_time.classList.add("time_rec");
        new_time.style.flex = 1;
        new_time.style.marginLeft = 10;

        if(list_size==0) new_time.id = "first";
        else if(list_size>=3) {
            new_time.id = "last";
            list.style.boxShadow = "inset 0px 0px 5px black";
        }

        ++list_size;

        new_time.innerHTML = ""+list_size+":";
        new_time.appendChild(document.createElement("br"));
        new_time.innerHTML+=display_time();
        list.insertBefore(new_time,list.firstChild);
    }else if(event.key==" "){
        held = 0;
        start_time = Date.now();
        cur_interval = setInterval(upd,10);
    }
}

//handles keyup event
function handle_up(event){
    key_is_down = false;
    display_time();
    clearInterval(cur_interval);
    if(event.key==" " && !timer_on && held>=threshold){
        timer_on = true;
        start_time = Date.now();
        cur_interval = setInterval(upd,10);
        console.log("started!");
    }
    held = 0;
    if(lightmode) {
        if(change_text){
            timer.style.color = "black";
            timer.style.textShadow = "none";
            timer.style.boxShadow = "none";
        }else {
            document.body.style.backgroundColor = "white";
        }
    }else {
        if(change_text){
            timer.style.color = "white";
            timer.style.textShadow = "none";
            timer.style.boxShadow = "none";
        }else {
            document.body.style.backgroundColor = "black";
        }
    }
    col_changed = false;
}

//records time or time key held down
function upd(){
    // console.log(held,timer_on);
    if(!timer_on && key_is_down){
        // console.log(held,col_changed);
        if(held>=threshold && !col_changed) {
            if(change_text){
                timer.style.color = "green";
                timer.style.textShadow = "0px 0px 40px green";
                timer.style.boxShadow = "0px 0px 80px green, 0px 0px 40px green";
                //timer.style.boxShadow = "0px 0px 40px green";
            }else {
                document.body.style.backgroundColor = "green";
            }
            col_changed = true;
        }
        held = Date.now()-start_time;
    }else if(timer_on && !key_is_down){
        time = Date.now()-start_time;
        display_time();
    }
}

function display_time(){
    let rounded = Math.floor(time/10);
    let display = ""+(rounded/100);
    if(rounded%100==0) display+=".00";
    else if(rounded%10==0) display+="0";
    timer.innerHTML = display+" s";
    return display+"s";
}





//add toggle dark mode
let button = document.getElementById("btn");

button.addEventListener("click",toggle);

let title = document.getElementById("tle");


toggle();

function toggle(){
    console.log("toggle is called!");
    if(lightmode){
        document.body.style.backgroundColor = "black";
		let arr = document.querySelectorAll("body *");
		arr.forEach(x => {x.style.color = "white"});
    }else{
        document.body.style.backgroundColor = "white";
		let arr = document.querySelectorAll("body *");
		arr.forEach(x => {x.style.color = "black"});
    }
	button.style.color = "black";
    lightmode = !lightmode;
}
