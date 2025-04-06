"use client";
import OrderHistory from "../../../components/OrderHistory";

const orders = {
    orders: [
        {
            OrderID: 1001,
            Amount: 2598,
            Order_Date: "2024-03-01",
            Payment: "Credit Card",
            Billing_Name: "John Doe",
            Status: "Delivered",
        },
        {
            OrderID: 1002,
            Amount: 1698,
            Order_Date: "2024-03-05",
            Payment: "PayPal",
            Billing_Name: "Jane Smith",
            Status: "Delivered",
        },
        {
            OrderID: 1003,
            Amount: 205,
            Order_Date: "2024-03-10",
            Payment: "Credit Card",
            Billing_Name: "Michael Johnson",
            Status: "Shipped",
        },
        {
            OrderID: 1004,
            Amount: 2099,
            Order_Date: "2024-03-15",
            Payment: "Apple Pay",
            Billing_Name: "Emily Davis",
            Status: "Processing",
        },
        {
            OrderID: 1005,
            Amount: 2249,
            Order_Date: "2024-03-20",
            Payment: "Credit Card",
            Billing_Name: "David Brown",
            Status: "Delivered",
        },
        {
            OrderID: 1006,
            Amount: 1500,
            Order_Date: "2024-03-22",
            Payment: "PayPal",
            Billing_Name: "Sophia Wilson",
            Status: "Pending",
        },
        {
            OrderID: 1007,
            Amount: 3200,
            Order_Date: "2024-03-25",
            Payment: "Credit Card",
            Billing_Name: "Daniel Martinez",
            Status: "Delivered",
        },
        {
            OrderID: 1008,
            Amount: 1100,
            Order_Date: "2024-03-28",
            Payment: "Apple Pay",
            Billing_Name: "Olivia Taylor",
            Status: "Shipped",
        },
        {
            OrderID: 1009,
            Amount: 850,
            Order_Date: "2024-03-30",
            Payment: "Credit Card",
            Billing_Name: "James Anderson",
            Status: "Processing",
        },
        {
            OrderID: 1010,
            Amount: 500,
            Order_Date: "2024-03-31",
            Payment: "PayPal",
            Billing_Name: "Emma Thomas",
            Status: "Pending",
        },
    ],
};

export default function Page() {
    return <OrderHistory orders={orders.orders} />;
}
