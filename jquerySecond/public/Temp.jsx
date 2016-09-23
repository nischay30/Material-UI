import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';


var Temp=React.createClass({
	render:function(){
		var players=this.props.playersData.map(function(player,index){
			return(
				<div key={index}>
				<ListItem
				value={1}
				key={player.id}
				primaryText={player.name}
				leftAvatar={<Avatar src={'./images/'+player.medal+'.jpg'}/>}
				nestedItems={[
					<ListItem
					key={player.gender+"gender"}
					value={2}
					primaryText={"Gender:"+player.gender}
					/>,
					<ListItem
					key={player.age+"age"}
					value={3}
					primaryText={"Age:"+player.age}
					/>,
					<ListItem
					key={player.sport+"sport"}
					value={4}
					primaryText={"Sport:"+player.sport}
					/>,

					]}
					/>
					</div>
					);

		}.bind(this));

		return(	
			<div>
			{players}
			</div>
			);
	}

});

module.exports=Temp;