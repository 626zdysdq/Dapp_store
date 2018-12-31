pragma solidity ^0.4.24;

contract Store {
    //保存货物的类型信息
    enum goods_kind { Food, Clothes, Books, Sports , Unknow}

    uint public goods_count=0;
    
    //一个货物的结构
    struct goods {
        uint id;            //唯一编号
        string name;        //名称
        //goods_kind kind;    //类型
        uint count;         //数量
        uint price;         //价格
    }
    
    mapping(uint=> goods) public goods_list;
    
    //添加某种新的商品
    function add_goods (string Name,uint Count, uint Price) public returns (bool){
        //require(keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(Name)));
        for(uint i = 0; i < goods_count ; i++){
            if(keccak256(abi.encodePacked(goods_list[i].name)) == keccak256(abi.encodePacked(Name)))
            return false;
        }
        goods memory good = goods(goods_count, Name, Count, Price);
        goods_list[goods_count] = good;
        goods_count++;
        return true;
    }

    //根据编号添加增加某一商品的数量
    function add_number_id (uint id, uint num) public returns (bool){
        if(id >= goods_count){
            return false;
        }
        goods_list[id].count += num;
        return true;
    }
    
    //根据商品的名称增加某一商品的数量
    function add_number_name (string Name, uint num) public returns (bool){
        for(uint i = 0; i < goods_count ; i++){
            if(keccak256(abi.encodePacked(goods_list[i].name)) == keccak256(abi.encodePacked(Name))){
                goods_list[i].count += num;
                return true;
            }           
        }
        return false;
    }

    //根据编号减少商品数量
    function decrease_number_id  (uint id, uint num) public returns (bool) {
        if(goods_list[id].count >= num || id < goods_count){
            goods_list[id].count -= num;
            return true;
        }
        return false;
    }

    //根据名称减少商品的数量
    function decrease_number_name (string Name, uint num) public returns (bool) {
        for(uint i = 0; i < goods_count ; i++){
            if(keccak256(abi.encodePacked(goods_list[i].name)) == keccak256(abi.encodePacked(Name)) && goods_list[i].count >= num){
                goods_list[i].count -= num;
                return true;
            }           
        }
        return false;
    }

    //改变某一商品的价格
    function change_price_id (uint id, uint Price) public returns (bool) {
        if(id < goods_count){
            goods_list[id].price = Price;
            return true;
        }
        return false;
    }

    function change_price_name (string Name, uint Price) public returns (bool) {
        for(uint i = 0; i < goods_count ; i++){
            if(keccak256(abi.encodePacked(goods_list[i].name)) == keccak256(abi.encodePacked(Name))){
                goods_list[i].price = Price;
                return true;
            }           
        }
        return false;
    }

    //查询某一商品的具体信息
    function find_id (uint id) public view returns (uint, string, uint, uint) {
        if(id >= goods_count){
            return (0, "", 0,0);
        }
        return (goods_list[id].id, goods_list[id].name, goods_list[id].count, goods_list[id].price);
    }

    //查询某一商品的具体信息
    function find_name (string Name) public view returns (uint, string, uint, uint) {
        for(uint i = 0; i < goods_count ; i++){
            if(keccak256(abi.encodePacked(goods_list[i].name)) == keccak256(abi.encodePacked(Name))){
                return (goods_list[i].id, goods_list[i].name, goods_list[i].count, goods_list[i].price);
            }           
        }
        return (9999, "", 9999, 9999);
    }

    //查询商品的种类数量
    function All_goods_num () public view returns (uint) {
        return goods_count;
    }

}