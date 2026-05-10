const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to http://127.0.0.1:1111/resume...');
  await page.goto('http://127.0.0.1:1111/resume', { waitUntil: 'networkidle0' });

  // Hide UI elements that shouldn't be in the PDF
  await page.evaluate(() => {
    const noPrintElements = document.querySelectorAll('.no-print');
    noPrintElements.forEach(el => el.style.display = 'none');
  });

  console.log('Generating vector PDF...');
  await page.pdf({
    path: 'static/Nam_Dang_CV.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.4in',
      bottom: '0.4in',
      left: '0.4in',
      right: '0.4in'
    }
  });

  await browser.close();
  console.log('Success! PDF saved to static/Nam_Dang_CV.pdf');
})();
