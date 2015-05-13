$(document).ready(function(){
    getData();
    getPostTemplate();

    $('.dataDisplay').on('click', '.removeData', function(){
        var dataId = $(this).data('id');
        console.log("Data ID of Button" + dataId)
            for (var i = 0; i < databaseInfo.length; i++){
                if (dataId == databaseInfo[i]._id){
                    console.log("Button ID to be removed" + databaseInfo[i]._id);
                    deleteData(dataId);
                }
            }
    });
});

var databaseInfo;

/////////////////////
//Get POST template
////////////////////

function getPostTemplate(){
    $.ajax({
        type: "GET",
        url: "/postTemplate",
        success: function(response){
            console.log("Got the form template");
            $(".postDataDisplay").append(response);
        },
        error: function(){
            console.log("the form template didn't work");
        },
        complete: function(){
            console.log("you have completed loading the template");
        }
    });
}
///////////////////////////////////////////
// this will delete data from the database
///////////////////////////////////////////

function deleteData(dataID){
    $.ajax({
        type: "DELETE",
        url: "/users/" + dataID,
        success: function(){
            console.log("data has been deleted for" + dataID);
            getData();
        },
        error: function () {
            console.log("data is still available");
        },
        complete: function(){
            console.log("the thing has been completely deleted");
        }
    });

}

//////////////////////////////////////
//this gets the data from my DATABASE
/////////////////////////////////////
function getData(){
    $.ajax({
        type: "GET",
        url: '/users',
        success: function(response){
            databaseInfo = response;
            getTemplate(response);
        },
        error: function(){
            console.log("getData for GET ERROR!")
        },
        complete: function(){
            console.log("getData is completed!")
        }
    });
}


///////////////////////////////////////////////
//this gets the template to display my data in
///////////////////////////////////////////////
function getTemplate(data){
    $.ajax({
        type: "GET",
        url: '/template',
        success: function(response){
            console.log('Got the template');
            displayData(data, response);
        },
        error: function(){
            console.log("getTemplate for TEMPLATE ERROR!")
        },
        complete: function(){
            console.log("getTemplate is completed!")
        }
    });
}




function displayData(data, template){
    $('.dataDisplay').empty();
    for(var j = 0; j < data.length; j++) {
        var temp = $(template);
        console.log("global" + databaseInfo);

        temp.find(".name").append("Name:" + data[j].name);
        temp.find(".score").append("Score:" + data[j].score);
        temp.find(".date").append("Date:" + data[j].date_completed);

        temp.find('.removeData').attr('data-id', data[j]._id);
        $('.dataDisplay').append(temp);

    }
}

