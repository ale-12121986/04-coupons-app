export interface ICouponData{
    IdProduct: number;
    img: string;
    name: string;
    category: string;
    discount: number;
    active?: boolean;
}


export class Coupon{
    private _IdProduct!: number;
    private _img!: string;
    private _name!: string;
    private _category!: string;
    private _discount!: number;
    private _active!: boolean;

    constructor(data: ICouponData){
        this._IdProduct = data.IdProduct;
        this._img = data.img;
        this._name = data.name;
        this._category = data.category;
        this._discount = data.discount;
        this._active = data.active ?? true;
    }
    public get IdProduct(): number {
        return this._IdProduct;
    }
    public set IdProduct(value: number) {
        this._IdProduct = value;
    }

    public get img(): string {
        return this._img;
    }
    public set img(value: string) {
        this._img = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get category(): string {
        return this._category;
    }
    public set category(value: string) {
        this._category = value;
    }

    public get discount(): number {
        return this._discount;
    }
    public set discount(value: number) {
        this._discount = value;
    }

    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

    isEquals(coupon: Coupon){
        return this._IdProduct== coupon._IdProduct;
    }

    isValid(){
        return !! (this._IdProduct && this._name && this._category && this._discount);
    }

    toCouponData(){
        return {
            IdProduct: this._IdProduct,
            img: this._img,
            name: this._name,
            category: this._category,
            discount: this._discount,
            active: this._active
        } as ICouponData;
    }
}