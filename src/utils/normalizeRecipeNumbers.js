function re(regexp, flags = 'gi') {
  return new RegExp(regexp, flags); 
}

const startGroup = '(^|\\s|[-.])';

const endGroup = '([-,.!:;)]|\\s|$)';

const numberVariantsReplacements = [
  [/Ё/g, 'Е'], [/ё/g, 'е'],
  [/(\d)-(й|х|ух|ех|ти)(\s|$)/gi, '$1$3'],

  [re(startGroup + '(1\/2|половин[ауе]|с половиной|одн[ау] втор[аяую])' + endGroup), '$1'+'0.5'+'$3'],
  [re(startGroup + '(1\/4|одн[ау] четверть|четверть)' + endGroup), '$1'+'0.25'+'$3'],
  [re(startGroup + '(3\/4|три четверти)' + endGroup), '$1'+'0.75'+'$3'],
  [re(startGroup + '(1\/7|одн[ау] седьм[аяую])' + endGroup), '$1'+'0.14'+'$3'],
  [re(startGroup + '(1\/9|одн[ау] девят[аяую])' + endGroup), '$1'+'0.11'+'$3'],
  [re(startGroup + '(1\/10|одн[ау] десят[аяую]|десят[аяую])' + endGroup), '$1'+'0.1'+'$3'],
  [re(startGroup + '(1\/3|одн[ау] треть|треть)' + endGroup), '$1'+'0.33'+'$3'],
  [re(startGroup + '(2\/3|две трети)' + endGroup), '$1'+'0.66'+'$3'],
  [re(startGroup + '(1\/5|одн[ау] пят[аяую])' + endGroup), '$1'+'0.2'+'$3'],
  [re(startGroup + '(2\/5|две пятых)' + endGroup), '$1'+'0.4'+'$3'],
  [re(startGroup + '(3\/5|три пятых)' + endGroup), '$1'+'0.6'+'$3'],
  [re(startGroup + '(4\/5|четыре пятых)' + endGroup), '$1'+'0.8'+'$3'],
  [re(startGroup + '(1\/6|одн[ау] шест[аяую])' + endGroup), '$1'+'0.17'+'$3'],
  [re(startGroup + '(5\/6|пять шестых)' + endGroup), '$1'+'0.83'+'$3'],
  [re(startGroup + '(1\/8|одн[ау] восьм[аяую])' + endGroup), '$1'+'0.125'+'$3'],
  [re(startGroup + '(3\/8|три восьмых)' + endGroup), '$1'+'0.375'+'$3'],
  [re(startGroup + '(5\/8|пять восьмых)' + endGroup), '$1'+'0.625'+'$3'],
  [re(startGroup + '(7\/8|семь восьмых)' + endGroup), '$1'+'0.875'+'$3'],

  [re(startGroup + '(один|одного|одна|одной|одну|одно)' + endGroup), '$1'+'1'+'$3'],
  [re(startGroup + '(полтора)' + endGroup), '$1'+'1.5'+'$3'],
  [re(startGroup + '(два|две|двух)' + endGroup), '$1'+'2'+'$3'],
  [re(startGroup + '(три|трех)' + endGroup), '$1'+'3'+'$3'],
  [re(startGroup + '(четыре|четырех)' + endGroup), '$1'+'4'+'$3'],
  [re(startGroup + '(пять|пяти|пятерых)' + endGroup), '$1'+'5'+'$3'],
  [re(startGroup + '(шесть|шести|шестерых)' + endGroup), '$1'+'6'+'$3'],
  [re(startGroup + '(семь|семи|семерых)' + endGroup), '$1'+'7'+'$3'],
  [re(startGroup + '(восемь|восьми|восьмерых)' + endGroup), '$1'+'8'+'$3'],
  [re(startGroup + '(девять|девяти)' + endGroup), '$1'+'9'+'$3'],
  [re(startGroup + '(десять|десяти)' + endGroup), '$1'+'10'+'$3'],

  // пробел перед 0 нужен, чтобы дробные значения не смешивались с целыми (при их наличии)
  [/½/g, ' 0.5'],
  [/¼/g, ' 0.25'],
  [/¾/g, ' 0.75'],
  [/⅐/g, ' 0.14'],
  [/⅑/g, ' 0.11'],
  [/⅒/g, ' 0.1'],
  [/⅓/g, ' 0.33'],
  [/⅔/g, ' 0.66'],
  [/⅕/g, ' 0.2'],
  [/⅖/g, ' 0.4'],
  [/⅗/g, ' 0.6'],
  [/⅘/g, ' 0.8'],
  [/⅙/g, ' 0.17'],
  [/⅚/g, ' 0.83'],
  [/⅛/g, ' 0.125'],
  [/⅜/g, ' 0.375'],
  [/⅝/g, ' 0.625'],
  [/⅞/g, ' 0.875'],

  [/1-2/g, '1.5'],
  [/1-3/g, '2'],
  [/2-3/g, '2.5'],
  [/2-4/g, '3'],
  [/3-4/g, '3.5'],
  [/4-5/g, '4.5'],
  [/5-6/g, '5.5'],
  [/6-7/g, '6.5'],
  [/7-8/g, '7.5'],
  [/8-9/g, '8.5'],
  [/9-10/g, '9.5'],

  [/(\d),(\d)/g, '$1'+'.'+'$2'],

  // сшиваем целые и дробные значения, между которыми остался пробел
  [/(\d+)\s+0\.(\d)/g, '$1'+'.'+'$2'],

  [/ /g, ''],
  [/\(\s(\d)/g, '($1'],
];

export function normalizeRecipeNumbers(text, lang = 'ru') {
  if (lang !== 'ru') {
    return '';
  }

  for (const [regexp, replacement] of numberVariantsReplacements) {
    regexp.lastIndex = 0;
    text = text.replace(regexp, replacement);
  }

	return text; //.trim() //.toLowerCase()
}
