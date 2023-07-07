import { checkEnvironment } from '@/config/data';
import { QuoteForm } from './quote-form';
import Papa from 'papaparse';

const parseData = (data: any) => {
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      complete: (results, file) => {
        const response = results.data;
        resolve(response);
      },
      error: (error, file) => {
        reject(error.message);
      },
    });
  });
};

async function getData() {
  const res = await fetch(checkEnvironment().concat('/api'), {
    next: { revalidate: 3600 }, // revalidate every hour
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  const response = await parseData(data.response);
  return response;
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 gap-3">
      <QuoteForm content={data} />
    </div>
  );
}
