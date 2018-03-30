angular.module('starter')
.controller('ListagemController', function($scope, CarroService){

	CarroService.obterCarros().then(function(dados){
		$scope.listaDeCarros = dados;

	});

	// $scope.listaDeCarros = [
	// 							{"nome" : "BMW 120i", "preco" : 70000},
	// 							{"nome" : "Onix 1.6", "preco" : 35000},
	// 							{"nome" : "Fiesta 2.0", "preco" : 52000},
	// 							{"nome" : "C3 1.0", "preco" : 22000},
	// 							{"nome" : "Uno Fire", "preco" : 11000},
	// 							{"nome" : "Sentra 2.0", "preco" : 53000},
	// 							{"nome" : "Astra Sedan", "preco" : 39000},
	// 							{"nome" : "Vectra 2.0 Turbo", "preco" : 37000},
	// 							{"nome" : "Hilux 4x4", "preco" : 90000},
	// 							{"nome" : "Montana Cabine dupla", "preco" : 57000},
	// 							{"nome" : "Outlander 2.4" ,"preco" : 99000},
	// 							{"nome" : "Fusca 1500", "preco" : 6000},
	// 						];
});

angular.module('starter').controller('CarroEscolhidoController', function($scope, $stateParams) {
	
	$scope.carroEscolhido = angular.fromJson($stateParams.carro);

	$scope.acessorios = [
							{"nome": "Freio ABS", "preco": 500}, 
							{"nome": "Ar Cond.", "preco": 1000},
							{"nome": "MP3", "preco": 800}];

	$scope.mudou = function(acessorio, isMarcado) {

		if (isMarcado) {
			$scope.carroEscolhido.preco = $scope.carroEscolhido.preco + acessorio.preco;
		} else {
			$scope.carroEscolhido.preco = $scope.carroEscolhido.preco - acessorio.preco;
		}
	};
});

angular.module('starter')
	.controller('FinalizarPedidoController', function($scope, $stateParams, 
													 	$ionicPopup, $state, CarroService) {

		$scope.carroFinalizado = angular.fromJson($stateParams.carro);


		$scope.pedido = {};


		$scope.finalizarPedido = function(){

			var pedidoFinalizado = {
				params : {
					carro : $scope.carroFinalizado.nome,
					preco : $scope.carroFinalizado.preco,
					nome  : $scope.pedido.nome,
					endereco  : $scope.pedido.endereco,
					email  : $scope.pedido.email
				} 
			};

			CarroService.salvarPedido(pedidoFinalizado).then(function(dados){
				
				$ionicPopup.alert({
					title: 'Parabéns',
					template: 'Você acaba de comprar um carro.'
				}).then(function(){
					$state.go('listagem');
				});

			});
		};
});

angular.module('starter')
	   .controller('loginController', function($scope, CarroService, $ionicPopup, $state){

		$scope.login = {};

		$scope.realizarLogin = function(){
			var dadosDoLogin = {
				
				params: {
					email: $scope.login.email,
					senha: $scope.login.senha
				}
			};
			
			CarroService.realizarLogin(dadosDoLogin)
						.then(dados => {
								$state.go('listagem');
					    },erro => { 
							$ionicPopup.alert({
								title: 'Opa!',
								template: 'E-mail ou Senha incorretos'
				});
			});
		};


});



if(dados.status === 200){
    $ionicPopup.alert({
        title: 'Seja bem-vindo',
        template: 'Login efetuado com sucesso.'
    });
    $state.go('listagem');
}