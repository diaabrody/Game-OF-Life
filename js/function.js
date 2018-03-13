
var exists =false ; // if grid is exists or not
var row; // the number of row in grid
var delay=100; // delay of game i set default delay 100 if the user not choose any value
var shoot =[]; //the array that will save every state of game
var  interval; // have the number of interval
var status;
var started =false; // the game start or not (meant if pass the first interation)

// this function create the grid

function clickableGrid(rows, cols){
    var s=0; //this is increment and set to as id for evey cell

    var grid = document.createElement('table');
    $(grid).css('border', 'black solid 2px');

    grid.className = 'grid';
    for (var i=0;i<rows;++i)
    {
        
        var tr = grid.appendChild(document.createElement('tr'));
        $(tr).attr("row", i+1);
        for (var y=0;y<cols;++y)
        {

            var cell = tr.appendChild(document.createElement('td'));
            s++;
            $(cell).attr('id',s); // put id for every cell

            $(cell).addClass("inactive"); //in creation time  all cells will be in active

            $(cell).attr("col", y+1); // every cell will take column number

         cell.addEventListener('click',function(){
                   if(started==false)
                   {

                       $(this).css("background-color", "blue");
                       $(this).toggleClass("active inactive");  //toggle between classes on click


                   $("#start").removeAttr("disabled");
                   $("#next").removeAttr("disabled");
                   }




          });



      }





  }

      return grid;
}

// this methods push the current grid into array called shoot

function push() {
    var table=$(".grid").html();
    shoot.push(table);
}

// this function make loop for all grid and determine the neigbours for every cell and count the number of alive neigbours cells for evey cell

function start()
{

 $("td").each(function () {

             row = parseInt(row);       // convert the number of rows of grid to integer
            var status = $(this).attr("class"); // know the status of every cell  (clas : active or inctive)
            var cellID = $(this).attr("id");    // the current cell id
            var cellcolid = $(this).attr("col"); // the current cell column
            var cellrowid = $(this).parent().closest('tr').attr("row"); // the current cell row
            cellcolid = parseInt(cellcolid);  // convert to int
            cellID = parseInt(cellID);
            cellrowid = parseInt(cellrowid);
            var currid = cellID;
            var next = currid + 1;                  //neigbour
            var prev = Math.abs(currid - 1);        //neigbour
            var up = Math.abs(row - currid);        //neigbour
            var down = row + currid;                //neigbour
            var nextup = up + 1;                    //neigbour
            var prevup = Math.abs(up - 1);          //neigbour
            var nextdown = down + 1;                //neigbour
            var prevdown = down - 1;                //neigbour
            var countactives = 0;                  // this variable will save the  lives neigbours cell

     // these if validation checks if the current cell have neigbours like have (next or previous or ...)or not have

            if (row > cellcolid) {

                var snext = $("#" + next).attr("class");
                if (snext == "active") countactives++;

            }

            if (cellcolid > 1) {
                var sprev = $("#" + prev).attr("class");
                if (sprev == "active") countactives++;
            }



            if (cellrowid > 1) {
                var sup = $("#" + up).attr("class");
                if (sup == "active") countactives++;
                var colup = $("#" + up).attr("col");
                colup = parseInt(colup);

                if (colup <row) {
                    var snextup = $("#" + nextup).attr("class");
                    if (snextup == "active") countactives++;

                }


                if (colup > 1) {

                    var sprevup = $("#" + prevup).attr("class");
                    if (sprevup == "active") countactives++;
                }


            }


            if (cellrowid < row) {

                var sdown = $("#" + down).attr("class");
                if (sdown == "active") countactives++;
                var downcol = $("#" + down).attr("col");
                downcol = parseInt(downcol);
                if (row > downcol) {

                    var snextdown = $("#" + nextdown).attr("class");
                    if (snextdown == "active") countactives++;
                }


                if (downcol > 1) {

                    var sprevdown = $("#" + prevdown).attr("class");
                    if (sprevdown == "active") countactives++;
                }


            }



//these valdiation check if the current cell will active or not in next iteration


            if (status == "active") {

                if (countactives < 2) {


                    $(this).attr("change","ctinactive"); // mark the cell that will be inactive in next iteration by putting change attribute

                }



                else if (countactives > 3) {


                    $(this).attr("change","ctinactive");
                }




            }

            else if (status == "inactive") {


                if (countactives == 3) {


                    $(this).attr("change","ctactive");

                }

            }



        });


}



