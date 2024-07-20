import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async save(question: Question): Promise<void> {
    const index = this.items.findIndex((q) => q.id === question.id)
    this.items[index] = question
  }

  async findById(id: string): Promise<Question | null> {
    return this.items.find((question) => question.id.toString() === id) || null
  }

  public items: Question[] = []

  async findBySlug(slug: string) {
    return this.items.find((question) => question.slug.value === slug) || null
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex((q) => q.id === question.id)
    this.items.splice(index, 1)
  }
}
