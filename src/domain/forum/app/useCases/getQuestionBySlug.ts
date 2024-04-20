import { Either, left, right } from '../../../../core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repository/questionRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

export interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

export type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
