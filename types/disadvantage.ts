export interface Disadvantage {
    title: string;
    price: number;
    area: "feet" | "hands" | "head" | "torso" | "legs" | "arms" | "back" | "neck" | "face" | "other" | "together"
    amount: number;
}