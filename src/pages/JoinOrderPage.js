import {useParams} from "react-router-dom";
import {useContext} from "react";
import {OrdersContext} from "../contexts/ordersContext";

function JoinOrdersPage() {

    const {findOrder} = useContext(OrdersContext);
    const {id} = useParams();

    const order = findOrder(id);

    return <h1>{order.id}</h1>
}

export default JoinOrdersPage;