import $ from 'jquery';
import React, {Component, PropTypes} from 'react';

import Temp from './Temp.jsx';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FormDialog from './FormDialog.jsx';


var deleteCountryId='';
var editCountryId='';
var countryAbv='';
class CountryList extends React.Component {
  state = {
    playersData:[],
    playerOpen:false,
    open: false,
    openEdit:false,
    doneEdit:false,
    countryName:'',
    countryabv:'',
    goldMedals:'',
    silverMedals:'',
    bronzeMedals:'',
   titlePlayerDialog:''
  };

  // Delete Functions
  handleDeleteOpen=() => {
    this.setState({open: true});
  };

  handleDeleteClose =() => {
    this.setState({open: false});
  };
  handleDeleteDialog =(countryid)=>
  {
    deleteCountryId=countryid;
    this.handleDeleteOpen();
  };
  handleDelete =() =>
  {
    this.handleDeleteClose();
    this.props.delete(deleteCountryId);
  };

  handleResetState =() =>
  {
    this.setState({countryName:'',goldMedals:'',silverMedals:'',bronzeMedals:''});
  };


  //Edit Functions
  handleEditOpen = (country) => {
    editCountryId=country.id;
    countryAbv=country.countryabv;
    this.setState({countryName:country.countryName,
      goldMedals:country.gold,
      silverMedals:country.silver,
      bronzeMedals:country.bronze,
      openEdit:true
    });
  };

  handleEditClose = () => {
    this.setState({openEdit: false});
    this.handleResetState();
  };

  handleEditSubmit =(event) => {
    let finalData={
      countryName:this.state.countryName,
      countryabv:countryAbv,
      gold:this.state.goldMedals,
      silver:this.state.silverMedals,
      bronze:this.state.bronzeMedals
    }
    event.preventDefault();
    this.handleResetState();
    this.handleEditClose();
    this.props.edit(finalData,editCountryId);
    this.setState({doneEdit:true});
  };

  handleCountryName = (event) =>{
    this.setState({countryName:event.target.value});
  };

  handleGoldMedals = (event) =>{
    this.setState({goldMedals:event.target.value});
  };
  
  handleSilverMedals = (event) =>{
    this.setState({silverMedals:event.target.value});
  };

  handleBronzeMedals = (event) =>
  {
    this.setState({bronzeMedals:event.target.value});
  };
  
  handleDoneEdit =()=>
  {
    this.setState({doneEdit:false});
  };

  handlePlayerList =(countryName) =>{
    this.setState({playerOpen:true});
   this.setState({titlePlayerDialog:countryName});
    $.ajax({
      url      : "http://localhost:3000/players/?countryName="+countryName,
      dataType : 'json',
      type     : 'GET',
      success: (data,status,res) => {
        this.setState({playersData:data});
      },  
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  };
  handlePlayerClose= () =>{
      this.setState({playerOpen:false});
  };

  render()
  {
   var a=this.props.data.map(function(country,index){
    if(country.countryabv==country.countryabv.toLowerCase())
    {
      return(
        <div key={index}>
        <ListItem
        value={1}
        key={country.id}
        primaryText={country.countryName}
        leftAvatar={<FontIcon>{country.countryabv.toUpperCase()}</FontIcon>}
        rightIcon={<div>
         <ActionDelete onTouchTap={this.handleDeleteDialog.bind(null,country.id)}/>
         <ModeEdit onTouchTap={this.handleEditOpen.bind(null,country)}/>
         </div>}/>
         <hr />
         </div>
         );
    }
    else
    {
      return(
        <div key={index}>
        <ListItem
        value={1}
        key={country.id}
        primaryText={country.countryName}
        leftAvatar={<Avatar src={'../json/png250px/'+country.countryabv.toLowerCase()+'.png'} onTouchTap={this.handlePlayerList.bind(null,country.countryName)}
        />}
        rightIcon={<div>
         <ActionDelete onTouchTap={this.handleDeleteDialog.bind(null,country.id)}/>
         <ModeEdit hoverColor="blue" onTouchTap={this.handleEditOpen.bind(null,country)} /> 

         </div>}>
         </ListItem>
         <hr />
         </div>
         );
    };
  }.bind(this));

   return (<List>
    <Subheader>Countries</Subheader>
    {a}
    <Dialog
    title={"Update Information"}
    modal={false}
    open={this.state.openEdit}
    >
    <FormDialog countryName={this.state.countryName} goldMedals={this.state.goldMedals}
    silverMedals={this.state.silverMedals} bronzeMedals={this.state.bronzeMedals} 
    handleCountryName={this.handleCountryName} handleGoldMedals={this.handleGoldMedals}
    handleSilverMedals={this.handleSilverMedals} handleBronzeMedals={this.handleBronzeMedals}
    handleClose={this.handleEditClose} handleSubmit={this.handleEditSubmit}
    />
    </Dialog>


    <Dialog
    title={"Updated"}
    modal={false}
    open={this.state.doneEdit}
    >
    <FlatButton
    label="Ok"
    primary={true}
    onTouchTap={this.handleDoneEdit}/>
    
    </Dialog>
    

    <Dialog
    title={this.state.titlePlayerDialog}
    modal={false}
    open={this.state.playerOpen}
    autoScrollBodyContent={true}
    contentStyle={{width:'100%'}}
    actions={<FlatButton label={"Close"} onTouchTap={this.handlePlayerClose} primary={true}/>}
  >
  <List>
  <Subheader>Players </Subheader>
  <Temp playersData={this.state.playersData} />
</List>
  </Dialog>


  <Dialog
  title=" Are You Sure Want To Delete?"
  modal={false}
  open={this.state.open}>
  <div className='center-xs'>
  <div className="col-xs-4 col-md-4">
  <FlatButton
  label="No"
  primary={true}
  onTouchTap={this.handleDeleteClose}/>
  </div>
  <div className="col-xs-4 col-md-4">
  <FlatButton
  label="Yes"
  secondary={true}
  onTouchTap={this.handleDelete}/>
  </div>
  </div>
  </Dialog>
  </List>);
 }
};

module.exports=CountryList;