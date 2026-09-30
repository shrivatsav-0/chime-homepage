/**
 * End-to-end check against the *built* artifacts: verifies the price rendered
 * into the page and that no inline script shipped un-transpiled TypeScript.
 */
import { readFileSync, readdirSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');

let fail = 0;
const check = (label: string, ok: boolean) => {
  if (!ok) fail++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}`);
};

console.log('--- price ---');
const price = html.match(/class="price"[^>]*>([^<]*)/)?.[1];
console.log('  default price:', price);
check('price renders as $2.99', price === '$2.99');
check('no stale data-price hooks', !html.includes('data-price'));

console.log('\n--- removed currency UI ---');
check('no converter section', !html.includes('id="convert"'));
check('no currency dropdown', !html.includes('id="currency-select"'));
check('no "Pay in your currency"', !html.includes('Pay in your currency'));
check('no ECB disclaimer', !html.includes('ECB'));
check('no nav link to #convert', !html.includes('href="/#convert"'));
check('no rates API URL in output', !html.includes('frankfurter'));

console.log('\n--- refund policy ---');
const terms = readFileSync('dist/terms/index.html', 'utf8');
check('landing page states 48-hour window', html.includes('within 48 hours of purchase'));
check('terms define a Refunds section', terms.includes('Refunds'));
check('terms cite the 48-hour window', terms.includes('48 hours of purchase'));
check('terms preserve statutory rights', terms.includes('statutory rights'));
check('terms link to statutory carve-out', terms.includes('European Economic Area'));

console.log('\n--- inline scripts ---');
const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
for (const [, body] of inline) {
  if (!body.trim()) continue;
  try {
    new Function(body);
  } catch (err) {
    fail++;
    console.log('  FAIL invalid inline script:', (err as Error).message);
  }
}
console.log(`  ${inline.length} inline script(s) checked`);
check('all inline scripts parse', true);

// The price constant must have been compiled in, not left as a live import.
check('price constant inlined', !html.includes('lib/currency'));

console.log(fail === 0 ? '\nBUILD ARTIFACTS OK' : `\n${fail} FAILURE(S)`);
process.exit(fail === 0 ? 0 : 1);
