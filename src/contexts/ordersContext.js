import {createContext, useState} from "react";
import {Order, PaymentMethod, Platform, User} from "../schema";

export const OrdersContext = createContext(undefined);

export const OrdersProvider = ({children}) => {

    const jojoWu = new User(5, "Jojo", "Wu");
    const tonyDear = new User(0, "Tony", "Dear");
    const ethanWu = new User(2, "Ethan", "Wu", true);
    const harukiGonai = new User(4, "Haruki", "Gonai");
    const hazelZhu = new User(1, "Hazel", "Zhu");
    const maxTseng = new User(12, "Max", "Tseng", true);

    const ORDERS_MAP = new Map([
        [9889399, new Order(9889399, Platform.Muji, jojoWu, 1.00, PaymentMethod.Zelle, 0)],
        [9889400, new Order(9889400, Platform.Amazon, tonyDear, 1.00, PaymentMethod.Cash, 22)],
        [9889401, new Order(9889401, Platform.Amazon, ethanWu, 1.50, PaymentMethod.Venmo, 5)],
        [9889402, new Order(9889402, Platform.Costco, ethanWu, 2.00, PaymentMethod.Venmo, 32)],
        [9889403, new Order(9889403, Platform.Amazon, harukiGonai, 0.50, PaymentMethod.Venmo, 7)],
        [9889404, new Order(9889404, Platform.Walmart, harukiGonai, 0.50, PaymentMethod.Venmo, 30)],
        [9889405, new Order(9889405, Platform.Walmart, tonyDear, 0, PaymentMethod.Zelle, 15)],
        [9889406, new Order(9889406, Platform.Amazon, hazelZhu, 1.00, PaymentMethod.Zelle, 20)],
        [9889407, new Order(9889407, Platform.Target, hazelZhu, 1.00, PaymentMethod.Zelle, 12)],
        [9889408, new Order(9889408, Platform.HomeDepot, maxTseng, 0.50, PaymentMethod.Zelle, 36)],
        [9889409, new Order(9889409, Platform.JCPenney, maxTseng, 0.50, PaymentMethod.Zelle, 14)],
        [9889410, new Order(9889410, Platform.Costco, maxTseng, 1.00, PaymentMethod.Zelle, 28)],
    ]);

    const [ordersMap, setOrdersMap] = useState(ORDERS_MAP);

    const orders = Array.from(ordersMap.values());
    const setOrders = (orders) => setOrdersMap(new Map(orders.map(order => [order.id, order])));
    const findOrder = (id) => ordersMap.get(Number(id));
    const updateOrder = (id, order) => setOrdersMap(new Map(ordersMap).set(id, order));

    const contextData = {
        orders: orders,
        setOrders: setOrders,
        findOrder: findOrder,
        updateOrder: updateOrder,
    };

    return (
      <OrdersContext.Provider value={contextData}>
          {children}
      </OrdersContext.Provider>
    );

}