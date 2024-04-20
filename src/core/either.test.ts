import { describe, expect, it } from 'vitest'
import { Either, left, right } from './either'

const doSomething = (shouldSuccess: boolean): Either<string, string> => {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('should return a success result', () => {
    const successResult = doSomething(true)

    expect(successResult.isRight()).toBe(true)
    expect(successResult.isLeft()).toBe(false)
  })

  it('should return a error result', () => {
    const errorResult = doSomething(false)

    expect(errorResult.isRight()).toBe(false)
    expect(errorResult.isLeft()).toBe(true)
  })
})
