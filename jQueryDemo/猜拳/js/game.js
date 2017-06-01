	
	Function.prototype.extend = function( extend , mJson ){
		for( var attr in extend.prototype ){
			this.prototype[attr] = extend.prototype[attr];
		}
		for( var attr in mJson ){
			this.prototype[attr] = mJson[attr];
		}
	}

	function Player( name ){
		this.name = name;
		this.point = 0; //0拳头 1剪刀 2布
	}
	Player.prototype.guess = function(){}
	
	function User(name){
		Player.call( this , name );
	};
	User.extend( Player , {
		guess : function( point ){
			return this.point = point
		}
	} );
	
	function Comp(name){
		Player.call( this , name );
	};
	
	
	Comp.extend( Player , {
		guess : function( point ){
			//位运算
			return this.point =( Math.random()*100<<2 )%3;
		}
	} );
	
	var user = new User('孙悟空');
	var comp = new Comp('比克大魔王');
	
	function Game( u , c ){
		this.user = u;
		this.comp = c;
		this.inIt();
	}
	Game.prototype.inIt = function(){
		var names = document.getElementsByClassName("name");
		names[0].innerText = '我：'+ this.user.name;
		names[1].innerText = '电脑：'+ this.comp.name;
	}
	Game.prototype.play = function(){
		this.toggleButton();
		this.startAnimate();
	}
	Game.prototype.toggleButton = function(){
		var oBtn = document.getElementById("play");
		if( oBtn.disabled ){
			oBtn.disabled = false;
			oBtn.className = '';
			oBtn.innerHTML = '再玩一次';
		}else{
			oBtn.disabled = true;
			oBtn.className = 'disabled';
		}
		
	}
	Game.prototype.startAnimate = function(){
		document.getElementById("guess").style.display = 'block';
		this.getText('请出拳……');
		var anims = document.getElementsByClassName("anim");
		var cont = 0;
		
		timer = setInterval(function(){
			anims[0].className = 'anim user guess' + (cont++)%3;
			anims[1].className = 'anim comp guess' + (cont++)%3;
		},500);
	}
	Game.prototype.getText = function( massage ){
		document.getElementById("text").innerText = massage;
	}
	Game.prototype.verdict = function( point ){
		clearInterval( timer );
		document.getElementById("guess").style.display = 'none';
		var anims = document.getElementsByClassName("anim");
		var userGuess = user.guess(point);
		var compGuess = comp.guess();
		anims[0].className = 'anim user guess' + userGuess;
		anims[1].className = 'anim comp guess' + compGuess;
		var res = userGuess - compGuess;
		switch( res ){
			case 0:
			this.getText('平局！！！');
			break;
			case -1:
			case 2:
			this.getText('耶~我赢啦！');
			break;
			case 1:
			case -2:
			this.getText('5555555~我输啦！');
			break;
		}
		this.toggleButton();
	}
	
	var game = new Game( user , comp );
