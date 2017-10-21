let instance = null;

const TAX_PERCENT = 8.875;

class Total {
    constructor() {
         if (instance) {
            return instance
        }

        instance = this;
        this.total = 0;
        this.paid = false;
    }

    add(amt) {
        this.total += amt
        this.total = this.total;
        return this.total;
    }

    subtract(amt) {
        this.total -= amt;
        this.total = this.total;
        return this.total;
    }

    amount() {
        return parseFloat(this.total, 10).toFixed(2);
    }

    isEmpty() {
        return this.total <= 0
    }

    tax() {
        return parseFloat(this.total * TAX_PERCENT / 100, 10).toFixed(2);
    }

    grandTotal() {
        const total = parseFloat(this.tax(), 10) + parseFloat(this.total, 10)
        return parseFloat(total, 10).toFixed(2);
    }

    pay() {
        this.paid = true
    }
    
    isComplete() {
        return this.paid
    }
}

export default Total;