//ready


$(document).ready(function(){


  $("#size").on("change",function(){

        var size=$('#size option:selected').val();
        row=size;
        if(exists)
        {
            $(".grid").remove();       //if there are grid in page will remove it to create another with diferent size
        }

        var grid = clickableGrid(size,size);
        exists=true;
        document.body.appendChild(grid);
       clearInterval(interval);
         started=false;
       $("#start").attr("disabled",'');
      $("#start").attr("disabled","");
      $("#next").attr("disabled","");
      $("#previous").attr("disabled","");

      status="start";
      $("#start").html("start");

      shoot=[];     // reset the array that have the saved state of game


    });

})

$(document).ready(function() {

    status="start";


    $("#start").on("click", function () {


   if(status=="start") {          // if status variable is start will go to the interval


     $("#next").attr("disabled",'');
       iteration0=true;
       $("#previous").attr("disabled",'');

        interval = setInterval(function () {
            push();
           start();
           started=true;

           $("td[change='ctactive']").remove("change").attr("class", "active").css("background-color", "blue"); // convet the marked cell to active
           $("td[change='ctinactive']").remove("change").attr("class", "inactive").css("background-color", "#9effeb");// convet the marked cell to inactive
            push();



       }, delay);

status="pause";
$("#start").html(status);
   }
   else
   {

       $("#next").removeAttr("disabled");
       $("#previous").removeAttr("disabled");
       clearInterval(interval);
       status="start";
       $("#start").html(status);
       started=true;
   }



    })


})

$(document).ready(function(){
$("#next").on("click",function () {


    push(); // save the current grid before start iteration in array shoot



    start();


    $("td[change='ctactive']").remove("change").attr("class", "active").css("background-color", "blue");
    $("td[change='ctinactive']").remove("change").attr("class", "inactive").css("background-color", "#9effeb");

    push(); // save the current grid after start iteration in array shoot


    $("#previous").removeAttr("disabled");
    started=true;

});


});

$(document).ready(function(){
    $("#delay").on("change",function () {
        delay=$('#delay option:selected').val();
        if(status=="pause")
        {

          clearInterval(interval);
  interval = setInterval(function () {
            push();
           start();
           started=true;

      $("td[change='ctactive']").remove("change").attr("class", "active").css("background-color", "blue");
      $("td[change='ctinactive']").remove("change").attr("class", "inactive").css("background-color", "#9effeb");
            push();
   


       }, delay);

        }

        else if(status=="start")
        {

            clearInterval(interval);
        }

    });




});

$(document).ready(function () {
    
    $("#reset").on("click" ,function () {


        started=false;
        status="start";

        $("#start").html("start");


        if(exists)
        {
            $(".grid").remove();
        }

        var grid = clickableGrid(row,row);
        exists=true;
        document.body.appendChild(grid);
        shoot=[];
        $("#start").attr("disabled","");
        $("#next").attr("disabled","");
        $("#previous").attr("disabled","");
        clearInterval(interval);
    });
    
});




$(document).ready(function () {

$("#previous").on("click",function () {




    shoot.pop();  // pop the current grid state because i want this grid
    var ptable=shoot.pop();
if(typeof (ptable) != 'undefined') // if array not empty
{
    if(exists)
    {
        $(".grid").remove();
    }


         var grid = document.createElement('table');
        grid.className = 'grid';
        $(grid).html(ptable);
        document.body.appendChild(grid);
    if(shoot.length == 0)
        {
            $(this).attr("disabled" , '');
        }





}

else {

    $(this).attr("disabled" , ''); // if array empty thats meant we donot have previous so i disaplyed this button

}




});

});











