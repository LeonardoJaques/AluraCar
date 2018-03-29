angular.module('starter')
    .service('CarroService', function($http){

        const url = 'https://aluracar.herokuapp.com/'

        return {
            obterCarros : function(){
                return  $http.get(url)
                              .then(response => response.data);
            },
            
            salvaPedido : function(pedido){

              return  $http.get(url + "salvarpedido", pedido)
                           .then(resp => "Sucesso.")

                
            }
        };

});