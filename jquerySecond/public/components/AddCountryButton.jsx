import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FormDialog from './FormDialog.jsx';

const style = {
	bottom:'25px',
	right:'40px',
	position:'fixed'
};

class AddCountryButton extends React.Component {
	state = {
		open: false,
		countryName:'',
		goldMedals:'',
		silverMedals:'',
		bronzeMedals:''
	};

	handleResetState =() =>
	{
		this.setState({countryName:'',goldMedals:'',silverMedals:'',bronzeMedals:''});
	};

	handleOpen = () => {
		console.log("hey");
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
		this.handleResetState();
	};

	handleSubmit =(event) => {
		let finalData={
			countryName:this.state.countryName,
			countryabv:this.state.countryName.toLowerCase().substring(0,2),
			goldMedals:this.state.goldMedals,
			silverMedals:this.state.silverMedals,
			bronzeMedals:this.state.bronzeMedals
		}
		event.preventDefault();
		this.handleResetState();
		this.handleClose();
		this.props.add(finalData);
	};

	handleCountryName = (event) =>{
		this.setState({countryName:event.target.value});
		    console.log(":Event"+event.target.value);
    console.log(this.state.countryName);

	};

	handleGoldMedals = (event) =>{
		this.setState({goldMedals:event.target.value});
	};
	
	handleSilverMedals = (event) =>{
		this.setState({silverMedals:event.target.value});
	};

	handleBronzeMedals = (event) =>{
		this.setState({bronzeMedals:event.target.value});
	};
	
	render() {
		return (
			<div>
			<FloatingActionButton style={style} onTouchTap={this.handleOpen}>
			<ContentAdd />
			<Dialog
			title={"Add Country Information"}
			modal={false}
			open={this.state.open}
			>

			<FormDialog countryName={this.state.countryName} goldMedals={this.state.goldMedals}
			silverMedals={this.state.silverMedals} bronzeMedals={this.state.bronzeMedals} 
			handleCountryName={this.handleCountryName} handleGoldMedals={this.handleGoldMedals}
			handleSilverMedals={this.handleSilverMedals} handleBronzeMedals={this.handleBronzeMedals}
			handleClose={this.handleClose} handleSubmit={this.handleSubmit}
			/>
			</Dialog>

			</FloatingActionButton>
			</div>
			);
	}
}

export default AddCountryButton;