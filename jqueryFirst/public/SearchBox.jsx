import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

var SearchBox = React.createClass({
	getInitialState: function(){
		return({title:''});
	},
	handleChange: function(event)
	{
		this.setState({title: event.target.value});
	},
	handleSubmit:function(event)
	{	
		event.preventDefault();
		this.props.onFormSubmit(this.state.title);
		this.setState({title:''})
	},
	render:function()
	{
		return(
			<form>
			<TextField floatingLabelText='Movie Name' style={{marginLeft:"20%",width:'300px'}} required value={this.state.title} onChange={this.handleChange} />
			{' '}
			<RaisedButton label='Search' type='submit' primary={true} onClick={this.handleSubmit} /> 
			</form>
			);
	}
});
module.exports=SearchBox;