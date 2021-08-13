
var red_sound = new Audio("sounds/red.mp3");
var blue_sound = new Audio("sounds/blue.mp3");
var yellow_sound = new Audio("sounds/yellow.mp3");
var green_sound = new Audio("sounds/green.mp3");
var wrong_sound = new Audio("sounds/wrong.mp3");
var level = 0;
var flag = 0;
var x = 1;
var btn_type;
const colors = ["red", "green", "blue", "yellow"];
var score = 5;
var req = [];
var user = [];
function playAudio(btn_type) {
    switch (btn_type) {
                case "red":
                    red_sound.play();
                    break;
                case "blue":
                    blue_sound.play();
                    break;
                case "green":
                    green_sound.play();
                    break;
                case "yellow":
                    yellow_sound.play();
                    break;
            }

}
function check_answer(currentIndex) {
        if (user[currentIndex] === req[currentIndex]) {
            if (user.length === req.length) {
                setTimeout(() => { add_next_sequence() }, 1000)
            }

        }
        else {
            $("body").addClass("game-over");
            wrong_sound.play();
            setTimeout(() => { $("body").removeClass("game-over") }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            console.log("game_over!!!");
            $("#description").slideDown(100);
            req = [];
            flag = 0;
            user = [];
            level = 0;
        }
    }
   
function add_next_sequence() {
    user = [];
    let index = Math.floor(Math.random() * colors.length);
    var randomChosen = colors[index];
    playAudio(randomChosen);
    $('#' + randomChosen).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    req.push(randomChosen);
    level++;
    if (flag == 1) {
        $("#level-title").html("LEVEL "+level);
    }
}

 
$(document).keypress(function () {
    
    if (flag == 0) {
        $("#level-title").html("LEVEL 0");
        add_next_sequence();
        flag = 1;
        level = 0;
        $("#description").slideUp(100);
    }
});
var currentIndex = -1;
    $(".btn").click(function () {
        $(this).addClass("pressed");
        setTimeout(() => { $(this).removeClass("pressed") }, 200);
        btn_type = this.id;
        playAudio(btn_type);
        user.push(btn_type);
        currentIndex = user.length - 1;
        check_answer(currentIndex);
    });