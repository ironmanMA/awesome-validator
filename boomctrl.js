angular.module('boomcomm-app', [])
  .controller('BoomCommController', ['$scope', '$http', function($scope, $http) {

      $scope.isDataValid = false;

      function look_for_sku () {
        var sku = "";
      switch ( productClient ) {
          case "Officedepot":
              sku = $("span[itemprop='sku']")[0].innerText.replace(/\s/g, "").split('#')[1];              
              break;
          case "Lowes":
              sku = $("span[id='ItemNumber']")[0].innerText;
              break;
          default :
              sku = $("span[id='ItemNumber']")[0].innerText;
      }
        
        if( sku == undefined ){
          console.log("retrying")
          setTimeout(  'look_for_sku()' , 350 )
        }else{
          
          var fetchPostURL = postURL+sku;
          console.log("sracped sku"+sku+", url : "+fetchPostURL)
          $http.get(fetchPostURL).
            success(function(data, status, headers, config) {
              console.log("Success Get");
              console.log(data);

              if( data.totalCount ==0 ){
                $('#noComps').removeClass("hide-boomcomm");
                $scope.isDataValid = true;
              }else{
                $scope.allSKUData = data;
                generateShowInfo();
                $scope.isDataValid = true;
              }

            }).
            error(function(data, status, headers, config) {
              console.log("Error Get");
              alert("Data fetch from servers failed")
            });

        }
      }

      look_for_sku();

      function generateShowInfo () {
          $scope.clientInfo = $scope.allSKUData.skuInformation[0]['clientInformation'];
          $scope.clientInfo.lastStrategy = "N/A"
          $scope.clientInfo.lastPrice = "N/A"

          $scope.competitorInfo = $scope.allSKUData.skuInformation[0]['competitorInformation'];
          logos = {}
          logos['Amazon'] = "http://s27.postimg.org/83e3db6un/Amazon.png"
          logos['Staples'] = "http://static103.tiendeo.us/upload_negocio/negocio_83/logo2.png"
          logos['Homedepot'] = "http://s16.postimg.org/59i3zou75/homedepot.png"
          logos['Walmart'] = "http://s10.postimg.org/y494ehsbp/Walmart.png"
          for( var iter =0; iter < $scope.competitorInfo.length; iter++){            

            $scope.competitorInfo[iter]['client_logo']  = logos[$scope.competitorInfo[iter].name];
            $scope.competitorInfo[iter]['price_status'] = 'same'; 

            if( parseFloat($scope.clientInfo.price) > parseFloat($scope.competitorInfo[iter]['price']) ){
              $scope.competitorInfo[iter]['price_status'] = 'low';
            };

            if( parseFloat($scope.clientInfo.price) < parseFloat($scope.competitorInfo[iter]['price']) ){
              $scope.competitorInfo[iter]['price_status'] = 'high';
            };
            
          }

          $scope.show_competitorInfo = $scope.competitorInfo[0];
          $scope.selected_show_competitor = $scope.competitorInfo[0];

          console.log("Yey");
          $('#postload').removeClass("hide-boomcomm");

          $('#postload').click(function () {
            console.log("launching Dashboard")
            var effect = 'slide';
            var options = { direction: 'right' };            
            var duration = 350;
            $( "#dashboard" ).toggle( "slow" );
            // console.log( $scope.clientInfo )
            // console.log( $scope.competitorInfo )
            // console.log( $scope.selected_show_competitor )
          });          

      }

      $scope.showCompetitorInfo = function showCompetitorInfo ( compName ) {
        console.log( "clcikd on comp-info: "+compName )
        var iter =0;
        // console.log($scope.selected_show_competitor)
        for(iter =0; iter < $scope.competitorInfo.length ; iter++){
          if( $scope.competitorInfo[iter]['name'] == compName ){
            break;
          }
        }
        $scope.selected_show_competitor =  $scope.competitorInfo[iter];
        // console.log($scope.selected_show_competitor)
      }


  }]);