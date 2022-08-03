let held = 0;
let threshold = 500;
let timer_on = false;
let time = 0; //all times in ms

let key_is_down = false;
let col_changed = false;

let lightmode = true;

let start_time = Date.now();

let cur_interval;

let txt = document.getElementById("timer");

document.addEventListener("keydown",handle_down);

document.addEventListener("keyup",handle_up);

// setInterval(() => {console.log("Held ",held," ",start_time)},1000);

//handles keydown event
function handle_down(event){
    if(key_is_down) return;
    key_is_down = true;
    display_time();
    if(timer_on){
        clearInterval(cur_interval);
        timer_on = false;
        held = 0;
        console.log("stopped!");
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
    if(lightmode) txt.style.color = "black";
    else txt.style.color = "white";
    col_changed = false;
}

//records time or time key held down
function upd(){
    // console.log(held,timer_on);
    if(!timer_on && key_is_down){
        // console.log(held,col_changed);
        if(held>=threshold && !col_changed) {
            txt.style.color = "green";
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
    txt.innerHTML = display+" s";
}





//add toggle dark mode
let button = document.getElementById("btn");

button.addEventListener("click",toggle);

let title = document.getElementById("tle");

function toggle(){
    console.log("toggle is called!");
    if(lightmode){
        document.body.style.backgroundColor = "black";
        txt.style.color = "white";
        title.style.color = "white";
    }else{
        document.body.style.backgroundColor = "white";
        txt.style.color = "black";
        title.style.color = "black";
    }
    lightmode = !lightmode;
}