var outerDivWidth;
var imagePuzzle = {
    startGame: function (gridSize) {
        console.log(gridSize);
        outerDivWidth= $('.outerJigsawDiv').width();
        console.log("outerDivWidth",outerDivWidth);
        this.setImage(gridSize);
        $('#sortable').randomize();
        this.enableSwapping('#sortable li');
        
    },
    enableSwapping: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone",
            containment: "parent"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);

                currentList = $('#sortable > li').map(function (i, el) 
                    { 
                        return $(el).attr('data-value'); 
                    });
                if (isSorted(currentList))
                {
                  console.log("Completed");
                  $('#sortable li div').unbind();
                  $('#sortable li div').css({
                    'border':'none'
                  });
                  imagePuzzle.openAlert();
                  //var scope = angular.element(document.getElementById("jigsawPuzzle")).scope();
                  //scope.isJigsawCompleteStatus(true);

               } else {
                 console.log("Not completed");
                   
                }

                imagePuzzle.enableSwapping(this);
                imagePuzzle.enableSwapping($dragElem);
            }
        });
    },
    openAlert:function()
    {

        $("#dialog").dialog({
     autoOpen: false,
     modal: true,
     buttons : {
          "Confirm" : function() {
             imagePuzzle.startGame(3);
             $("#dialog").dialog("close");            
          },
          "Cancel" : function() {
            $(this).dialog("close");
          }
        }
      });
         $('#dialog').html('<p>Congratulation,you have Won!!Press ok to play again.</p>');
          $("#dialog").dialog("open");


    },

    setImage: function (gridSize) {
        console.log(gridSize);
        gridSize = gridSize || 4; // If gridSize is null or not passed, default it as 4.
        console.log(gridSize);
        var percentage = 100 / (gridSize - 1);
        var image=$('#actualImage').attr('src');
        console.log("*****Image.src=",image.src);
        $('#sortable').empty();
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(' + image + ')',
                'background-size': (gridSize * 100) + '%',
                'background-position': xpos + ' ' + ypos,
                'width': outerDivWidth / gridSize,
                'height': outerDivWidth / gridSize,
                'border':'1px solid black'
            });
            $('#sortable').append(li);
        }
        $('#sortable').randomize();
    }
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}
$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};



  
    
    
  