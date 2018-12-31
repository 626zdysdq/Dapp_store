App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    /* Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });*/

    

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
    $(document).on('click', '#search_button',App.searchGoods);
    $(document).on('click', '#reset_button',App.resetGoods);
  },
  
  addGoods : async function(){
    $('.goodsrow').html("")
    var input_goods_name = document.getElementById('input-goods-name').value;
    var input_goods_number = document.getElementById('input-goods-number').value;
    var input_goods_price = document.getElementById('input-goods-Price').value;
    console.log(input_goods_name);

    App.contracts.Store.deployed().then(async function(instance){
      StoreInstance = instance;
      console.log(StoreInstance);
      StoreInstance.add_goods(input_goods_name, input_goods_number, input_goods_price);

      var num = await StoreInstance.All_goods_num.call();
      var petsRow = $('#petsRow');
      // console.log(num)
      for (var i = 0; i < num; i++) {
        var petTemplate = $('#petTemplate');
        var example = await StoreInstance.find_id(i);
        console.log(example[1])
        petTemplate.find('.panel-title').text(example[0]);
        var namestring = "images/"+ example[1] + ".jpeg";

        var ImgObj = new Image();
        ImgObj.onload = function() {
          petTemplate.find('img').attr('src', namestring);
          petsRow.append(petTemplate.html());
          // console.log('onload: ', namestring)
        }
        ImgObj.onerror = function () {
          petTemplate.find('img').attr('src', "images/wrong.jpeg");
          petsRow.append(petTemplate.html());
          // console.log('onerror: ', 'wrong')
        }
        ImgObj.src = namestring; 
        
        petTemplate.find('.pet-breed').text(example[1]);
        petTemplate.find('.pet-age').text(example[2]);
        petTemplate.find('.pet-location').text(example[3]);
        //petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
      }
      // console.log(num);

    })
  },

  searchGoods : async function() {
    $('.goodsrow').html("")
    var input_search_name = document.getElementById('search_input').value;
    console.log(input_search_name);

    App.contracts.Store.deployed().then(async function(instance){
      StoreInstance = instance;

      var example = await StoreInstance.find_name(input_search_name);
      console.log(example[0]);

      var petTemplate = $('#petTemplate');
      var petsRow = $('#petsRow');
      var no_search_show = $('no_search_show');
      if(example[0] == 9999 && example[2] == 9999 && example[3] == 9999){
        console.log("no goods")
        petsRow.append("<div id='no_search_show'><label id='no_result'>对不起，没有搜索到您要找的货物!</label></div>");
      } else {
        petTemplate.find('.panel-title').text(example[0]);
        var namestring = "images/"+ example[1] + ".jpeg";
        var ImgObj = new Image();
        ImgObj.onload = function() {
          petTemplate.find('img').attr('src', namestring);
          petsRow.append(petTemplate.html());
          // console.log('onload: ', namestring)
        }
        ImgObj.onerror = function () {
          petTemplate.find('img').attr('src', "images/wrong.jpeg");
          petsRow.append(petTemplate.html());
          // console.log('onerror: ', 'wrong')
        }
        ImgObj.src = namestring;     
        petTemplate.find('.pet-breed').text(example[1]);
        petTemplate.find('.pet-age').text(example[2]);
        petTemplate.find('.pet-location').text(example[3]);
      }
      
    })
  },

  resetGoods : async function(){
    $('.goodsrow').html("")
    App.contracts.Store.deployed().then(async function(instance){
      StoreInstance = instance;

      var num = await StoreInstance.All_goods_num.call();
      var petsRow = $('#petsRow');
      // console.log(num)
      for (var i = 0; i < num; i++) {
        var petTemplate = $('#petTemplate');
        var example = await StoreInstance.find_id(i);
        console.log(example[1])
        petTemplate.find('.panel-title').text(example[0]);
        var namestring = "images/"+ example[1] + ".jpeg";

        var ImgObj = new Image();
        ImgObj.onload = function() {
          petTemplate.find('img').attr('src', namestring);
          petsRow.append(petTemplate.html());
          // console.log('onload: ', namestring)
        }
        ImgObj.onerror = function () {
          petTemplate.find('img').attr('src', "images/wrong.jpeg");
          petsRow.append(petTemplate.html());
          // console.log('onerror: ', 'wrong')
        }
        ImgObj.src = namestring; 
        
        petTemplate.find('.pet-breed').text(example[1]);
        petTemplate.find('.pet-age').text(example[2]);
        petTemplate.find('.pet-location').text(example[3]);
        //petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
      }
      // console.log(num);

    })
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
