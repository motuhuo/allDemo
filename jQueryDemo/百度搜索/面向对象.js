//继承的方法;

Function.prototype.extend=function(extend,mJson)
{	
	for (var attr in extend.prototype)
	{	
		this.prototype[attr]=extend.prototype[attr];
	}
	for( var attr in mJson ){
		this.prototype[attr] = mJson[attr];
	};
}
//所有function 都具有继承

Son.extend(Father,{	
	//Son.的方法：函数;
})
function Father( name , age )
{
	this.name = name;
	this.age = age;
}
		
Father.prototype = 
{
	showAge : function(){
		alert( this.age );
	},
	showName:function(){
		alert( this.name );
	},
	sex : '男'
};

var p1 = new Father('小头爸爸',30);

function Son(name,age,height){  //继承属性，不能省;
	Father.call( this , name , age );
	this.height = height;
};

Son.extend( Father , {   //继承方法，添加新方法.
	showHeight : function(){
		alert( this.height )
	},
});

var p2 = new Son( '大头儿子' , '6' , '1m' );
p2.showHeight();

function Mother( name , age ){
	Father.call( this , name , age );
}
Mother.extend( Father , {       //继承方法，添加新方法，不用再写prototype;
	cook : function(){
		alert( this.name + '正在做饭' );
	}
} )

var p3 = new Mother( '围裙妈妈' , 29 );
p3.cook();