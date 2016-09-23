require("../node_modules/flexboxgrid/css/flexboxgrid.min.css");

import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBarExampleIcon from './AppBar.jsx';
import SearchBox from './SearchBox.jsx';
import CountryList from './CountryList.jsx';
import AddCountryButton from './AddCountryButton.jsx';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

var injectTapEventPlugin = require("react-tap-event-plugin");

var Main=React.createClass({

	loadDataFromServer :function(text,counter) 
	{
		$.ajax({
			url      : "http://localhost:3000/countries/?countryName_like=^"+text+"&_start=" +counter+ "&_limit=10",
			dataType : 'json',
			type     : 'GET',
			success: (data,status,res) => {
				this.setState({data: data, totalLength: res.getResponseHeader('X-Total-Count')});
				this.setState({counter:counter});
			},	
			error: (xhr, status, err) => {
				console.error(status, err.toString());
			}
		});
	},
	componentDidMount:function()
	{
		this.setState({flagPrevious:true});
		this.loadDataFromServer('',0);
	},
	getInitialState:function()
	{
		return({country:[],data:[],countryName:'',totalLength:0,counter:0,flagPrevious:false,flagNext:false});
	},
	handleSearch:function(searchedData)
	{
		this.setState({countryName:searchedData,counter:0});
		this.loadDataFromServer(searchedData,0);
	},
	handleDelete:function(id)
	{
		$.ajax({
			type:'DELETE',
			url:'http://localhost:3000/countries/'+id,
			success:function(data,response)
			{
				this.loadDataFromServer('',this.state.counter);
			}.bind(this),
			error:function()
			{
				alert("Error Happen");
			}
		});
	},
	handleAdd :function(dataToBeAdded)
	{

		$.ajax({
			type:'POST',
			data:dataToBeAdded,
			url:'http://localhost:3000/countries',
			success:function(country)
			{
				let newData=this.state.data;
				newData.push(country);
				this.setState({data:newData});	
			}.bind(this),
			error:function()
			{
				alert("Error Happen");
			}
		})
	},
	handleUpdate:function(dataToBeUpdated,id){
		$.ajax({
			type:'PUT',
			dataType:'JSON',
			data:dataToBeUpdated,
			url:'http://localhost:3000/countries/'+id,
			success:function (response) {
				this.loadDataFromServer('',this.state.counter);
			}.bind(this),
			error:function (response) {
				console.error(response);
			},
		});
	},
	handlePrevious:function()
	{	if(this.state.counter==10)
		this.setState({flagPrevious:true});
		
		this.setState({flagNext:false});
		this.loadDataFromServer('',this.state.counter-10);	
	},
	handleNext:function()
	{

		if(this.state.counter+20 >= this.state.totalLength)
			this.setState({flagNext:true});

		this.setState({flagPrevious:false});
		this.loadDataFromServer('',this.state.counter+10);
	},
	render:function()
	{
		return(
			<MuiThemeProvider>
			<div>

			<AppBarExampleIcon />
			<SearchBox url={'http://localhost:3000/countries/?q='} onSearch={this.handleSearch}/>
			<AddCountryButton add={this.handleAdd}/>
			<CountryList data={this.state.data} delete={this.handleDelete} edit={this.handleUpdate} />
			<div className='center-xs'>
			<RaisedButton label="Prev" secondary={true} 
			onTouchTap={this.handlePrevious} 
			disabled={this.state.flagPrevious}
			/>
			
			<RaisedButton label="Next" primary={true} 
			style={{right:'20px',bottom:'20px'}} 
			onTouchTap={this.handleNext} 
			disabled={this.state.flagNext}
			/>
			</div>
			</div>
			</MuiThemeProvider>
			
			);
	}
});
injectTapEventPlugin();

ReactDOM.render(<Main />,document.getElementById('app'));
