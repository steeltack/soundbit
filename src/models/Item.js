
let instance = null;

class Item {

    //https://www.upccodesearch.com/
    static upcCodeSearch(obj) {
        return {
          imgSrc: obj.image,
          name: obj.title && obj.title.slice(0, 19) + '...',
          price: obj.price || 0
        }
    }

    constructor(obj, type) {
        let newObj = null
        if (type) {
            console.log('made in htere*********', obj)
           newObj = Item[type](obj);
        }

        if (!newObj) {
            newObj = obj;
        }

        if (!newObj.id) {
            newObj.id = Math.random().toString(36).substring(7);
        }

        this.imgSrc = newObj.imgSrc;
        this.name = newObj.name && newObj.name.slice(19, 39) + '...';;
        this.price = newObj.price;
        this.id = newObj.id;
    }

    validate() {
        return {
            isValid: true,//!Boolean(this.imgSrc) && !Boolean(this.name),
            message: 'item not found'
        }
    }
}

export default Item;