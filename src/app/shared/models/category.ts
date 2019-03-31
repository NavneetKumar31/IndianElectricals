export class Category {
  _id?: any;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  subCategories?: SubCategory[] = [];
  isSelected?: Boolean = false;

  constructor() { }
}

export class SubCategory {
  _id?: string;
  name?: string;
  description?: string;
  category?: object;
  createdAt?: Date;
  updatedAt?: Date;
  isSelected?: Boolean = false;

  constructor() {}
}