import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Optional } from '../../../../core/types/optional'

export interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updateAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  private touch() {
    this.props.updateAt = new Date()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  /**
   *  Instanciando a class dentro do metodo statico para fazer
   *  a criação de algumas propriedades de forma direta
   */
  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
