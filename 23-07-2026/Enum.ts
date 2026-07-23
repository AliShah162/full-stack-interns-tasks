// An enum (enumeration) is a way to define a set of named constants.
// Think of an enum like a drop-down menu with fixed options:
// Order Status: "Pending", "Processing", "Shipped", "Delivered"
// User Role: "Admin", "User", "Guest"

enum OrderStatus {
    Pending,    // 0
    Processing, // 1
    Shipped,    // 2
    Delivered   // 3
}

let status: OrderStatus = OrderStatus.Shipped;
console.log(status); // 2 (numeric value)

// Using enum
function getOrderStatus(status: OrderStatus): string {
    switch (status) {
        case OrderStatus.Pending:
            return "Your order is pending";
        case OrderStatus.Processing:
            return "Your order is being processed";
        case OrderStatus.Shipped:
            return "Your order has been shipped";
        case OrderStatus.Delivered:
            return "Your order has been delivered";
        default:
            return "Unknown status";
    }
}

console.log(getOrderStatus(OrderStatus.Shipped)); // "Your order has been shipped"


export {};