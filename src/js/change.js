App = {
    web3Provider: null,
    contracts: {},
  
    init: async function() {         
        var name = $.query.get("name");
        console.log(name);

      return await App.initWeb3();
    },
  
    initWeb3: async function() {
      if (typeof web3 != 'undefined'){
        App.web3Provider = web3.currentProvider;
      } else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
  
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON('Store.json', function(data){
        var StoreArtifact = data;
        App.contracts.Store = TruffleContract(StoreArtifact);
  
        App.contracts.Store.setProvider(App.web3Provider);
  
        return;
      })
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '#submit-goods-info',App.addGoods);
    },
    
    changeGoods : function(){
      console.log("aaaa");
      var name = document.getElementsByName("pet-breed")
    }
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  