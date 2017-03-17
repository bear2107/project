
$(document).ready(function(){



	$('#reader').html5_qrcode(function(data){
		//alert("piyush");
		$('#read').html(data);
		var amount=data;
		console.log(amount);
		//alert("joshi");
			$.ajax({
				    type: "post",
				    url: '/transactions',
					data: { "amount": data},
				    datatype: "json",
				    success: function(result) {
				       console.log("Status: " + result.status);
				    }
				});

			window.location='/last'
			//console.log(x+"hgf");
		},

		function(error){
			$('#read_error').html(error);
		}, function(videoError){
			$('#vid_error').html(videoError);
		}

	);
});
