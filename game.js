$(document).ready(function () {
    let tick = 5;
    var count = 0, level = 1;
    Timer(tick,level);

    function Timer(tick,level) {
    var TimerCount = setInterval(myTimer, 1000);
    function myTimer() {
        if (tick === 5) {
           tick = levelMessage(level);
        }
        else if (tick >= 1) {
            tick--;
            $('.timer').text(tick);
        }
        else {
            clearInterval(TimerCount);
            $("#text").hide();
            $(".timer").hide();
            let timerId =timerForClick()
            objectAppearance(timerId,level);
        }
    }
}
    function levelMessage (level) {
        $("#text").empty(); $(".timer").empty();
        $("#text").show(); $(".timer").show();
        let message = "Level " + level;
        $("#text").text(message);
        return 4;
    }

    var getWindowSize = function () {
        let docWidth = $(document).width(),
            docHeight = $(document).height();
            return {"docWidth" : docWidth, "docHeight" : docHeight };
    }
    var getXY = function (docWidth, docHeight){
        var random_x = Math.floor((Math.random() * docWidth) + 1),
            random_y = Math.floor((Math.random() * docHeight) + 1);
        return {"randomX" : random_x, "randomY" : random_y};
    }
    function RandomImage () {
    return Math.floor((Math.random()*5)+1);
    }

    function CreateObj (x, y,timerId){
        image = RandomImage();
        var $rect = $("<div class='rect'>"+  "<img src='" + image + ".png' />" +"</div>");
        $rect.css({ "left": x, "top": y });
        $rect.css("visibility", "visible");  
        $('.container').append($rect).fadeIn(500);
        bindEvents($rect,timerId);
    }  
    
    function bindEvents($rect,timerId) {
        $rect.on('click',function () { 
        console.log(this); 
        $(this).off('click');
        $(this).remove();
        count+=1; console.log("count",count,"level",level);
        CheckCount(count,timerId);
        });
    }
    //-------------------------------------MAIN------------------------------
    function objectAppearance(timerId, level) {
        count = 0;
        let docSize = getWindowSize();
        debugger;
        for (let i=1; i <= level; i++) {
        let randomXY = getXY(docSize.docWidth-50, docSize.docHeight-50);
        console.log(randomXY.randomX, randomXY.randomY);
        CreateObj(randomXY.randomX, randomXY.randomY,timerId);
        }
    };

    //-----------------------------------------------------------------------
        function timerForClick(){
        return timerId =setTimeout(function() {
            alert("Your time is passed");
            $('div.rect').remove()
            tick = levelMessage (1);
            level=1;
            Timer(tick,level);
        }, 3000);
        // clearTimeout(timerId);
        }
        function CheckCount (count,timerId) {
        console.log("count Check",count,"level",level);
       if (count === level) {
        clearTimeout(timerId);
        level += 1;
        tick = levelMessage (level);
        Timer(tick,level);
        }
    }
})