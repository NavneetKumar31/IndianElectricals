export class Product {
    _id?: string;
    name?: string;
    description?: string;
    productImage?: string;
    category?: string;
    subcategory?: string;
    manufacture_details = new ManufactureDetails();
    shiping_details = new ShipingDetails();
    vendor_details?: VendorDetails[] = [];
    pricing_details = new PricingDetails();
    stock_details = new StockDetails();
    technical_details?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isSelected?: Boolean = false;

    constructor() {}
}

export class ManufactureDetails {
    model?: string;
    brand?: string;
    release_date?: Date;

    constructor() { }
}

export class ShipingDetails {
    weight?: string;
    height?: string;
    width?: string;
    depth?: string;

    constructor() { }
}

export class VendorDetails {
    _id?: string;
    name?: string;

    constructor() { }
}

export class PricingDetails {
    selling_price?: number;
    buying_price?: number;
    discount?: number;
    net_profit?: number;
    currency?: string;

    constructor() { }
}

export class StockDetails {
    current_stock?: string;
    alert?: string;

    constructor() { }
}