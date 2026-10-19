(() => {
  'use strict';
  const root = document.querySelector('[data-bhagavatam-reader]');
  if (!root) return;
  const host = root.querySelector('[data-bhagavatam-host]');
  const canto = Number(root.dataset.canto);
  const pin = '100560de6c9f68c2875097d40a2012a84c784179';
  if (!host || !Number.isInteger(canto)) return;

  const paths = ['/advaita/assets/data/bhagavatam-sridhara-wfw-reviewed.json?v=20261003-literal-tatraha-1'];
  if (canto === 1 || canto === 2)
    paths.push('/advaita/assets/data/bhagavatam-sridhara-wfw-cantos01-02-additions-20260916.json?v=20260916-1');
  if (canto === 3) paths.push(
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch01-verses01-45.json?v=20260930-c3-ch1-11-12-15-16-18-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch02-verses01-34.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch03-verses01-27.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch04-verses01-34.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch05-verses01-49.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch06-verses01-40.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch07-verses01-42.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch08-verses01-33.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch09-verses01-43.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch10-verses01-25.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch11-verses01-41.json?v=20260930-c3-ch1-11-12-15-16-18-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch12-verses01-56.json?v=20260930-c3-ch1-11-12-15-16-18-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch13-verses01-49.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch14-verses01-50.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch15-verses01-50.json?v=20260930-c3-ch1-11-12-15-16-18-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch16-verses01-37.json?v=20260930-c3-ch1-11-12-15-16-18-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch17-verses01-30.json?v=20260929-c3-ch17-repair-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch18-verses01-28.json?v=20260930-c3-ch1-11-12-15-16-18-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch19-verses01-38.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch20-verses01-51.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch21-verses01-52.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch22-verses01-38.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch23-verses01-53.json?v=20260930-c3-ch23-range-coverage-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch24-verses01-43.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch25-verses01-39.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch26-verses01-63.json?v=20260929-c3-complete-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch27-verses01-25.json?v=20260929-c3-ch27-repair-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch28-verses01-38.json?v=20260930-c3-ch28-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch29-verses01-42.json?v=20260930-c3-ch29-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch30-verses01-31.json?v=20260930-c3-ch30-commentary-restore-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch31-verses01-42.json?v=20260930-c3-ch31-range-coverage-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch32-verses01-43.json?v=20260930-c3-ch32-no-commentary-classification-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto3-ch33-verses01-37.json?v=20260930-c3-ch32-33-commentary-restore-1'
  );
  if (canto === 10) paths.push(
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch01-verses01-69.json?v=20260919-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch02-verses01-42.json?v=20260919-2',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch03-verses01-53.json?v=20260919-3',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch04-verses01-46.json?v=20260919-4',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch05-verses01-32.json?v=20260919-5',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch06-verses01-44.json?v=20260919-6',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch07-verses01-37.json?v=20260919-7',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch08-verses01-52.json?v=20260919-8',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch09-verses01-23.json?v=20260919-9',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch10-verses01-43.json?v=20260919-10',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch11-verses01-59.json?v=20260919-11',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch12-verses01-44.json?v=20260919-12',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch13-verses01-64.json?v=20260919-13',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch14-verses01-61.json?v=20260919-14',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch15-verses01-53.json?v=20260919-15',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch16-verses01-67.json?v=20260919-16',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch17-verses01-25.json?v=20260919-17',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch18-verses01-32.json?v=20260919-18',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch19-verses01-16.json?v=20260919-19',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch20-verses01-49.json?v=20260919-20',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch21-verses01-20.json?v=20260919-21',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch22-verses01-38.json?v=20260919-22',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch23-verses01-52.json?v=20260919-23',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch24-verses01-38.json?v=20260919-24',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch25-verses01-33.json?v=20260919-25',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch26-verses01-25.json?v=20260919-26',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch27-verses01-28.json?v=20260919-27',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch28-verses01-17.json?v=20260919-28',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch29-verses01-48.json?v=20260919-29',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch30-verses01-44.json?v=20260919-30',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch31-verses01-19.json?v=20260919-31',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch32-verses01-22.json?v=20260919-32',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch33-verses01-39.json?v=20260921-33',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch34-verses01-32.json?v=20260921-34',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch35-verses01-26.json?v=20260921-35',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch36-verses01-40.json?v=20260921-36',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch37-verses01-34.json?v=20260922-37',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch38-verses01-43.json?v=20260922-38'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch39-verses01-57.json?v=20260922-39',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch40-verses01-30.json?v=20260922-40',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch41-verses01-52.json?v=20260922-41',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch42-verses01-38.json?v=20260922-42',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch59-verses01-37.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch69-verses01-41.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch79-verses01-34.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch86-verses01-52.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch90-verses01-42.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch89-verses01-64.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch88-verses01-37.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch87-verses01-49.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch85-verses01-57.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch84-verses01-68.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch83-verses01-42.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch82-verses01-47.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch81-verses01-40.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch80-verses01-43.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch78-verses01-32.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch77-verses01-33.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch76-verses01-30.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch75-verses01-38.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch74-verses01-54.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch73-verses01-34.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch72-verses01-45.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch71-verses01-46.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch70-verses01-47.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch68-verses01-52.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch67-verses01-28.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch66-verses01-43.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch65-verses01-24.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch64-verses01-44.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch63-verses01-53.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch62-verses01-35.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch61-verses01-39.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch60-verses01-50.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch58-verses01-54.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch57-verses01-30.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch56-verses01-43.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch55-verses01-38.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch54-verses01-51.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch53-verses01-16.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch52-verses01-31.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch51-verses01-62.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch50-verses01-55.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch49-verses01-31.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch48-verses01-36.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch47-verses01-68.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch46-verses01-47.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch45-verses01-49.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch44-verses01-51.json?v=20260922-c10-audit2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto10-ch43-verses01-40.json?v=20260922-c10-audit2'
  );
  if (canto === 11) {
    paths.push(
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch01-reviewed.json?v=20260917-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch01-verses02-03.json?v=20260916-2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch01-verses04-05.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch01-verses06-07.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch01-verses08-10.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch01-verses11-24.json?v=20260916-3',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch02-verses01-10.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch02-verses11-21.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch02-verses22-31.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch02-verses32-34.json?v=20260916-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch02-verses35-55.json?v=20260917-1'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch03-verses01-55.json?v=20260917-1'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch04-verses01-23.json?v=20260917-1'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch05-verses01-52.json?v=20260917-1'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch06-verses01-50.json?v=20260930-c11-ch06-commentary-restore-1'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch07-verses01-74.json?v=20260917-1'
      ,'/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch08-verses01-44.json?v=20260917-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch09-verses01-33.json?v=20260917-2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch10-verses01-37.json?v=20260917-2',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch11-verses01-49.json?v=20260929-c11-gloss-accuracy-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch12-verses01-24.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch13-verses01-42.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch14-verses01-46.json?v=20261014-c11-no-commentary-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch15-verses01-36.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch16-verses01-44.json?v=20261014-c11-no-commentary-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch17-verses01-58.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch18-verses01-48.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch19-verses01-45.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch20-verses01-37.json?v=20260929-c11-gloss-accuracy-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch21-verses01-43.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch22-verses01-61.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch23-verses01-62.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch24-verses01-29.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch25-verses01-36.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch26-verses01-35.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch27-verses01-55.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch28-verses01-44.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch29-verses01-49.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch30-verses01-50.json?v=20260918-1',
      '/advaita/assets/data/bhagavatam-sridhara-wfw-canto11-ch31-verses01-28.json?v=20260918-1'
    );
  }

  if (canto === 12) paths.push(
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch01.json?v=20260922-c12-1',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch02.json?v=20260922-c12-2',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch03.json?v=20260922-c12-3',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch04.json?v=20260922-c12-4',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch05.json?v=20260922-c12-5',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch06.json?v=20260922-c12-6',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch07.json?v=20260922-c12-7',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch08.json?v=20260922-c12-8',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch09.json?v=20260922-c12-9',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch10.json?v=20260922-c12-10',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch11.json?v=20260922-c12-11-2',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch12.json?v=20260922-c12-12-2',
    '/advaita/assets/data/bhagavatam-sridhara-wfw-canto12-ch13.json?v=20260922-c12-13'
  );

  const reviewed = Promise.all(paths.map((path) =>
    fetch(path, { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Reviewed Śrīdhara meanings HTTP ' + response.status);
        return response.json();
      })
      .then((data) => data.source_commit === pin && Array.isArray(data.entries) ? data.entries : [])
  )).then((parts) => parts.flat().map((entry) => ({
    canto: Number(entry.canto),
    chapter: Number(entry.chapter),
    start: Number(entry.start),
    end: Number(entry.end || entry.start),
    pairs: Array.isArray(entry.pairs) ? entry.pairs : entry.word_for_word,
    literal: String(entry.literal_english || '').trim(),
    sourceGap: Boolean(entry.source_gap),
    translationPending: Boolean(entry.translation_pending)
  }))).catch((error) => {
    console.warn('Reviewed Śrīdhara word meanings unavailable:', error);
    return [];
  });

  function range(section, chapter) {
    const match = section.id.match(/^sb-(\d+)-(\d+)-(\d+)(?:-(\d+))?$/);
    if (!match || Number(match[1]) !== canto || Number(match[2]) !== chapter) return null;
    return [Number(match[3]), Number(match[4] || match[3])];
  }

  function noCommentary(pairs) {
    return Array.isArray(pairs) && pairs.length > 0 && pairs.every((pair) =>
      Array.isArray(pair) && (/No commentary/i.test(String(pair[1] || '')) ||
        /न व्याख्यातम्/.test(String(pair[0] || ''))));
  }

  function pairsParagraph(pairs) {
    if (noCommentary(pairs)) return { empty: true, node: null };
    const paragraph = document.createElement('p');
    paragraph.className = 'gita-wfw-list';
    pairs.forEach((pair, index) => {
      if (!Array.isArray(pair) || pair.length !== 2) return;
      if (index) paragraph.appendChild(document.createTextNode('; '));
      const original = document.createElement('strong');
      original.lang = 'sa-Deva';
      original.textContent = pair[0];
      paragraph.append(original, document.createTextNode(' — ' + pair[1]));
    });
    return { empty: false, node: paragraph };
  }

  function makeSridharaSection(entry) {
    const section = document.createElement('div');
    section.className = 'gita-dual-section gita-dual-sridhara';
    const label = document.createElement('div');
    label.className = 'gita-dual-label';
    label.textContent = 'Śrīdhara';
    if (entry.sourceGap) {
      const paragraph = document.createElement('p');
      paragraph.className = 'gita-dual-empty';
      paragraph.textContent = 'Source gap.';
      section.append(label, paragraph);
      return section;
    }
    const pairs = Array.isArray(entry.pairs) ? entry.pairs : [];
    const result = pairsParagraph(pairs);
    section.append(label);
    if (result.empty) {
      const paragraph = document.createElement('p');
      paragraph.className = 'gita-dual-empty';
      paragraph.textContent = entry.translationPending && !noCommentary(pairs)
        ? 'Word-for-word gloss pending review.'
        : 'No commentary.';
      section.appendChild(paragraph);
      return section;
    }
    section.appendChild(result.node);
    if (entry.translationPending) {
      const pending = document.createElement('p');
      pending.className = 'gita-dual-empty';
      pending.textContent = 'Word-for-word gloss review pending.';
      section.appendChild(pending);
    }
    return section;
  }

  function ensureCommentary(section, text) {
    if (!text || section.querySelector('.gita-commentary')) return;
    const commentary = document.createElement('section');
    commentary.className = 'gita-commentary';
    const heading = document.createElement('h3');
    heading.textContent = 'Śrīdhara’s Commentary';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    commentary.append(heading, paragraph);
    section.appendChild(commentary);
  }

  const explicitNoCommentary = new Set(['1:18:38', '11:1:20', '11:2:3', '11:3:22', '11:4:23', '11:5:17', '11:5:23', '11:5:51', '11:6:2', '11:6:3', '11:6:6', '11:6:7', '11:6:13', '11:6:14', '11:6:15', '11:6:20', '11:6:23', '11:6:24', '11:6:25', '11:6:26', '11:6:27', '11:6:28', '11:6:31', '11:6:32', '11:6:33', '11:6:34', '11:6:39', '11:6:40', '11:6:41', '11:6:43', '11:6:44', '11:6:47', '11:6:50', '11:7:2', '11:7:6', '11:7:13', '11:7:15', '11:7:25', '11:7:31', '11:7:56', '11:7:59', '11:7:62', '11:7:65', '11:7:69', '11:7:70', '11:7:73']);

  function apply() {
    const shell = host.querySelector('.sb-chapter-shell[data-chapter]');
    if (!shell) return;
    const chapter = Number(shell.dataset.chapter);
    const sections = Array.from(shell.querySelectorAll('.sb-verse-section'));
    if (!sections.length) return;
    reviewed.then((entries) => {
      if (!shell.isConnected || host.querySelector('.sb-chapter-shell') !== shell) return;
      const chapterEntries = entries.filter((entry) => entry.canto === canto && entry.chapter === chapter);
      sections.forEach((section) => {
        const bounds = range(section, chapter);
        const details = section.querySelector('.gita-controls > details');
        if (!bounds || !details || details.querySelector('.gita-dual-sridhara')) return;
        const matching = chapterEntries.filter((candidate) =>
          candidate.start <= bounds[1] && candidate.end >= bounds[0]);
        const explicitKey = canto + ':' + chapter + ':' + bounds[0];
        if (!matching.length && !explicitNoCommentary.has(explicitKey) && canto !== 10) return;
        const resolved = matching.length === 1 ? matching[0] : matching.length > 1 ? {
          pairs: matching.flatMap((candidate) => Array.isArray(candidate.pairs) ? candidate.pairs : []),
          literal: matching.map((candidate) => candidate.literal).filter(Boolean).join('\\n\\n'),
          sourceGap: matching.some((candidate) => candidate.sourceGap),
          translationPending: matching.some((candidate) => candidate.translationPending)
        } : explicitNoCommentary.has(explicitKey) ? {
          pairs: [['न व्याख्यातम्', 'No commentary']],
          literal: 'No commentary'
        } : {
          pairs: [],
          literal: '',
          sourceGap: false,
          translationPending: true
        };
        const reveal = details.querySelector('.gita-reveal');
        if (!reveal) return;
        reveal.appendChild(makeSridharaSection(resolved));
        if (!resolved.sourceGap && !noCommentary(resolved.pairs) && resolved.literal &&
            !/^no commentary\.?$/i.test(resolved.literal.trim())) {
          ensureCommentary(section, resolved.literal);
        }
      });
    });
  }

  new MutationObserver(apply).observe(host, { childList: true, subtree: true });
  apply();
})();