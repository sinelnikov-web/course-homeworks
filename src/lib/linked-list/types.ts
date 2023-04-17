import {Nullable} from "../../shared/types";

export interface ILinkedListNode<T> {
    value: T;
    next: Nullable<ILinkedListNode<T>>;
    prev: Nullable<ILinkedListNode<T>>;
}

export interface ILinkedList<T> {
    get first(): Nullable<ILinkedListNode<T>>;
    get last(): Nullable<ILinkedListNode<T>>;
    add(value: T): void;
    pop(): T;
}