function scroll()
{
   if ($(this).scrollTop()>0)
      {
        $('#header_scroll').fadeOut();
      }
      else
      {
        $('.body-nav-horizontal').fadeIn();
      }
}
$(document).ready(function() {
	 var base_url = window.location.origin;

    //alert("dsadas");    
    $('#database_list').DataTable({
        "pagingType": "full_numbers"
    });
    $("body").on('click','.delete_db',function(){
    	
        var data = {
            'name' : 'monica'
        };
    	$.ajax({
    		type : 'post',
            dataType: 'json',
            data : data,
    		url: base_url+'/functions',
            success : function(data)
            {
                // console.log(JSON.stringify(req.body));
                alert(data);
            }
    	});
    	//alert(base_url);
    });
    // $("body").on('click','#login_here',function(){alert("click on Login");
        
    //     var data = {
    //         'name' : 'monica'
    //     };
    //     $.ajax({
    //         type : 'post',
    //         dataType: 'json',
    //         data : data,
    //         //url: base_url+'/functions',
    //         success : function(data)
    //         {
    //             // console.log(JSON.stringify(req.body));
    //             alert(data);
    //         }
    //     });
    //     //alert(base_url);
    // });

$('.checkthis').click(function(){ alert("sdfds");
    console.log( $(this).is(':checked'));
});

    $(".register_btn").click(function(){
         $.ajax({
            type : 'post',
            data : $("#register_form").serialize(),
            url: base_url+'/registration/save',
            success : function(res)
            {
                // console.log(JSON.stringify(req.body));
                alert(res);
                if(res=="success"){
                    $("#register_form")[0].reset();
                }
                else
                {
                     $(".msgdiv").html(res)     
                }
               
            },
            error:function(err){
                console.log(err)
            }
        });
    });
    $(".update_here").click(function(){
        // where = 'where '+$(this).attr('name')+'='+$(this).attr('id');
        // set = 'set '
        // details = {
        //     'tablename' : $("#tablename").val(),
        //     'set_value' : where,

        // };
        $.ajax({
            type : 'post',
            data : $("#update_form"+$(this).attr('name')).serialize(),
            url : base_url+'/registration/update',
            success : function(res)
            {
                //alert(res);
                if(res=="success")
                {
                    location.reload();
                }
                else
                {
                    alert("No chages done.")
                }
            }
        });
    });
    $(".delete_here").click(function(){
        $.ajax({
            type : 'post',
            data : $("#update_form"+$(this).attr('name')).serialize(),
            url : base_url+'/registration/delete',
            success : function(res)
            {
                alert(res);
                if(res=="success")
                {
                    location.reload();
                }
                else
                {
                    alert("No chages done.")
                }
            }
        });
    });
    $("#check").click(function(){
        $.ajax({
            type : 'post',
            data : $("#register_form").serialize(),
            url : base_url+'/access_rights/valid',
            success : function(res)
            {
                alert(res);
                if(res=="success")
                {
                    location.reload();
                }
                else
                {
                    alert("No chages done.")
                }
            }
        });
    });

    $(".auth").click(function(){alert("fsdfsd")
        $.ajax({
            type : 'post',
            data : $("#login").serialize(),
            url : base_url+'/login/auth',
            success : function(res)
            {
                alert(res);
                if(res=="success")
                {
                    window.location.href=base_url+'/';
                }
                else
                {
                    alert("No chages done.")
                }
            }
        });
    })
       
      
} );