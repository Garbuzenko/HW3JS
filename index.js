class Good {  
    constructor (id, name, description, sizes, price, available) 
    {
        this.id = id;
        this.name = name;  
        this.description = description;  
        this.sizes = sizes;  
        this.price = price;  
        this.available = available;  
    } 
    setAvailable(available){
        this.available = available;
    }
}


class GoodsList{
 constructor (filter, sortPrice, sortDir) 
    {
        this.goods = [];
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }
    get list(){
        let s = 1;
        if ( !sortDir ){ s = -1 }
       
        let l = this.goods.filter(good => ( good.available = true && filter.test(good.name) ))

        if ( this.sortPrice === true ){ 
            l = l.sort((p1, p2) => (p1.price <= p2.price) ? -s : s)
        }

        return l
    }
    add(good) {
        this.goods.push(good);
    }
    remove(id){
       this.goods.splice(this.goods.filter(good => good.id = id)[0], 1)
    }
    getGood(_id){
        let i;
        this.goods.forEach( function(good, index) { if (good.id === _id ) { i = index; } } )
        return this.goods[i]
    }

}


class BasketGood extends Good{
  constructor(id, name, description, sizes, price, available, _amount) {
     super(id, name, description, sizes, price, available);
     this.amount = _amount;
  }
}

class Basket{
 constructor ( ) 
    {
        this.goods = [];
    }
    get list(){
        return this.goods.filter(good => good.available = true)
    }
    add(_good, _amount) {
       
        let i;
        this.goods.forEach( function(good, index) { if (good.id === _good.id ) { i = index; } } )
        console.log(i)
        if (typeof i !== "undefined"){
            // если товар уже есть увеличивает количество
            this.goods[i].amount += _amount

            if ( this.goods[i].amount === 0 ){
                //Если количество становится равным нулю, товар удаляется
                this.goods.slice(i, 1) 
             }
        }else{
            // Добавляет товар в корзину
            this.goods.push(new BasketGood(_good.id, _good.name, _good.description, _good.sizes, _good.price, _good.available, _amount ));
        }
    }
    remove(_good, _amount){
        // Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
        this.add(_good, -_amount)
    }
    get totalAmount() {
        return this.goods.filter(good => good.available === true).reduce( (total, good) => total + good.amount, 0)
    }
    get totalSum(){
        return this.goods.filter(good => good.available === true).reduce((total, good) => total + good.amount*good.price, 0);
    }
 
    clear(){
        // Очищает содержимое корзины
       this.goods = []; 
    }
    removeUnavailable() {
        // Удаляет из корзины товары, имеющие признак available === false (использовать filter())
        this.goods = this.goods.filter(good => good.available === true, 1)
    }

}
filter = new RegExp("Крос", "i");
sortPrice = true
sortDir = true
goodList = new GoodsList(filter, sortPrice, sortDir)
goodList.add(new Good(1, "Кроссовки", "Nike", [1], 5000, false, 1))
goodList.add(new Good(2, "КросоТуфли", "Nike", [1], 3000, true, 1))
goodList.add(new Good(3, "КросоСапоги", "Nike", [1], 1000, true, 1))
goodList.add(new Good(4, "Коньки", "Nike", [1], 2000, true, 1))
goodList.add(new Good(5, "Лыжи", "Nike", [1], 1000, true, 1))
console.log(goodList.list)

basket = new Basket()
basket.add( goodList.getGood(1), 8)
basket.remove( goodList.getGood(1), 6)
basket.add(goodList.getGood(5), 3)
console.log(basket)
alert(basket.totalAmount)
alert(basket.totalSum)