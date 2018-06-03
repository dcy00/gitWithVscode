(function () {                  //实现私有作用域，最好的办法就是使用闭包。可以把插件当做一个函数，插件内部的变量即
	//函数的私有变量，为了在调用插件后依旧能使用其功能，闭包的作用就是延长函数(插件)内部变量的生命周期，使得插件函数
	//可以重复调用，而不影响用户自身作用域。
	//故需将插件的所有功能写在一个立即执行函数中：

	var options = {             //插件默认参数
		//插件的主要功能可以总结至几个关键参数，通过这几个关键参数即可修改插件的主要功能，也是第三步API设置的关键参数。
        //将默认参数放置在全局函数的最前面，参数变量名为options,通过对象字面量进行赋值：
		splitter: 'char'
	}
	//helper
	var getRandomColor = function(){
	  return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
	}

	function injector(t, splitter) {
		var text = t.textContent,    //textContent 属性设置或返回指定节点的文本内容，以及它的所有后代。
			//a = text.split(splitter),
			a,
			after,
			inject = '';
		if(splitter === 'char') {
			a = text.split('');    //split() 方法用于把一个字符串分割成字符串数组。
			after = '';
		}
		else if (splitter === 'word') {
			a = text.split(' ');
			after = ' ';
		}
		else if (splitter === 'line') {
			var r = t.innerHTML;   //innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML。
			var e = document.createElement('div');  //createElement() 方法可创建元素节点。此方法可返回一个 Element 对象。
			r = r.replace(/<br>/ig, 'eefec303079ad17405c889e092e105b0');   //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
			e.innerHTML = r;
			text = e.textContent;
			a = text.split('eefec303079ad17405c889e092e105b0');
			after = '';
			e = null;//free storge
		}


		if (a.length) {
			for(var i = 0; i < a.length; i++) {
				var font_color = getRandomColor();
				inject += '<span style="color:'+font_color+'">' + a[i] + '</span>' + after;
			}
			t.setAttribute('aria-label', text);
			t.innerHTML = inject;
		}
	}
	//API
	var api = {
		config: function (opts) {
			if(!opts) return options;
			for(var key in opts) {
				options[key] = opts[key];
			}
			return this;
		},

		listen: function listen(elem) {
			if (typeof elem === 'string') {
				var elems = document.querySelectorAll(elem),
					i = elems.length;
					while (i--) {
						listen(elems[i]);
					}
					return
			}
			injector(elem, options.splitter);

			return this;
		}
	}
	this.ColorDivide = api;
})();