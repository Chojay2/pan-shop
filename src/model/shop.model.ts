export type Shop = {
    storeId: string;
    sellerUid: string;
    storeName: string;
    status: ShopStatus 
    img: string; 
}

export enum ShopStatus  {
    pending = 'pending',
    approved = "approved",
    rejected = "rejected",
    archieved ="archived"
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
