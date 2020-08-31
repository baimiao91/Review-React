import React, {
  PureComponent
} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';

import EightteenChildFour from './components/childOne';

import './App.css';

class App extends PureComponent {

    constructor(props) {
			super(props);
			this.state={}
    }
  
  // 钩子获取实例
  componentDidMount(){
		// const { ReactDOM } from 'react';
    console.log('eightteenChildFive的Ref值为')
      // 获取的 ref 里面包括整个组件实例,同样可以拿到子组件的实例
		console.log(ReactDOM.findDOMNode(this.eightteenChildFiveRef2).offsetTop, 'div实例')
		let corp = {};
		corp.list = [];
		corp.on = function(fn) {
			this.list.push(fn)
		}
		corp.emit = function(){
			this.list.forEach(cb => {
				cb.apply(this, arguments)
			})
		}
		corp.on(function(position, money){
			console.log('你的职位是:'+position);
			console.log('期望薪资:'+money);
		})
		corp.on(function(skill, hobby) {
			console.log('你的技能有:'+skill);
			console.log('爱好:'+hobby);
		});
		corp.emit('前端', 10000);
		corp.emit('端茶倒水', '台球');
		/** 
		 * 你的职位是:前端
		 * 期望薪资:10000
		 * 你的技能有:前端
		 * 爱好:10000
		 * 你的职位是:端茶倒水
		 * 期望薪资:台球
		 * 你的技能有:端茶倒水
		 * 爱好:台球
		 * **/
		console.log('分割线------------分割线')
		let cloneCorp = {};
		cloneCorp.list = {};
		cloneCorp.on = function(key, fn) {
			if( !this.list[key] ) {
				this.list[key] = [];
			}
			this.list[key].push(fn);
		}
		cloneCorp.emit = function(){
			// 第一个参数是对应的key值
			// 直接用数组的shift方法取出
			let key = [].shift.call(arguments),
				fns = this.list[key];
			// 如果缓存列表里没有函数就返回false
			if (!fns || fns.length === 0) {
				return false;
			}
			// 遍历key值对应的缓存列表
			// 依次执行函数的方法
			fns.forEach(fn => {
				fn.apply(this, arguments);
			});
		}
		cloneCorp.on('join', (position, money) => {
			console.log('你的职位是：' + position);
			console.log('期望薪水：' + money);
		})
		cloneCorp.on('skill', (skill, hobby) => {
			console.log('你的技能有:' + skill);
			console.log('爱好:' + hobby);
		});
		cloneCorp.emit('join', '前端', 10000);
		cloneCorp.emit('join', '后端', 10000);
		cloneCorp.emit('skill', '端茶倒水', '台球');
  }

  // 组件定义 ref 属性
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <EightteenChildFour ref={(ref)=>{this.eightteenChildFiveRef = ref}}></EightteenChildFour>
        <div ref={(ref)=>{this.eightteenChildFiveRef2 = ref}} style={{position:'fixed',bottom:0,right:0, left:0, textAlign: 'center'}}>你是谁</div>
      </div>
    )
  }

}



export default App;
