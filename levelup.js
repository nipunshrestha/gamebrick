export{level2,level3};

function level2(brickColumnCount,brickRowCount,numofbricks,bricks){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            numofbricks++;
            bricks[c][r].status =1 ;
        }
    }
    for(var c=2; c<brickColumnCount-2; c++) {
        for(var r=1; r<brickRowCount-1; r++) {
            numofbricks--;
            bricks[c][r].status =0 ;
        }
    }
    return  numofbricks;
}

function level3(brickColumnCount,brickRowCount,numofbricks,bricks){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            numofbricks++;
            bricks[c][r].status =1 ;
        }
    }
    for(var c=2; c<brickColumnCount-2; c++) {
        for(var r=1; r<brickRowCount-1; r++) {
            numofbricks++;
            bricks[c][r].status =2 ;
        }
    }
    return  numofbricks;
}
    