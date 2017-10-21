'use strict';
const path = require('path');

module.exports = function (plop) {
	// starting prompt can be customize to display what you want
	// plop.setWelcomeMessage('[CUSTOM]'.yellow + ' What can I do for you?');

	// helpers are passed through to handlebars and made
	// available for use in the generator templates

	// adds 4 dashes around some text (yes es6/es2015 is supported)
	plop.addHelper('dashAround', (text) => '---- ' + text + ' ----');

	// formats an array of options like you would write
	// it if you were speaking (one, two, and three)
	plop.addHelper('wordJoin', function (words) {
		return words.join(', ').replace(/(:?.*),/, '$1, and');
	});

	plop.addHelper('absPath', function (p) {
		return path.resolve(plop.getPlopfilePath(), p);
	});

	// adding a custom inquirer prompt type
	plop.addPrompt('directory', require('inquirer-directory'));

	plop.setGenerator('create statless component', {
		description: 'custom inquirer prompt example',
		prompts: [
			{
				type: 'input',
				name: 'fileName',
				message: 'Pick a file name:',
				validate: function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'file name is required';
				}
			}, 
            {
				type: 'directory',
				name: 'path',
				message: 'where would you like to put this component?',
				basePath: path.join(__dirname, '..', 'src/components')
			},

		],
		actions: [
			function(data) {
				console.log(data);
				return 'yay';
			}, 
			{
				type: 'add',
				path: path.join(__dirname, '..', 'src/components', '{{path}}/{{ camelCase fileName}}.js'),
				templateFile: 'templates/statelessComponent.js.txt',
				abortOnFail: true
			},
			{
				type: 'add',
				path: path.join(__dirname, '..', 'src/components', '{{path}}/{{ camelCase fileName}}.css'),
				templateFile: 'templates/statelessComponent.css.txt',
				abortOnFail: true
			}
		]
	});
	
	plop.setGenerator('create component with state', {
		description: 'custom inquirer prompt example',
		prompts: [
			{
				type: 'input',
				name: 'fileName',
				message: 'Pick a file name:',
				validate: function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'file name is required';
				}
			}, 
            {
				type: 'directory',
				name: 'path',
				message: 'where would you like to put this component?',
				basePath: path.join(__dirname, '..', 'src/components')
			},

		],
		actions: [
			function(data) {
				console.log(data);
				return 'yay';
			}, 
			{
				type: 'add',
				path: path.join(__dirname, '..', 'src/components', '{{path}}/{{ camelCase fileName}}.js'),
				templateFile: 'templates/componentWithState.js.txt',
				abortOnFail: true
			},
			{
				type: 'add',
				path: path.join(__dirname, '..', 'src/components', '{{path}}/{{ camelCase fileName}}.css'),
				templateFile: 'templates/statelessComponent.css.txt',
				abortOnFail: true
			}
		]
	});
};
