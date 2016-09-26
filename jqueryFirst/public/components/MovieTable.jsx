import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Img from './Img.jsx';

var MovieTable =React.createClass({
	render:function(){

		var rows=this.props.movies.map(function(data){
			if(data.Poster=='N/A')
			{
				return(
				<TableRow key={data.imdbID}>
				<TableRowColumn><img src={data.Poster} alt='Image Not Available'/></TableRowColumn>
				<TableRowColumn style={{fontSize:'20px',textAlign:'center'}}>{data.Title}</TableRowColumn>
				<TableRowColumn style={{fontSize:'20px',textAlign:'center'}}>{data.Year}</TableRowColumn>
				<TableRowColumn style={{fontSize:'20px',textAlign:'center'}}>{data.Type}</TableRowColumn>
				</TableRow>
				);
		}
			else
			{
				return(
				<TableRow key={data.imdbID}>
				<TableRowColumn style={{padding: 0}}><Img poster={data.Poster} /></TableRowColumn>
				<TableRowColumn style={{fontSize:'20px',textAlign:'center'}}>{data.Title}</TableRowColumn>
				<TableRowColumn style={{fontSize:'20px',textAlign:'center'}}>{data.Year}</TableRowColumn>
				<TableRowColumn style={{fontSize:'20px',textAlign:'center'}}>{data.Type}</TableRowColumn>
				</TableRow>
				);
			}
		}.bind(this));
		var table=null;
		if(this.props.movies.length!=0)
		{
			return(<Table>
			<TableHeader>
			<TableRow>
			<TableHeaderColumn style={{fontSize:'30px',textAlign:'center'}}>{this.props.columnTitles[0]}</TableHeaderColumn>
			<TableHeaderColumn style={{fontSize:'30px',textAlign:'center'}}>{this.props.columnTitles[1]}</TableHeaderColumn>
			<TableHeaderColumn style={{fontSize:'30px',textAlign:'center'}}>{this.props.columnTitles[2]}</TableHeaderColumn>
			<TableHeaderColumn style={{fontSize:'30px',textAlign:'center'}}>{this.props.columnTitles[3]}</TableHeaderColumn>
			</TableRow>
			</TableHeader>
			<TableBody showRowHover={true}>
			{rows}
			</TableBody>
			</Table>);

		}
		else
		{
			return(<Table />)
		}
	}
});

module.exports=MovieTable;



