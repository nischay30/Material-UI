import React from 'react';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

var SearchBox = React.createClass({
	getInitialState:function()
	{
		return({countryName:''});
	},
	handleChange:function(event)
	{
		this.props.onSearch(event.target.value);
		this.setState({countryName:event.target.value});
	},
	handleCross:function(){
		this.setState({countryName:''});
		this.props.onSearch('');
	},
		render:function()
		{
			return(<div className='center-xs'>
				<div className="col-xs-12 col-md-12">
				<div className="box">
				<form>
				<TextField floatingLabelText='Country Name'
				hintText='Enter Country Name'
				required 
				value={this.state.countryName}
				style={{fontSize:'20px'}} 
				onChange={this.handleChange}/><NavigationClose onTouchTap={this.handleCross}/>
				</form>
				</div>
				</div>
				</div>
				);
		}
	});
module.exports=SearchBox;