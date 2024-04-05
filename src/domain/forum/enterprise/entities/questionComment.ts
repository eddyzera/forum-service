import { UniqueEntityId } from '../../../../core/entities/uniqueEntityId'
import { Optional } from '../../../../core/types/optional'
import { Comment, CommentProps } from '../../../../core/entities/comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  /**
   *  Instanciando a class dentro do metodo statico para fazer
   *  a criação de algumas propriedades de forma direta
   */
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
