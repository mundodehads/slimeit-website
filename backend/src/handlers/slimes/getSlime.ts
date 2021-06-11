import Slime from '../../domain/entities/slimes';
import SlimeRepository from '../../domain/repositories/slimes-repository';

async function getSlime(username: string): Promise<Slime> {
  const slimesRepository = new SlimeRepository();
  return slimesRepository.getSlime(username, ['currentlyPlayingAt', 'slimeData']);
}

export const handler = async (event: any) => {
  try {
    console.log('[slimeit-website-backend][getSlime][info]', event);
    const slime: Slime = await getSlime(event.pathParameters.username);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify(slime || {}),
    };
  } catch (e) {
    console.log('[slimeit-website-backend][getSlime][error]', e.message);
    throw e;
  }
};
