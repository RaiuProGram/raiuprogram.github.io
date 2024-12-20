var mode = 0, om, started = true;
var cpsi = setInterval(update_cps, 250), cps0 = 0, cps1 = 0, cps2 = 0, cps3 = 0, clicks = 0;
var timeri, t0, t1, t2, is_s;

function mode_switch(m) {
    om = mode;
    mode = m;
    switch (m) {
        case 0:
            document.getElementById("text1").innerHTML = "0 cps";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "";
            cps0, cps1, cps2, cps3 = 0, clicks = 0;
            clearInterval(cpsi);
            clearInterval(timeri);
            cpsi = setInterval(update_cps, 250);
            break;
        case 1:
            document.getElementById("text1").innerHTML = "Click to Start";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "0 cps";
            cps0, cps1, cps2, cps3 = 0, clicks = 0, started = false;
            t0 = 100, t1 = 150, t2 = 5;
            clearInterval(cpsi);
            clearInterval(timeri);
            break;
        case 2:
            document.getElementById("text1").innerHTML = "Click to Start";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "0 cps";
            cps0, cps1, cps2, cps3 = 0, clicks = 0, started = false;
            t0 = 1000, t1 = 1600, t2 = 60;
            clearInterval(cpsi);
            clearInterval(timeri);
            break;
        case 3:
            mode = om;
            popup(true, "custom");
            return;
    }
    document.getElementById("msb" + om).classList.remove("ms-button-selected");
    document.getElementById("msb" + m).classList.add("ms-button-selected");
}
document.getElementById("click-counter").addEventListener('click', function () {
    if (mode == 0) {
        clicks++;
        document.getElementById("text2").innerHTML = clicks + " clicks";
        cps0++;
    } else {
        if (started) {
            cps0++;
            clicks++;
            document.getElementById("text2").innerHTML = clicks + " clicks";
        } else {
            cps0++;
            clicks++;
            document.getElementById("text2").innerHTML = clicks + " clicks";
            started = true;
            cpsi = setInterval(update_cps, 250);
            timeri = setInterval(timer, 100);
        }
    }
});
function timer() {
    t1--;
    document.getElementById("text1").innerHTML = ((t1 + "").slice(1, -1) + "." + (t1 + "").slice(-1, t1.length)) + "s left";
    if (t1 == t0) {
        clearInterval(timeri);
        popup(true, "result");
        started = false;
    }
}
function update_cps() {
    if (mode == 0) {
        document.getElementById("text1").innerHTML = (cps0 + cps1 + cps2 + cps3) + " cps";
    } else {
        document.getElementById("text3").innerHTML = (cps0 + cps1 + cps2 + cps3) + " cps";
    }
    cps3 = cps2;
    cps2 = cps1;
    cps1 = cps0;
    cps0 = 0;
}
function result_alt(cps) {
    var list = [];
    if (cps < 0.017) {
        list.push("Well... Not my problem that you're hacking.");
    } else if (cps == 0.017) {
        list.push("impressive");
        list.push("It took ONLY one minute");
        list.push("WORLD RECORD!;!!=!=! OMG! OMG'!");
        list.push("1 CPM (Clicks Per Minute)");
    } else if (cps == 0.2) {
        list.push("CP5S");
        list.push("5s");
    } else if (cps < 1) {
        list.push("Good try");
        list.push("Not very Good");
        list.push("Could be better");
        list.push("Try again");
        list.push("):");
        list.push("You WILL reach 1cps one day!");
    } else if (cps < 2 && cps >= 1) {
        list.push("Just try again!");
        list.push("You WILL reach 2cps!");
        list.push("Just try again, you WILL reach 2cps!");
        list.push("Well that's not really fast...");
        list.push("My record with Drag Clicking!");
    } else if (cps < 3 && cps >= 2) {
        list.push("Just try again!");
        list.push("You WILL reach 3 cps!");
        list.push("Just try again, you WILL reach 3 cps!");
        list.push("more then 1.999999cps");
        list.push("Less than 3cps");
        list.push("slow.");
    } else if (cps < 4 && cps >= 3) {
        list.push("Just try again!");
        list.push("You WILL reach 4 cps!");
        list.push("Just try again, you WILL reach 4 cps!");
        list.push("Halfway to average!");
        list.push("not very fast");
    } else if (cps < 5 && cps >= 4) {
        list.push("Just try again!");
        list.push("You WILL reach 5 cps!");
        list.push("Just try again, you WILL reach 5 cps!");
        list.push("Never back down never WHAT?");
        list.push("Never give up!");
        list.push("More than halfway to average!");
    } else if (cps < 3 && cps >= 2) {
        list.push("Just try again!");
        list.push("You WILL reach cps!");
        list.push("Just try again, you WILL reach cps!");
        list.push("");
    }
    return list[Math.floor(Math.random() * list.length)];
}
function popup(o, id) {
    if (o) {
        document.getElementById(id + "-back").style.display = "block";
        document.getElementById(id).style.display = "block";
        if (id == "result") {
            document.getElementById("result-title").innerHTML = (Math.round((clicks / t2) * 1000) / 1000)  + " CPS";
            document.getElementById("result-alt").innerHTML = result_alt((Math.round((clicks / t2) * 1000) / 1000));
            if (clicks != 1) {
                is_s = "S";
            } else {
                is_s = "";
            }
            document.getElementById("result-clicks").innerHTML = clicks + " <span class='c'>CLICK" + is_s + " IN</span> " + t2 + " <span class='c'>SECONDS</span>";
            mode_switch(mode);
            click_protector();
        }
    } else {
        document.getElementById(id + "-back").style.display = "none";
        document.getElementById(id).style.display = "none";
    }
}
function click_protector() {
    document.getElementById("click-protector").style.display = "block";
    setTimeout(function() {document.getElementById("click-protector").style.display = "none";}, 1000);
}
document.getElementById("menu-button").addEventListener('click', function (evt) {
        //alert('Gd microbee: ​like a 1000 years ago in a random live stream you asked some people if they want to be in a game and i was one of them that you asked or something        ');
});
document.getElementById("click-counter").addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);