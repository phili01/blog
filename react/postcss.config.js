module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-hexrgba'),
       
        require('postcss-simple-vars'),
        require('postcss-preset-env')({
            stage: 1,
        }),
        require('postcss-nested'),
        require('autoprefixer')
    ],
};