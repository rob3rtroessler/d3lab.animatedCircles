// data with individuals killed by gun violence
let data = [
    {id: 1, name: 'firstName lastName', age: 'child', killedBy: 'suicide'},
    {id: 2, name: 'firstName lastName', age: 'child', killedBy: 'suicide'},
    {id: 3, name: 'firstName lastName', age: 'child', killedBy: 'homicide'},
    {id: 4, name: 'firstName lastName', age: 'child', killedBy: 'suicide'},
    {id: 5, name: 'firstName lastName', age: 'child', killedBy: 'homicide'},
    {id: 6, name: 'firstName lastName', age: 'child', killedBy: 'suicide'},
    {id: 7, name: 'firstName lastName', age: 'child', killedBy: 'suicide'},
    {id: 8, name: 'firstName lastName', age: 'child', killedBy: 'homicide'},
    {id: 9, name: 'firstName lastName', age: 'child', killedBy: 'suicide'},
    {id: 10, name: 'firstName lastName', age: 'child', killedBy: 'homicide'},
    {id: 11, name: 'firstName lastName', age: 'adult', killedBy: 'homicide'},
    {id: 12, name: 'firstName lastName', age: 'adult', killedBy: 'homicide'},
    {id: 13, name: 'firstName lastName', age: 'adult', killedBy: 'suicide'},
    {id: 14, name: 'firstName lastName', age: 'adult', killedBy: 'suicide'},
    {id: 15, name: 'firstName lastName', age: 'adult', killedBy: 'homicide'},
    {id: 16, name: 'firstName lastName', age: 'adult', killedBy: 'homicide'},
    {id: 17, name: 'firstName lastName', age: 'adult', killedBy: 'suicide'},
    {id: 18, name: 'firstName lastName', age: 'adult', killedBy: 'homicide'},
    {id: 19, name: 'firstName lastName', age: 'adult', killedBy: 'suicide'},
    {id: 20, name: 'firstName lastName', age: 'adult', killedBy: 'homicide'}
    ];


// container for drawing area
let myDiv = $('#myDiv');

// margins
let margin = { top: 50, right: 50, bottom: 50, left: 50 };
let width = myDiv.width() - margin.left - margin.right,
    height = myDiv.height() - margin.top - margin.bottom;

// settings
let spaceBetweenCircles = 50;
let radiusAnimationOne = height/20;
let radiusAnimationTwo = height/20;
let radiusSmallCircles = height/20;
let radiusBigCircles = height/4 - spaceBetweenCircles;
let marginTop = 10;


// SVG drawing area
let svg = d3.select("#myDiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// create circle containers
let circles = svg.selectAll('circle')
    .data(data);

console.log(data);

// append circles
circles.enter().append('circle')
    .attr('class', function(d){
            return `customCircle ${d.age} ${d.killedBy}`
        })
    .attr('cx', function(d,i){
        if(i % 4 === 0){
            return width/10*3.5;
        } else if(i % 4 === 1) {
            return width/10 * 4.5
        } else if(i % 4 === 2) {
            return width/10 * 5.5
        } else if(i % 4 === 3) {
            return width/10 * 6.5
        }
    })
    .attr('cy', function(d,i){
        return (Math.trunc(i / 4)) * height/5 + marginTop;
    })
    .attr('r', width/30)
    .attr('fill', function(d,i){
        if(d.age === 'child'){
            return 'blue'
        }else{
            return 'red'
        }
    });

// append labels
circles.enter().append('text')
    .attr('class', function(d){
        return `customLabel ${d.age} ${d.killedBy}`
    })
    .attr('x', function(d,i){
        if(i % 4 === 0){
            return width/10*3.5;
        } else if(i % 4 === 1) {
            return width/10 * 4.5
        } else if(i % 4 === 2) {
            return width/10 * 5.5
        } else if(i % 4 === 3) {
            return width/10 * 6.5
        }
    })
    .attr('y', function(d,i){
        return (Math.trunc(i / 4)) * height/5 + marginTop;
    })
    .attr('text-anchor', 'middle')
    .text(function(d){return d.id});


// animation 1 - arrange circles as two circles
function animationOne(){

    // update circles
    d3.selectAll('.customCircle.child')
        .transition()
        .duration(800)
        .attr('r', radiusSmallCircles)
        .attr('cx', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            let x = (radiusBigCircles * Math.cos(angle)) + (width/4);
            return x })
        .attr('cy', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            return (radiusBigCircles * Math.sin(angle)) + (height/2);
        });

    d3.selectAll('.customCircle.adult')
        .transition()
        .duration(800)
        .attr('r', radiusSmallCircles)
        .attr('cx', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            let x = (radiusBigCircles * Math.cos(angle)) + (width/4*3);
            return x })
        .attr('cy', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            return (radiusBigCircles * Math.sin(angle)) + (height/2);
        });

    // update labels
    d3.selectAll('.customLabel.child')
        .transition()
        .duration(800)
        .attr('r', radiusSmallCircles)
        .attr('x', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            let x = (radiusBigCircles * Math.cos(angle)) + (width/4);
            return x })
        .attr('y', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            y = (radiusBigCircles * Math.sin(angle)) + (height/2);
            return y
        });

    // update labels
    d3.selectAll('.customLabel.adult')
        .transition()
        .duration(800)
        .attr('r', radiusSmallCircles)
        .attr('x', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            return (radiusBigCircles * Math.cos(angle)) + (width/4*3);
        })
        .attr('y', function(d,i){
            let angle = (i / (data.length/4)) * Math.PI;
            return (radiusBigCircles * Math.sin(angle)) + (height/2);
        });
}

