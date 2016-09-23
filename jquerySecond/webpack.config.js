var path = require("path");
module.exports = {
	entry:'./public/Main.jsx',
	output : {
		path: './public',
		filename: "bundle.js"
	},
	module:{
		loaders:[
		{
			test: /\.jsx/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react','stage-1']
			} 
		},
		{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	}
};