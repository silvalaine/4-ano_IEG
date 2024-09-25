//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
function initAct(){
if (tiAval){parent.iniciaActividade()}if ((tiTime) && (tiButtonTime)){paintButtonTime();}
document.addEventListener("touchstart", touchHandler, true);document.addEventListener("touchmove", touchHandler, true);document.addEventListener("touchend", touchHandler, true);document.addEventListener("touchcancel", touchHandler, true);
paintGame();cp=cp_pal;
$("#buttonOk").attr("tabindex","0");$("#buttonOk").keydown(function(e){if (e.which!=9){isCorrect();}});$("#buttonOk").focus(function(e){removeOk();});$("#buttonOk").blur(function(e){paintOk();});
$(".bg").attr("tabindex","0");$(".bg").keydown(function(e){if (e.which!=9 && e.which!=37 && e.which!=39){$(this).trigger("click");$(".bg_sol").attr("tabindex","0");}; if (e.which==37){$(this).prev().focus();}; if (e.which==39){$(this).next().focus();}});
$(".bg_sol").keydown(function(e){if (e.which!=9){$(this).trigger("click");}});$(".bg").focus(function(e){$(this).trigger("mouseover");});$(".bg").blur(function(e){$(this).trigger("mouseleave");});
$("#imalat").keydown(function(e){if (e.which!=9){$(this).trigger("click");}});
}
function touchHandler(event) {var touch = event.changedTouches[0];var simulatedEvent = document.createEvent("MouseEvent");simulatedEvent.initMouseEvent({touchstart: "mousedown",touchmove: "mousemove",touchend: "mouseup"}[event.type], true, true, window, 1,
touch.screenX, touch.screenY,touch.clientX, touch.clientY, false,false, false, false, 0, null);touch.target.dispatchEvent(simulatedEvent);event.preventDefault();};
function randomSort(){
var let=[];for (i=0; i<cp_pal.length;i++){for (z=0; z<cp_num[i];z++){let.push(ConstruPalWords(cp_pal[i]).charAt(z));}}let=shuffle(let);letters=let;
}
function paintGame(){lettersId=[];lettersX=[];lettersY=[];lettersAns=[];answers=[];var posY=0;
var posX=0; for (i=0; i<letters.length; i++) {var iDiv=document.createElement("div");iDiv.id="b_"+String(i);iDiv.className="bg";iDiv.append(letters[i]);$("#ardoraAct").append(iDiv);$(iDiv).css("position", "absolute");$(iDiv).css("left",posX);$(iDiv).css("margin-top",posY);lettersId.push(i);lettersX.push(posX);lettersY.push(posY);posX=posX+$(iDiv).outerWidth()+2;
if (posX>1000-$(iDiv).outerWidth()-2){posX=0;posY=posY+$(iDiv).outerHeight()+2;}$(iDiv).on("touchstart click", function() {if ($(this).hasClass("bg")) {$(this).addClass("bg_sol");
$(this).animate({marginTop: String(400-$(this).outerHeight()-2)+"px",left: String(posAns)+"px"}, "slow");posAns=posAns+$(this).outerWidth()+2;$(this).removeClass("bg");answers.push(parseInt($(this).attr("id").substring(2,9)));
} else {$(this).addClass("bg");var index=0;for (i=0; i<lettersId.length;i++){if (lettersId[i]==parseInt($(this).attr("id").substring(2,9))){index=i}}$(this).animate({marginTop: String(lettersY[index])+"px",left: String(lettersX[index])+"px"}, "slow");
var idel=0;for (i=0; i<answers.length;i++){if (answers[i]==parseInt($(this).attr("id").substring(2,9))){idel=i}}answers.splice(idel,1);var posA=0;
for (i=0; i<answers.length;i++){$("#b_" + String(answers[i])).css("left",String(posA)+"px");posA=posA+$("#b_"+String(answers[i])).outerWidth()+2;}posAns=posA;$(this).removeClass("bg_sol");}});}
$(".bg").css("background", "radial-gradient(ellipse at center, " + colorBack + ", " + colorSele+ ")");
$(".bg").hover(function(){$(this).css("background","radial-gradient(ellipse at center, " +colorBack+ ", " +colorButton+")");}, function(){$(this).css("background","radial-gradient(ellipse at center, " +colorBack+ ", " +colorSele+ ")");});
}
function isCorrect(){
var ansWord="";for (i=0;i<answers.length;i++){ansWord=ansWord+$("#b_"+String(answers[i])).text();}var correct=false;
for (i=0;i<cp_pal.length;i++){
if (ConstruPalWords(cp_pal[i]).trim().substring(0,cp_num[i])==ansWord){
correct=true;
}
}
if (correct) {score=score+scoreInc;timeAct = timeAct + timeBon;successes++;indexGame++;if (indexGame > cp_pal.length) {$("#ardoraActCanvas").attr("aria-label",messageOk);showMessage("Ok");$("#buttonOk").remove();} else {for (i=0;i<answers.length;i++){$("#b_" + String(answers[i])).remove();}posAns=0;answers=[];}
} else {attempts++;score=score-scoreDec;if (tiAttempts) {if (attempts > attemptsMax) {$("#ardoraActCanvas").attr("aria-label",messageAttempts);showMessage("Attempts");} else {$("#ardoraActCanvas").attr("aria-label", messageError);showMessage("Error");}} else {$("#ardoraActCanvas").attr("aria-label", messageError);showMessage("Error");}}
}
function goTime(){clearInterval(timeInterval);showMessage("Time");}
function showSol(oldTypeGame){ 
}
function paintBack(){}
function ConstruPalWords(input) {return decodeURIComponent(escape(window.atob( input )));}
Array.prototype.in_array=function(){ for(var j in this){ if(this[j]==arguments[0]){return true;}}return false;}
function shuffle(array){var i=array.length,j,temp;if (i==0) return array;while (--i) {j=Math.floor( Math.random()*(i+1));temp=array[i];array[i]=array[j];array[j]=temp;}return array;}
