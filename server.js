'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/hallo', 
    handler: function (request, reply) {
        return reply('hello world');
    }
});

server.route({
    method: 'GET',
    path:'/first_ajax_example', 
    handler: function (request, reply) {
        return reply('AJAX example reply, bitches');
    }
});

// set up route console to accept 2 parameters 
// & console log a sentence "input 1 says:"
server.route({
    method: 'GET',
    path: '/two_inputs/{inputx}/{zerooroneoperator}',
    handler: function (request, reply) {
        reply('The input, ' + encodeURIComponent(request.params.inputx) + encodeURIComponent(request.params.zerooroneoperator) +'!');
    }
});

// 1st button exercise
server.route({
    method: 'GET',
    path: '/color_of_button_clicked/{acceptValueColorName}',
    handler: function (request, reply) {
        reply('The color of this button is ' + encodeURIComponent(request.params.acceptValueColorName) +'!');
    }
});
// 3rd button exercise:
server.route({
    method: 'GET',
    path: '/color_of_button_clicked_002/{acceptColorButtonName}',
    handler: function (request, reply) {
        // reply('The number of this button is ' +(request.params.acceptNumberButtonName)+'!');
        // console.log(request.params.acceptNumberButtonName);
        var colName = request.params.acceptColorButtonName;
        if (colName === "red"){
            var colorSentence = "The fire engine is ";
        } else if (colName === "green"){
            var colorSentence = "The frog is ";
        } else if (colName === "blue"){
            var colorSentence = "The sky is ";
        } else if (colName === "yellow"){
            var colorSentence  = "The Gadsden flag is ";
        } 
        reply({sentence:colorSentence,colorVar:colName});
        console.log({sentence:colorSentence,colorVar:colName});
    }
});

// 2nd button exercise:
server.route({
    method: 'GET',
    path: '/number_of_button_clicked/{acceptNumberButtonName}',
    handler: function (request, reply) {
        // reply('The number of this button is ' +(request.params.acceptNumberButtonName)+'!');
        // console.log(request.params.acceptNumberButtonName);
        //?nameofvariable=valueforvariable&&
        var numberName = request.params.acceptNumberButtonName;
        var fool = request.query.foo;
        var shat = request.query.shit;
        console.log("fool: ", fool);
        console.log("bart: ", shat);
        console.log("query params object: ", request.query);
        if (numberName === "one"){
            var numeral = 1;
        } else if (numberName === "five"){
            var numeral = 5;
        } else if (numberName === "fifty"){
            var numeral = 50;
        } else if (numberName === "1,000"){
            var numeral  = 1000;
        } 
        reply({numbutton:numeral});
        console.log({numbutton:numeral});
    }
});

        // if ()

// '/color_of_button_clicked/'+acceptValueColorName;

server.route({
    method: 'GET',
    path: '/{firstname}/{lastname}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.firstname) + encodeURIComponent(request.params.lastname) +'!');
            // console.log("url: "+(request.params.lastname)+'!');
    }
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/hello002',
        handler: function (request, reply) {
            reply.file('./public/2017_08_15_color_results_server_AJAX_call_1_was_hello002.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/number_adder',
        handler: function (request, reply) {
            reply.file('./public/number_adder.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/2017_09_12_color_results_server_AJAX_call_3',
        handler: function (request, reply) {
            reply.file('./public/2017_09_12_color_results_server_AJAX_call_3.html');
        }
    });
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});