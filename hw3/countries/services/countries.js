async function getCountries() {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;
  if (!apiKey) {
    throw new Error('Add REST_COUNTRIES_API_KEY to countries/.env.');
  }

  const countries = [];
  let offset = 0;
  let more = true;

  // The API returns up to 100 countries per request.
  while (more) {
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!response.ok) {
      throw new Error(`Could not load countries. API status: ${response.status}`);
    }

    const result = await response.json();
    if (result.data?._demo) {
      throw new Error('The demo key only returns a sample. Please use your own API key.');
    }
    if (!Array.isArray(result.data?.objects) || typeof result.data?.meta?.more !== 'boolean') {
      throw new Error('The API returned unexpected data.');
    }

    result.data.objects.forEach((country) => {
      countries.push(country || {});
    });

    more = result.data.meta.more;
    if (more && result.data.objects.length === 0) {
      throw new Error('The API did not return the next page of countries.');
    }
    offset += result.data.objects.length;
  }

  countries.sort((a, b) => {
    const firstName = a.names?.common || 'Unnamed country';
    const secondName = b.names?.common || 'Unnamed country';
    return firstName.localeCompare(secondName);
  });

  return countries;
}

module.exports = getCountries;
