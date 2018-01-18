/**
 *
 * @authors wuzhe (you@example.org)
 * @date    2018-01-17 08:36:49
 * @version $Id$
 */

const path = require('path'),
	  webpack = require('webpack'),

	  //提取js里面的css到单独的css文件里
	  extractTextPlugin = require('extract-text-webpack-plugin'),

	  //清理冗余文件
	  cleanWebpackPlugin = require('clean-webpack-plugin'),

	  //生成html的插件
	  htmlWebpackPlugin = require('html-webpack-plugin');


	  module.exports = {

	  	  //在多页面配置中，将每个页面特有的js文件作为入口
		  entry: {
			  index: './src/js/page/index.js',
			  list: './src/js/page/list.js',
			  about: './src/js/page/about.js'
		  },

		  output: {
			  path: path.resolve(__dirname, 'dist'),

			  //模板、样式、脚本、图片等资源对应的server上的路径
			  publicPath: '/dist/',
			  filename: 'js/[name].js',

			  //未配置在入口的js文件打包后的路径和文件名
			  chunkFilename: 'js/[id].chunk.js',
		  },
		   //追踪错误
		  devtool: 'inline-source-map',
		  devServer: {
		      contentBase: './',
		      hot: true //热启动
		  },
		  module: {

	        rules: [

	        		//抽离css样式
		            {
		                test: /\.css$/,
		                use: extractTextPlugin.extract({
		                	fallback: 'style-loader',
		                	use: 'css-loader'
		                })
		            },
		            /*
		            * 将图片混合到css中
		             *  */
		            {
		                test: /\.(png|jpg|gif|ico)$/,
		                loader:
		                    'url-loader?name=images/[hash:8].[name].[ext]'
		                ,
		                options:{
					   		 publicPath:'../'
						}
		            },
		            //html页面路径自动转换不正确
		            {
		                test: /\.html$/,
		                use: [
		                    'html-loader'
		                ]
		            },

		            //加载字体
		            {
		                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
		                use: [
		                    'file-loader?name=fonts/[hash:8].[name].[ext]'
		                ]
		            },

		            //编译less
		            {
		                test: /\.less$/,
		                loader: extractTextPlugin.extract('css-loader!less-loader')
		            }

    		]
    	},

		  plugins: [

		  	  new cleanWebpackPlugin(['dist']),


		      //全局加载jq
		      new webpack.ProvidePlugin({
		      		$: 'jquery'

		      }),



		      new webpack.optimize.CommonsChunkPlugin({

		      	  //将公共模块提取，生成名为'vendors'的chunk
		          name: 'vendors',

		          //提取哪些模块共有的部分
		          chunks: ['index', 'list', 'about']

		      }),

              //单独使用link标签加载css并设置路径,相对于output配置中的publicPath
	          new extractTextPlugin('css/[name].css'),
		      new htmlWebpackPlugin({
		          favicon: './src/img/favicon.ico',

		          //生成的html存放路径
		          filename: './view/index.html',
		          template: './src/view/index.html',


		          inject: 'body',
		          hash: true,

		          //需要引入的chunk
		          chunks: ['vendors', 'index'],

		          //压缩html文件
		          minify: {
		              removeComments: true, //移除html中的注释

		              collapseWhitespace: false //删除空白符与换行符号
		          }
		      }),

		      new htmlWebpackPlugin({
		          favicon: './src/img/favicon.ico',

		          filename: './view/list.html',

		          template: './src/view/list.html',

		          inject: true,

		          hash: true,

		          chunks: ['vendors', 'list'],

		          minify: {

		          	  removeComments: true,

		          	  collapseWhitespace: false

		          },

		      }),

		      new htmlWebpackPlugin({

		      	  favicon: './src/img/favicon.ico',
		      	  filename: './view/about.html',
		      	  template: './src/view/about.html',
		      	  inject: true,
		      	  hash: true,
		      	  chunks: ['vendors', 'about'],
		      	  minify: {

		      	      removeComments: true,

		      	      collapseWhitespace: false

		      	  }

		      }),

		      new webpack.NamedModulesPlugin(),

		      //热加载
		      new webpack.HotModuleReplacementPlugin()
		  ]
	  };

