import Slime from '../entities/slimes';
import BaseRepository from './repository-base';

export default class SlimeRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async listSlimes(): Promise<Slime[]> {
    const slimes: Slime[] = [];

    for await (const data of this.mapper.scan(Slime, {})) {
      slimes.push(data);
    }

    return slimes;
  }

  public async getSlime(username: string, fields: string[] = []): Promise<Slime> {
    const slimes: Slime[] = [];

    const options: any = {};

    if (fields.length > 0) {
      options.projection = fields;
    }

    for await (const slime of this.mapper.query(
        Slime,
        { username },
        options,
      )
    ) {
      slimes.push(slime);
    }

    return slimes[0];
  }
}
