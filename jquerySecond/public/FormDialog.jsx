import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


var FormDialog=React.createClass({
	render:function()
	{
		return(
			<form onSubmit={this.props.handleSubmit}>
			<div className='row'>
			<div className="col-xs-12 col-md-12">
			<div className="box">
			<TextField floatingLabelText='Country Name'  
			hintText='Only Alphabets'
			required
			fullWidth={true} 
			pattern="^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"
			value={this.props.countryName}
			onChange={this.props.handleCountryName}/>
			</div>
			</div>
			</div>

			<div className='row'>
			<div className="col-xs-12 col-md-12">
			<div className="box">
			<TextField floatingLabelText='Gold Medals'required 
			hintText='Only Numerics'
			min='1'
			max='50'
			fullWidth={true} 
			type='number'
			value={this.props.goldMedals} 
			onChange={this.props.handleGoldMedals}/>
			</div>
			</div>
			</div>

			<div className='row'>
			<div className="col-xs-12 col-md-12">
			<div className="box">
			<TextField floatingLabelText='Silver Medals'
			hintText='Only Numerics'
			min='1'
			max='50'
			required
			fullWidth={true}
			type='number'
			value={this.props.silverMedals} 
			onChange={this.props.handleSilverMedals}/>
			</div>
			</div>
			</div>

			<div className='row'>
			<div className="col-xs-12 col-md-12">
			<div className="box">
			<TextField floatingLabelText='Bronze Medals' 
			hintText='Only Numerics'
			min='1'
			max='50'

			required
			fullWidth={true} 
			type='number'
			value={this.props.bronzeMedals} 
			onChange={this.props.handleBronzeMedals}/>
			</div>
			</div>
			</div>

			<div className='center-xs'>

			<div className="col-xs-offset-1 col-md-offset-1">
			<RaisedButton  label="Close" secondary={true} style={{margin:'8dp',height:'36dp',minWidth:'64dp'}} onTouchTap={this.props.handleClose} />
			<RaisedButton type='submit' label="Submit" style={{margin:'8dp',height:'36dp',minWidth:'64dp'}} primary={true}/>
			</div>

			</div>
			
			</form>
			);
	}

});
module.exports=FormDialog;
