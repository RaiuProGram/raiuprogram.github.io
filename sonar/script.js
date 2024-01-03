var questions = [];
var sorted = [];
var cq, piir, c_name, cqv, phtime, question_number = 0, min_question_score = 0, vale = false, mqk, save_obj = {};

function uus() {
    sorted = [];
    for (i = min_question_score; sorted.length == 0; i++) {
        sorted = questions.filter(function(n) {
            return n.score == i && n.last <= question_number - 3 && piir >= n.score;
        });
        if (i == piir) {
            alert("Error");
            return;
        }
    }
    cqv = Math.floor(Math.random() * sorted.length);
    for (i in questions) {
        if (questions[i].question == sorted[cqv].question) {
            cq = i;
            break;
        }
    }
    document.getElementById("title").innerHTML = questions[cq].question;
    document.getElementById("input").innerHTML = "";
}
function kontroll() {
    if (document.getElementById("input").value.toLowerCase() == questions[cq].answer.toLowerCase()) {
        save();
        if (!vale) {
            questions[cq].score++;
        }
        document.getElementById("input").value = "";
        vale = false;
        questions[cq].last = question_number;
        question_number++;
        while (mqk) {
            for (i in questions) {
                if (questions[i].score == min_question_score) {
                    mqk = false;
                }
            }
            if (mqk) {
                min_question_score++;
            }
        }
        document.getElementById("input").style.backgroundColor == "#333333";
        uus();
    } else {
        if (!vale) {
            questions[cq].score--;
        }
        clearTimeout(phtime);
        document.getElementById("input").setAttribute('placeholder', questions[cq].answer);
        phtime = setTimeout(function() {document.getElementById("input").setAttribute('placeholder', "");}, 3000);
        if (min_question_score > questions[cq].score) {
            min_question_score == questions[cq].score;
        }
        document.getElementById("input").value = "";
        vale = true;
        document.getElementById("input").style.backgroundColor == "#aaaa00";
    }
}
function save(teeuus) {
    save_obj.questions = questions;
    save_obj.question_number = question_number;
    save_obj.min_question_score = min_question_score;
    edit_cookie(c_name, JSON.stringify(save_obj));
    if (teeuus) {
        uus();
    }
}
document.getElementById("input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        kontroll();
    }
});
document.getElementById("lae").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        load(document.getElementById("lae").value);
    }
});
function load(txt) {
    if (txt.charAt(0) == "{") {
        c_name = prompt("Sisesta küsimuste nimi:");
        load_object(JSON.parse(txt));
    } else {
        load_object(JSON.parse(read_cookie(txt)));
    }
    document.getElementById('lae').value = "";
}
function load_object(obj) {
    questions = obj.questions;
    question_number = obj.question_number;
    min_question_score = obj.min_question_score;
    save(true);
}
var rc_k, rc_na, rc_nav;
function read_cookie(name) {
    rc_k = document.cookie;
    rc_nav = rc_k.indexOf(name + "=");
    rc_na = rc_nav + name.length + 1;
    if (rc_nav == -1) {
        return undefined;
    } else {
        return rc_k.slice(rc_na, rc_k.indexOf(";", rc_na));
    }
}
function edit_cookie(name, value) {
    document.cookie = name + "=" + value;
}