import { search, OrganicResult } from 'google-sr';

(async () => {
  try {
    console.log('Searching Google for: "IBPS PO exam 2026 notification dates"...');
    const queryResult = await search({
      query: 'IBPS PO exam 2026 notification dates',
      safeMode: false
    });

    console.log(`Found ${queryResult.length} results:`);
    for (const r of queryResult.slice(0, 5)) {
      console.log(`\n• [${r.type}] ${r.title}`);
      console.log(`  Link: ${r.link}`);
      console.log(`  Description: ${r.description}`);
    }
  } catch (err) {
    console.error('google-sr error:', err);
  }
})();
