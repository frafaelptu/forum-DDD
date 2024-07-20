import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  async findManyQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    return this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((a) => a.id === answer.id)
    this.items[index] = answer
  }

  async findById(id: string): Promise<Answer | null> {
    return this.items.find((answer) => answer.id.toString() === id) || null
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((a) => a.id === answer.id)
    this.items.splice(index, 1)
  }

  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
