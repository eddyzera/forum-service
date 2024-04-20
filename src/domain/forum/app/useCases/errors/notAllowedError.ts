import { UseCaseError } from '../../../../../core/error/useCaseError'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
