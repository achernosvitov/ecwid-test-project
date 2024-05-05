type Left<T> = {
	left: T
	right?: never
}

type Right<T> = {
	left?: never
	right: T
}

export type Either<L, R> = NonNullable<Left<L> | Right<R>>

export function isLeft<L, R>(e: Either<L, R>): e is Left<L> {
	return e.left !== undefined
}

export function isRight<L, R>(e: Either<L, R>): e is Right<R> {
	return e.right !== undefined
}

export function makeLeft<L>(value: L): Left<L> {
	return {
		left: value,
	}
}

export function makeRight<R>(value: R): Right<R> {
	return {
		right: value,
	}
}
