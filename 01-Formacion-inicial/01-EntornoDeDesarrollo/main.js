const args = require('minimist')(process.argv.slice(1))
const inquirer = require('inquirer');
const chalk = import('chalk');
require('dotenv').config();
args['condition']
var questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your name?"
    }
];

if (args['condition'] == 'saludo')
{
    inquirer.prompt(questions).then(answers => {
        console.log(chalk.green(`Wellcome ${answers['name']}!`))
    });
}
else if (args['condition'] == null)
{
    inquirer.prompt(questions).then(answers => {
        console.log(chalk.red(`Goodbye ${answers['name']}!`))
    });
}
else
{
    console.log('No argument ', process.env.USER_ID)
}

process.on('SIGTERM', () => {
        console.log('Process terminated');
});

process.on('SIGINT', () => {
    console.log('good Bye!');
    process.kill(process.pid, 'SIGTERM');
});






