import {createContext} from "react";
import {Order, PaymentMethod, Platform, User} from "../schema";

export const OrdersContext = createContext(undefined);

export const OrdersProvider = ({children}) => {

    const tonyDear = new User(5, "Tony", "Dear");
    const ethanWu = new User(2, "Ethan", "Wu", true);
    const harukiGonai = new User(36, "Haruki", "Gonai");

    const orders = [
        new Order(9889400, Platform.Amazon, tonyDear, 1.00, PaymentMethod.Cash, 22),
        new Order(9889401, Platform.Amazon, ethanWu, 1.50, PaymentMethod.Venmo, 5),
        new Order(9889402, Platform.Costco, ethanWu, 2.00, PaymentMethod.Venmo, 32),
        new Order(9889403, Platform.Amazon, harukiGonai, 0.50, PaymentMethod.Venmo, 7),
        new Order(9889404, Platform.Walmart, harukiGonai, 0.50, PaymentMethod.Venmo, 30),
        new Order(9889405, Platform.Walmart, tonyDear, 0, PaymentMethod.Zelle, 15),
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