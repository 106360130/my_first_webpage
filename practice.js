console.log('hello world!');


var a = 0;
var i = 0;
for (i=0;i<10;i++)
{
    a++;
    console.log(a);
}

function greet (name) {
    console.log('Helllo ' + name + '!');
}
greet ('simen')

var greet2 = function (name) {
    console.log('Helllo ' + name + '!');
}
greet2('simen')



function add (x, y){
    return x+y;
}
var sum = add (2, 3);
console.log(sum)