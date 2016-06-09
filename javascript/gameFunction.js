$(function () {
    var window = $('#window');
    var block = $('.block');
    var block1 = $('#block1');
    var block2 = $('#block2');
    var bird = $('#bird');
    var speedInd = $('#speed');
    var score = $('#score');
    var rstrt_btn = $('#rstrt_btn');
    var endBlock = $('#endBlock');
    var start_btn = $('#start_btn');
    var name = $('#name');
    var bgmCtrl = $('#bgmCtrl');
    var ONorOFF = $('#ONorOFF');

    // initial values
    var windowWidth = parseInt(window.width());
    var windowHeight = parseInt(window.height());
    var blockP1 = parseInt(block.css('right'));
    var blockH1 = parseInt(block.css('height'));
    var birdP1 = parseInt(bird.css('left'));
    var birdH1 = parseInt(bird.css('top'));
    var speed = 10;
    var gameover = false;
    var goUp = false;
    var scoreUpdate = false;
    var start = false;
    var audio = true;

    // how the game works    
    var game = setInterval(function () {
        // start menu
        if (start === false) {
            hidebird();
            fallSpeed.disable();
        } else {
            // how the game works after starting
            hidemenu();
            showbird();
            if (collision(bird, block1) || collision(bird, block2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > windowHeight - birdH1) {
                stopGame();
            } else {

                var blockCurrentP = parseInt(block.css('right'));

                if (blockCurrentP > windowWidth - birdP1) {
                    if (scoreUpdate === false) {
                        scoreUpdate = true;
                        score.text(parseInt(score.text()) + 1);
                    }
                }
                if (blockCurrentP > windowWidth) {
                    var addHeight = parseInt(Math.random() * 100);
                    block1.css('height', blockH1 + addHeight);
                    block2.css('height', blockH1 - addHeight);
                    speed = speed + 1
                    speedInd.text(speed);
                    scoreUpdate = false;
                    blockCurrentP = blockP1;

                }
                block.css('right', blockCurrentP + speed);
                if (goUp === false) {
                    fallSpeed();
                }
            }
        }
    }, 40);

    // hide bird ();
    function hidebird() {
        bird.hide();
    }
    // disable hide bird
    function showbird() {
        bird.show();
    }
    // hide menu
    function hidemenu() {
        start_btn.hide();
        name.hide();
    }
    // start game by pressing btn
    start_btn.click(function () {
        start = true;
    });

    // define bird falling speed
    function fallSpeed() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    // disable spacebar scroll
    $(document).keydown(function (e) {
        if (e.which == 32) {
            return false;
        }
    });
    // define spacebar controlls
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && goUp === false && gameover === false)
            goUp = setInterval(fly, 50);
    });
    function fly() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32);
        clearInterval(goUp);
        goUp = false
    });

    // what happens when game ends
    function stopGame() {
        clearInterval(game);
        gameover = true;
        endBlock.slideDown();
        rstrt_btn.slideDown();
        stopBGM();
        playFail();

    }
    rstrt_btn.click(function () {
        location.reload();
    });

    // audio functions
    function stopBGM() {
        bgm.pause();
    }
    function playFail() {
        fail.play();
    }

bgmCtrl.click(function(){    
    ONorOFF.toggleClass('On');
    if(ONorOFF.hasClass('On')){
        ONorOFF.text('Off');
        bgm.pause();         
    } else {
        ONorOFF.text('On');
        bgm.play();
    }
});

    // define how bird collide
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    // end of $function 
});