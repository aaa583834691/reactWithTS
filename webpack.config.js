const path = require('path');
const { CleanWebpackPlugin  } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.tsx',  //入口文件
    mode:'development',   //开发环境
    devtool:'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test:/\.(js|jsx|ts|tsx)$/,
                exclude:/(node_modules|bower_components)/,
                loader:"babel-loader",
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 2048
                        }
                    },
                    'file-loader',
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use : [
                    'file-loader'
                ]
            }
        ],
    },
    resolve:{
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    plugins:[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!store', '!store/**']
        }),
        new HtmlWebpackPlugin({
            title: 'Basic react app'
        })
    ],
    output:{
        filename:'bundle.js',
        path:path.resolve( __dirname, 'dist')
    },
    devServer: {
        port:'3000',
        publicPath:"http://localhost:3000/dist/",
        hotOnly:true,
        contentBase:'./dist'
    }
};