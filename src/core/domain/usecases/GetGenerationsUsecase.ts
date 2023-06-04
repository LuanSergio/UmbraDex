import Generation from '@domain/entities/Generation';
import GenerationRepository from '@domain/repository/GenerationRepository';
import { Either } from '@core/Either';

class GetGenerationsUsecase {
  constructor(private readonly generationRepository: GenerationRepository) {}

  async getAll(): Promise<Either<Error, Generation[]>> {
    return this.generationRepository.getAll();
  }
}

export default GetGenerationsUsecase;
