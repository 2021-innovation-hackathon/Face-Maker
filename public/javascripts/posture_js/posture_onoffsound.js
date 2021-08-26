
function audiocontrol(audio, onoff){
    if(onoff){
        audio.play();
    }
}

function soundon(){
	onoff = true;
}

function soundoff(){
	onoff = false;
}

function onoffsound(){
	count++
	$("p").toggle();

	if (count % 2 == 1){
		soundon();
	}
	else{
		soundoff();
	}
	
}