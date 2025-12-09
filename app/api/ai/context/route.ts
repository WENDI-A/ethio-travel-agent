import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Tour from '@/models/Tour';

function formatPrice(n: number | string): string {
  const num = typeof n === 'string' ? Number(n) : n;
  if (!isFinite(num as number)) return '$0';
  return `${num}`;
}

function pluralizeDay(n: number): string {
  return `${n} day${n === 1 ? '' : 's'}`;
}

export async function GET() {
  try {
    await dbConnect();

    const cities = await City.find({}, 'name description attractions').lean();
    const toursRaw = await Tour.find({}, 'title description price duration cityId').populate('cityId', 'name').lean();

    // Build structured context
    const contextStructured = {
      cities: (cities || []).map((c: any) => ({
        name: c.name,
        location: `${c.name}, Ethiopia`,
        attractions: (c.attractions || []).map((a: any) => ({
          name: a.name,
          price: formatPrice(a.price),
          rating: a.rating,
        }))
      })),
      tours: (toursRaw || []).map((t: any) => ({
        title: t.title,
        cityName: t.cityId?.name || 'Unknown',
        price: formatPrice(t.price),
        duration: pluralizeDay(Number(t.duration) || 0),
      }))
    };

    // Create preformatted message chunks for simulated typing
    const chunks: string[] = [];
    chunks.push('…');
    chunks.push('I will share the available cities, their top attractions, and our tours with prices and durations.');

    if (contextStructured.cities.length) {
      chunks.push('…');
      const cityList = contextStructured.cities.map(c => `- ${c.name} — ${c.location}`).join('\n');
      chunks.push(`Cities and locations:\n${cityList}`);

      contextStructured.cities.forEach((c) => {
        if (c.attractions?.length) {
          const attrs = c.attractions.map(a => `${a.name} — ${a.price} (${a.rating})`).join(', ');
          chunks.push('…');
          chunks.push(`Top attractions in ${c.name}: ${attrs}`);
        }
      });
    }

    if (contextStructured.tours.length) {
      chunks.push('…');
      const tourLines = contextStructured.tours.map(t => `- ${t.title} — ${t.duration}, ${t.price} (${t.cityName})`).join('\n');
      chunks.push(`Tours:\n${tourLines}`);
    }

    const systemPreamble = [
      'You are Ethio-Travel’s AI assistant.',
      'You only answer using the provided site data about tours, hotels, services, and travel info.',
      'Do not use any AI model or external knowledge.',
      'Always respond in full, human-like sentences, concise, and polite.',
      'If the user asks about something not in the data, reply:',
      '“I’m sorry, I don’t have that information.”',
    ].join('\n');

    const contextText = [
      systemPreamble,
      '',
      'Here is the site data to use (derived from the database):',
      '',
      'CITIES:',
      ...contextStructured.cities.map(c => `- ${c.name}: ${c.attractions?.length || 0} attractions`),
      '',
      'TOURS:',
      ...contextStructured.tours.map(t => `- ${t.title} (${t.cityName}): ${t.duration}, ${t.price}`)
    ].join('\n');

    return NextResponse.json({
      context: contextText,
      contextStructured,
      messageChunks: chunks,
    });
  } catch (error) {
    console.error('Error building AI context:', error);
    return NextResponse.json({
      context: 'I’m sorry, I don’t have that information.',
      contextStructured: { cities: [], tours: [] },
      messageChunks: ['I’m sorry, I don’t have that information.']
    });
  }
}
