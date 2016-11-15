import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBox from './SearchBox.jsx';
import MovieTable from './MovieTable.jsx';
import AppBarExampleIcon from './AppBar.jsx';
import $ from 'jquery';
require("../../node_modules/flexboxgrid/css/flexboxgrid.min.css");

var injectTapEventPlugin = require("react-tap-event-plugin");

var MovieBox =React.createClass({
	loadDataFromServer: function(title){
		$.ajax({
			type:'GET',
			url:'http://www.omdbapi.com/?s='+title,
			success:function(data)
			{
				if(data.Response==='True')
				{
					this.setState({data:data['Search']});
					this.setState({titles:['Poster','Title','Year','Type']});
				}
				else
				{
					this.setState({data:[]});
					this.setState({titles:[]})
					alert("No Movie Exists with this Name");
				}

			}.bind(this),
			error:function()
			{

			}
		})
	},
	handleFormSubmit:function(title){
		this.loadDataFromServer(title);
	},
	getInitialState: function(){
		return({data:[],titles:[]});
	},
	render:function(){
		return(<div>
			<MuiThemeProvider>
			<div>
			<AppBarExampleIcon />


			<div className="container">
			<div className="row">
			<div className="col-md-8 col-lg-8">
			<div className="box">
			<SearchBox onFormSubmit={this.handleFormSubmit}/>
			</div>
			</div>
			
			</div>
			<div className="row">
			<div className="col-md-10 col-lg-10 col-xs-12">
			
			<MovieTable movies={this.state.data} columnTitles={this.state.titles}/>
			</div>
			</div>
			</div>

			</div>
			</MuiThemeProvider>
			</div>
			);
	}
});
injectTapEventPlugin();

ReactDOM.render(<MovieBox />,document.getElementById('app'));
