import AmazonLogo from "./assets/images/amazon-square.png";
import CostcoLogo from "./assets/images/costco-square.png";
import WalmartLogo from "./assets/images/walmart-square.jpg";
import MujiLogo from "./assets/images/muji-square.png";
import TargetLogo from "./assets/images/target-square.png";
import MacysLogo from "./assets/images/macys-square.png";
import JCPenneyLogo from "./assets/images/jcpenney-square.png";
import BestBuyLogo from "./assets/images/bestbuy-square.svg";
import HomeDepotLogo from "./assets/images/homedepot-square.png";

export class User {
    constructor(id, firstName, lastName, isFriend=false) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isFriend = isFriend;
    }

    get name() {
        return `${this.firstName} ${this.lastName.charAt(0)}.`;
    }
}

export class Platform {
    static Amazon = new Platform(0, "Amazon", "https://www.amazon.com",25, AmazonLogo, 12);
    static Costco = new Platform(1, "Costco", "https://www.costco.com", 75, CostcoLogo, 0);
    static Muji = new Platform(2, "Muji", "https://www.muji.com",75, MujiLogo, 0);
    static Walmart = new Platform(3, "Walmart", "https://www.walmart.com",35, WalmartLogo, 0);
    static Target = new Platform(4, "Target", "https://www.target.com", 35, TargetLogo, 0);
    static Macys = new Platform(5, "Macy's", "https://www.macys.com", 36, MacysLogo, 5);
    static JCPenney = new Platform(6, "JC Penney", "https://www.jcpenney.com", 50, JCPenneyLogo, 0);
    static BestBuy = new Platform(7, "Best Buy", "https://www.bestbuy.com",35, BestBuyLogo, 7);
    static HomeDepot = new Platform(8, "Home Depot", "https://www.homedepot.com", 45, HomeDepotLogo, 0);

    constructor(id, name, url, threshold, logo, padding) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.threshold = threshold;
        this.logo = logo;
        this.padding = padding;
    }

    static all() {
        return [this.Amazon, this.Costco, this.Muji, this.Walmart, this.Target, this.Macys, this.JCPenney, this.BestBuy, this.HomeDepot];
    }
    static isValid(id) {
        return id < this.all().length;
    }
    static getById(id) {
        return this.isValid(id) ? this.all()[id] : null;
    }
}

export class PaymentMethod {
    static Venmo = new PaymentMethod(0, "Venmo")
    static Zelle = new PaymentMethod(1, "Zelle")
    static Cash = new PaymentMethod(2, "Cash")
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

export class Item {
    constructor(name, url, price) {
        this.name = name;
        this.url = url;
        this.price = price;
        this.finalized = false;
    }

    static newFinalized(item) {
        const newItem = new Item(item.name, item.url, item.price);
        newItem.finalized = true;
        return newItem;
    }
}

export class Order {
    constructor(id, platform, initiator, fee, paymentMethod, baseAmount, items = []) {
        this.id = id;
        this.platform = platform;
        this.initiator = initiator;
        this.fee = fee;
        this.paymentMethod = paymentMethod;
        this.baseAmount = baseAmount;
        this.items = items;
    }

    amount(tentative = false) {
        return this.baseAmount + this.items.filter(item => tentative || item.finalized).reduce((currSum, item) => currSum + item.price, 0);
    }
    remaining(tentative = false) {
        return Math.max(this.platform.threshold - this.amount(tentative), 0);
    }
    percentage(tentative = false) {
        return Math.min(100 * this.amount(tentative) / this.platform.threshold, 100);
    }
    remainingWhole(tentative = false) {
        return this.remaining(tentative).toFixed(0);
    }
    remainingCents(tentative = false) {
        return ((this.remaining(tentative) % 1) * 100).toFixed(0).padStart(2, "0");
    }

    static newWithoutItem(order, i) {
        const items = order.items.filter((o, j) => i !== j);
        return new Order(order.id, order.platform, order.initiator, order.fee, order.paymentMethod, order.baseAmount, items);
    }

    static newWithItem(order, item) {
        const items = [...order.items, item];
        return new Order(order.id, order.platform, order.initiator, order.fee, order.paymentMethod, order.baseAmount, items);
    }

    static finalizeAll(order) {
        const items = order.items.map(item => Item.newFinalized(item));
        return new Order(order.id, order.platform, order.initiator, order.fee, order.paymentMethod, order.baseAmount, items);
    }
}