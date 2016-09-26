import React from 'react';

var Img =React.createClass({

render:function(){
	return(
						<div style={{background:'url('+this.props.poster+') top center no-repeat',height:'340px',width:'initial'}}></div>
	);
}
});
module.exports=Img;


