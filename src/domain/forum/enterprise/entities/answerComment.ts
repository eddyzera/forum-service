import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Optional } from '../../../../core/types/optional'
import { Comment, CommentProps } from '../../../../core/entities/comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  /**
   *  Instanciando a class dentro do metodo statico para fazer
   *  a criação de algumas propriedades de forma direta
   */
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
