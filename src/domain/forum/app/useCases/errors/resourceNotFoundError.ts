import { UseCaseError } from '../../../../../core/error/useCaseError'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
