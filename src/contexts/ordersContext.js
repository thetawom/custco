import {createContext} from "react";
import {Order, PaymentMethod, Platform, User} from "../schema";

export const OrdersContext = createContext(undefined);

export const OrdersProvider = ({children}) => {

    const tonyDear = new User(5, "Tony", "Dear");
    const ethanWu = new User(2, "Ethan", "Wu", true);
    const harukiGonai = new User(4, "Haruki", "Gonai");
    const hazelZhu = new User(1, "Hazel", "Zhu");
    const maxTseng = new User(12, "Max", "Tseng", true);

    const orders = [
        new Order(9889400, Platform.Amazon, tonyDear, 1.00, PaymentMethod.Cash, 22),
        new Order(9889401, Platform.Amazon, ethanWu, 1.50, PaymentMethod.Venmo, 5),
        new Order(9889402, Platform.Costco, ethanWu, 2.00, PaymentMethod.Venmo, 32),
        new Order(9889403, Platform.Amazon, harukiGonai, 0.50, PaymentMethod.Venmo, 7),
        new Order(9889404, Platform.Walmart, harukiGonai, 0.50, PaymentMethod.Venmo, 30),
        new Order(9889405, Platform.Walmart, tonyDear, 0, PaymentMethod.Zelle, 15),
        new Order(9889406, Platform.Amazon, hazelZhu, 1.00, PaymentMethod.Zelle, 20),
        new Order(9889407, Platform.Target, hazelZhu, 1.00, PaymentMethod.Zelle, 12),
        new Order(9889408, Platform.HomeDepot, maxTseng, 0.50, PaymentMethod.Zelle, 36),
        new Order(9889409, Platform.JCPenney, maxTseng, 0.50, PaymentMethod.Zelle, 14),
        new Order(9889410, Platform.Costco, maxTseng, 1.00, PaymentMethod.Zelle, 28),
    ]

    const contextData = {
        orders: orders
    };

    return (
      <OrdersContext.Provider value={contextData}>
          {children}
      </OrdersContext.Provider>
    );

}