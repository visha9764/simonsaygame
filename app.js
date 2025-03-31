let game_sequence=[];
let user_sequence=[];
let body=document.querySelector("body");
const clicksound=new Audio('click.wav');
const oversound=new Audio('gameover.wav');
clicksound.volume=0.2;
clicksound.load();
let h2=document.querySelector("h2");
let started=false;
let level=0;
let temp=level;
let btns=["yellow","pink","blue","red"];
document.addEventListener("keypress",()=>{

    if(started==false){

        started=true;
        levelup();
    }
})

function levelup(){
    user_sequence=[];
    level++;
    temp=level;
    h2.innerText="Level "+level;
    let index=Math.floor(Math.random()*3);
    let color=btns[index];
    let button=document.querySelector(`.${color}`);
    game_sequence.push(color);

    btnflash(button);
}
function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },200);
}
let allBtns=document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener('click',()=>{
        clicksound.currentTime=0;
        clicksound.play();
    })
    btn.addEventListener("click",btnpress);
}
function check(index){
    
    if(user_sequence[index]===game_sequence[index]){
        if(user_sequence.length==game_sequence.length){
            setTimeout(levelup,1000);
            
        }
    }
    else{
        body.classList.add("end");
        setTimeout(()=>{
            body.classList.remove("end");
        },2000);
        oversound.currentTime=0;
        oversound.play();
        h2.innerHTML=`Game Over! Your score was ${temp}<br> Press any key to start again`;
        reset();
    }
}
function btnpress(){

    let btn=this;
    let usercolor=btn.getAttribute("id");
    userbtnflash(btn);
    user_sequence.push(usercolor);
    
    check(user_sequence.length-1);
}
function userbtnflash(btn){
    btn.classList.add("green");
    setTimeout(()=>{
        btn.classList.remove("green");
    },100);
}

function reset(){
    started=false;
    game_sequence=[];
    user_sequence=[];
    level=0;
}


