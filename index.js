var head1=document.getElementById('head1');
var head2=document.getElementById('head2');
var ball=document.getElementById('ball');
let beat = new Audio('./hey.mp3');


const storeName="NameNB";
const storeScore="MaxScoreNB";
const head1Name="Head 1";
const head2Name="Head 2";



let score,
    maxScore,
    movement,
    head,
    ballSpeedX=2,
    ballSpeedY=2,
    gameOn=false,
    windowWidth=window.innerWidth;
    windowHeight=window.innerHeight;

    (function(){
        head=localStorage.getItem(storeName);
        maxScore=localStorage.getItem(maxScore);
        if(head === null || maxScore === null){
            window.alert(`This is the first time you are playing this game. LET'S START`);
            head="Head 1";
            maxScore=0;

        }else{
            alert(`${head} has max score of ${maxScore *10}`)
        }
        resetBoard(head);
        
    })();



    function resetBoard(headName){

        //  add the head and the ball to inital position

        head1.style.left=(windowWidth-head1.offsetWidth)/2 +'px'; 
        head2.style.left=(windowWidth-head2.offsetWidth)/2 +'px'; 
        ball.style.left=(windowWidth-ball.offsetWidth)/2 +'px'; 
        // now we need to add the ball to the player who lost
        
        if(headName===head2Name){
            ball.style.top= (head1.offsetTop+head1.offsetHeight) +'px';
            ballSpeedY=2;
        }else if(headName===head1Name){
            ball.style.top= (head2.offsetTop-head2.offsetHeight)+'px';
            ballSpeedY=-2;

        }

        score=0;
        gameOn=false;

    }

    function storeWin(head, score){
        beat.pause();
        if(score>maxScore){
            maxScore=score;
            localStorage.setItem('storeName',head);
            localStorage.setItem('maxScore',score);
        }

        clearInterval(movement);
        

        window.alert(`${head} wins with the score of ${score*10} and Max Score is : ${maxScore*10}`);

        resetBoard();

    }



window.addEventListener('keydown', function(){



    let headSpeed=125;
    let headRect=head1.getBoundingClientRect();

    if((this.event.code=="KeyD"|| this.event.code=="ArrowRight") && (headRect.x+head1.offsetWidth <windowWidth)){
        for(let i=1;i<=headSpeed;i++){
            increment(i);
        }
        function increment(i){
            setTimeout(function(){
                head1.style.left= (headRect.x) + i +'px';
                head2.style.left= head1.style.left;
            },1*i);
        }
        
       
    } else if((this.event.code==='KeyA'|| this.event.code=="ArrowLeft") && (headRect.x > 0)){
        for(let i=1;i<=headSpeed;i++){
            increment(i);
        }
        function increment(i){
            setTimeout(function(){
                head1.style.left= (headRect.x) + -i +'px';
                head2.style.left= head1.style.left;
            },1*i);
        }

    }

    if(this.event.code==='Enter'){
        if(!gameOn){
            gameOn=true;
            beat.play();


            let ballRect=ball.getBoundingClientRect();
            let ballX=ballRect.x;
            let ballY=ballRect.y;
            let ballDia=ballRect.width;
        
            let head1Width=head1.offsetWidth;
            let head1Hight=head1.offsetHeight;
            let head2Width=head2.offsetWidth;
            let head2Hight=head2.offsetHeight;

            // now moving the ball

            movement=this.setInterval(function(){
                ballX+=ballSpeedX;
                ballY+=ballSpeedY;
                ball.style.top=ballY +'px';
                ball.style.left=ballX +'px';

                var head1X=head1.offsetLeft;
                var head2X=head2.offsetLeft;

                //  reverse direction in case of ball hits the vertical walls

                if((ballX+ballDia) >windowWidth || ballX<0){
                    ballSpeedX=-ballSpeedX;
                }

                // It specifies the center of the ball on the viewport
                let ballPos = ballX + ballDia / 2;

                // checking for rod1 hit

                if(ballY<=head1Hight){
                    ballSpeedY=-ballSpeedY;
                    score++;
                    //  now checking if the ball hits the head or not

                    if((ballPos<head1X)|| ballPos>(head1Width+head1X)){
                        storeWin(head2Name,score);
                    }
                }
                // now checking for head2
                else if((ballY + ballDia)>=(windowHeight-head2Hight)){
                    ballSpeedY=-ballSpeedY;
                    score++;
                    //  now checking for if  ball hits the head or not
                    if((ballPos <head2X)|| ballPos>(head2Width+head2X)){
                        storeWin(head1Name,score);
                    }
                }





            },10)


        }
    }



})


window.addEventListener('touchstart', handleTouchStart, false);        
window.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                    
};                                                
                                                                         
function handleTouchMove(evt) {

    let headSpeed=50;
    let headRect=head1.getBoundingClientRect();
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            // console.log('swipe left');

            if( headRect.x > 0){
                for(let i=1;i<=headSpeed;i++){
                    increment(i);
                }
                function increment(i){
                    setTimeout(function(){
                        head1.style.left= (headRect.x) - i +'px';
                        head2.style.left= head1.style.left;
                    },1*i);
                }
            }
        } else {
            /* left swipe */
            // console.log('swipe right');

            if( headRect.x+head1.offsetWidth <windowWidth){
                for(let i=1;i<=headSpeed;i++){
                    increment(i);
                }
                function increment(i){
                    setTimeout(function(){
                        head1.style.left= (headRect.x) +i +'px';
                        head2.style.left= head1.style.left;
                    },1*i);
                }
            }
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null; 
    
    
};


ball.addEventListener('touchstart', startGame);

function startGame(){
    if(!gameOn){
        gameOn=true;
        beat.play();


        let ballRect=ball.getBoundingClientRect();
        let ballX=ballRect.x;
        let ballY=ballRect.y;
        let ballDia=ballRect.width;
    
        let head1Width=head1.offsetWidth;
        let head1Hight=head1.offsetHeight;
        let head2Width=head2.offsetWidth;
        let head2Hight=head2.offsetHeight;

        // now moving the ball

        movement=setInterval(function(){
            ballX+=ballSpeedX;
            ballY+=ballSpeedY;
            ball.style.top=ballY +'px';
            ball.style.left=ballX +'px';

            var head1X=head1.offsetLeft;
            var head2X=head2.offsetLeft;

            //  reverse direction in case of ball hits the vertical walls

            if((ballX+ballDia) >windowWidth || ballX<0){
                ballSpeedX=-ballSpeedX;
            }

            // It specifies the center of the ball on the viewport
            let ballPos = ballX + ballDia / 2;

            // checking for rod1 hit

            if(ballY<=head1Hight){
                ballSpeedY=-ballSpeedY;
                score++;
                //  now checking if the ball hits the head or not

                if((ballPos<head1X)|| ballPos>(head1Width+head1X)){
                    storeWin(head2Name,score);
                }
            }
            // now checking for head2
            else if((ballY + ballDia)>=(windowHeight-head2Hight)){
                ballSpeedY=-ballSpeedY;
                score++;
                //  now checking for if  ball hits the head or not
                if((ballPos <head2X)|| ballPos>(head2Width+head2X)){
                    storeWin(head1Name,score);
                }
            }





        },10)


    }
};


