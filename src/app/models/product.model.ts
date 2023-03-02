export interface Category {
  id: string;
  name: string;
}


export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?:number;
  taxes2?:number;
}

export interface CreateProductDTO extends  Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
}
