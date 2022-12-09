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
    static Amazon = new Platform(0, "Amazon", 25, AmazonLogo, 12);
    static Costco = new Platform(1, "Costco", 75, CostcoLogo, 0);
    static Muji = new Platform(2, "Muji", 100, MujiLogo, 0);
    static Walmart = new Platform(3, "Walmart", 35, WalmartLogo, 0);
    static Target = new Platform(4, "Target", 35, TargetLogo, 0);
    static Macys = new Platform(5, "Macy's", 36, MacysLogo, 5);
    static JCPenney = new Platform(6, "JC Penney", 50, JCPenneyLogo, 0);
    static BestBuy = new Platform(7, "Best Buy", 35, BestBuyLogo, 7);
    static HomeDepot = new Platform(8, "Home Depot", 45, HomeDepotLogo, 0);

    constructor(id, name, threshold, logo, padding) {
        this.id = id;
        this.name = name;
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

    get amount() {
        return this.baseAmount + this.items.reduce((currSum, item) => currSum + item.price, 0);
    }
    get remaining() {
        return Math.max(this.platform.threshold - this.amount, 0);
    }
    get percentage() {
        return Math.min(100 * this.amount / this.platform.threshold, 100);
    }
    get remainingWhole() {
        return this.remaining.toFixed(0);
    }
    get remainingCents() {
        return ((this.remaining % 1) * 100).toFixed(0).padStart(2, "0");
    }

    static newWithoutItem(order, i) {
        const items = order.items.filter((o, j) => i !== j);
        return new Order(order.id, order.platform, order.initiator, order.fee, order.paymentMethod, order.baseAmount, items);
    }

    static newWithItem(order, item) {
        const items = [...order.items, item];
        return new Order(order.id, order.platform, order.initiator, order.fee, order.paymentMethod, order.baseAmount, items);
    }
}