// animation 2 - separate bar charts
function animationTwo(){

    d3.selectAll('.customCircle.child')
        .transition()
        .duration(800)
        .attr('cx', function(d,i){
            if(i % 4 === 0){
                return width/10;
            } else if(i % 4 === 1) {
                return width/10 * 2
            } else if(i % 4 === 2) {
                return width/10 * 3
            } else if(i % 4 === 3) {
                return width/10 * 4
            }
        })
        .attr('cy', function(d,i){
            return (Math.trunc(i / 4)) * (radiusAnimationTwo*2 + spaceBetweenCircles);
        })
        .attr('r', radiusAnimationTwo);


    d3.selectAll('.customCircle.adult')
        .transition()
        .duration(800)
        .attr('cx', function(d,i){
            if(i % 4 === 0){
                return width/10*6;
            } else if(i % 4 === 1) {
                return width/10 * 7
            } else if(i % 4 === 2) {
                return width/10 * 8
            } else if(i % 4 === 3) {
                return width/10 * 9
            }
        })
        .attr('cy', function(d,i){
            return (Math.trunc(i / 4)) * (radiusAnimationTwo*2 + spaceBetweenCircles);
        })
        .attr('r', radiusAnimationTwo);


    // update labels
    d3.selectAll('.customLabel.child')
        .transition()
        .duration(800)
        .attr('x', function(d,i){
            if(i % 4 === 0){
                return width/10;
            } else if(i % 4 === 1) {
                return width/10 * 2
            } else if(i % 4 === 2) {
                return width/10 * 3
            } else if(i % 4 === 3) {
                return width/10 * 4
            }
        })
        .attr('y', function(d,i){
            return (Math.trunc(i / 4)) * (radiusAnimationTwo*2 + spaceBetweenCircles);
        })
        .attr('r', radiusAnimationTwo);


    // update labels
    d3.selectAll('.customLabel.adult')
        .transition()
        .duration(800)
        .attr('x', function(d,i){
            if(i % 4 === 0){
                return width/10*6;
            } else if(i % 4 === 1) {
                return width/10 * 7
            } else if(i % 4 === 2) {
                return width/10 * 8
            } else if(i % 4 === 3) {
                return width/10 * 9
            }
        })
        .attr('y', function(d,i){
            return (Math.trunc(i / 4)) * (radiusAnimationTwo*2 + spaceBetweenCircles);
        })
        .attr('r', radiusAnimationTwo);
}

// animation 3 - back to start
function animationThree(){

    // sort by
    d3.selectAll('.customCircle')
        .transition()
        .duration(800)
        .attr('cx', function(d,i){
            if(i % 4 === 0){
                return width/10*3.5;
            } else if(i % 4 === 1) {
                return width/10 * 4.5
            } else if(i % 4 === 2) {
                return width/10 * 5.5
            } else if(i % 4 === 3) {
                return width/10 * 6.5
            }
        })
        .attr('cy', function(d,i){
            return (Math.trunc(i / 4)) * height/5 + marginTop;
        })
        .attr('r', width/30);


    // update labels
    d3.selectAll('.customLabel')
        .transition()
        .duration(800)
        .attr('x', function(d,i){
            if(i % 4 === 0){
                return width/10*3.5;
            } else if(i % 4 === 1) {
                return width/10 * 4.5
            } else if(i % 4 === 2) {
                return width/10 * 5.5
            } else if(i % 4 === 3) {
                return width/10 * 6.5
            }
        })
        .attr('y', function(d,i){
            return (Math.trunc(i / 4)) * height/5 + marginTop;
        })
        .attr('text-anchor', 'middle')
        .text(function(d){return d.id});
}

// animation
setInterval (animateCircles, 7000);

function animateCircles(){
    animationOne();
    setTimeout(function() { animationTwo() }, 3500);
    setTimeout(function() { animationThree() }, 3500);
}

