export type Shop = {
    storeId: string;
    sellerUid: string;
    storeName: string;
    status: 'pending' | 'approved'| 'rejected'| 'archieved'; 
    otherFields: any; 
}

export type Product = {
    productId: string;
    storeId: string;
    name: string;
    price: number;
}

export type ProductList = Product[];

export type Cart = {
    cartId: string;
    uid: string;
    productId: string;
    quantity: number;
}

export type Order = {
    orderId: string;
    uid: string;
    productId: string;
    quantity: number;
    orderDate: Date;
}
