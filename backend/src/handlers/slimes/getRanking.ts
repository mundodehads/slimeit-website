import Slime from '../../domain/entities/slimes';
import SlimeRepository from '../../domain/repositories/slimes-repository';

async function listSlimes(): Promise<Slime[]> {
  const slimeRepository = new SlimeRepository();

  return slimeRepository.listSlimes();
}

function generateRanking(slimes: Slime[]): string[] {
  const sortedSlimes = slimes
    .sort((slimeA, slimeB) => slimeB.slimeData.experience - slimeA.slimeData.experience)
    .map(slime => slime.username);

  return sortedSlimes.splice(0, 3);
}

export const handler = async (event: any) => {
  try {
    console.log('[slimeit-website-backend][getRanking][info]', event);
    const slimes = await listSlimes();
    const ranking = generateRanking(slimes);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify(ranking),
    };
  } catch (e) {
    console.log('[slimeit-website-backend][getRanking][error]', e.message);
    throw e;
  }
};
