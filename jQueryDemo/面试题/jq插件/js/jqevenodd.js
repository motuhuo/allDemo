(function($){
			$.fn.rowAct=function(ops){
				this.ops=ops||{};
				init.call(this);
				actRow.call(this);
			}
			function init(){
				this.find("li:even").addClass('evenRow')
				this.find('li:odd').addClass('oddRow');
			}
			function actRow(){
				var $this=this;
				$this.find('li').on('mouseover',function(){
					pic=$(this).attr('class');
					// $(this).class='';
					$(this).addClass('actRow')
					console.log(pic)
					
				});
				$this.find('li').on('mouseout',function(){
					$(this).className='';
					$(this).addClass(pic)
					
					
				})

			}

		})(jQuery);
