var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var fire = new Array();
var rint = 100;

$(document).ready(function(){
	setTimeout(function(){
		$('body').addClass('loaded');
		$('h1').css('color','#222222');
		$('header').css('z-index','0');
	}, 12000);
	
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
	$('#container').width(WIDTH).height(HEIGHT);
	canvas = document.getElementById('canvas');
	$(canvas).attr('width', WIDTH).attr('height',HEIGHT);
	con = canvas.getContext('2d');
	for(var i = 0; i < 80; i++) {
		fire[i] = new Circle();
		fire[i].reset();
	}
	setInterval(draw,rint);
	//setInterval(draw,rint2);

});

function draw() {
	con.clearRect(0,0,WIDTH,HEIGHT);
	if(runAnimation.value){
		for(var i = 0; i < fire.length; i++) {
		fire[i].fade();
		fire[i].move();
		fire[i].draw();
		}  // for statement finish
	}  // if statement finish


	else if (!runAnimation.value){
		for(var i = 0; i < fire.length; i++)
		 {
		   fire[i].fade();
		   //fire[i].move();
		   fire[i].draw();
			 
			
		  // console.log(fire[i].x);

		 } 

		
	}
}



function Circle() {
	// ttl = time to live (blink time period)
	this.s = {ttl:8000, xmax:5, ymax:2, rmax:15, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

	this.reset = function(m) {
		this.x = (this.s.random ? WIDTH*Math.random() : this.s.xdef);
		this.y = (this.s.random ? HEIGHT*Math.random() : this.s.ydef);
		this.r = ((this.s.rmax-1)*Math.random()) + 1;                   // radius
		this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
		this.hl = (this.s.ttl/rint)*(this.r/this.s.rmax);
		this.rt = Math.random()*this.hl;                           //rotation
		this.s.rt = Math.random()+1;
		this.stop = Math.random()*.2+.4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);  //drift in x-y 
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		
		
	}
	
	//functon to fade the circles

	this.fade = function() {
		this.rt += this.s.rt;
	}

	this.draw = function() {
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.hl) this.reset();
		var newo = 1-(this.rt/this.hl);
		con.beginPath();
		con.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		con.closePath();
		var cr = this.r*newo;
		g = con.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
		g.addColorStop(0.0, 'rgba(255,187,0,'+newo+')');
		g.addColorStop(this.stop, 'rgba(255,187,0,'+(newo*.2)+')');
		g.addColorStop(1.0, 'rgba(255,187,0,0)');
		con.fillStyle = g;
		con.fill();

	
	}

	this.move = function() {
		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
		if(this.x > WIDTH || this.x < 0) this.dx *= -1;
		if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
	}

	this.getX = function() { return this.x; }
	this.getY = function() { return this.y; }
}

/*
       * define the runAnimation boolean as an obect
       * so that it can be modified by reference
       */
      var runAnimation = {
        value: true
      };

      // add click listener to canvas
      document.getElementById('canvas').addEventListener('click', function() {
        // flip flag
        runAnimation.value = !runAnimation.value;

        
      });



$('#canvas').click(function(e)
				   {
    var x = e.clientX
       , y = e.clientY          
    if(Math.pow(x-5,2)+Math.pow(y-2,2) < Math.pow(5,2))   
		
		console.log(x,y);
})


/*	$('#canvas').click(function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;

    //console.log(clickedX,clickedY);
    
    for (var i = 0; i < fire.length; i++) {
        if (clickedX < fire[i].Circle.s.x && clickedX > fire[i].left && clickedY > Circle[i].top && clickedY < Circle[i].bottom) {
            alert ('clicked number ' + (i + 1));

            console.log(fire[i].Circle.s.x );

        }
    }
});*/
      
