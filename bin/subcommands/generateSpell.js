import path from 'path';
import jsonfile from 'jsonfile';
import WordPOS from 'wordpos';
const wordpos = new WordPOS();

const generateSpell = (program) => {
  program
    .command('generateSpell')
    .description('Generates new D&D 5e spells by replacing words in existing ones.')
    .action(main);
}

const main = () => {
  const spellListPath = path.join(process.cwd(), 'data', 'spellList.json');
  jsonfile.readFile(spellListPath, (error, obj) => {
    if (error) {
      console.error(error);
      return;
    }
    
    const spellList = obj.spells.filter(spell => spell.split(' ').length != 1);
    createSpellFromList(spellList);
  });
}

const createSpellFromList = async (spellList) => {
  const spellName = randomItem(spellList);
  const words = spellName.split(' ');
  const originalWord = randomItem(words); // Word we will replace
  const lookupResult = await wordpos.lookup(originalWord);
  if (lookupResult.length === 0) {
    console.warn(`Failed to find dictionary entry for ${originalWord}.`);
    createSpellFromList(spellList);
    return;
  }
  const partOfSpeech = lookupResult[0].pos;
  const newWords = await randomWordsFromPartOfSpeech(partOfSpeech);
  const newSpellNames = newWords.map(newWord => spellName.replace(originalWord, newWord));
  
  console.log(`--- ${spellName}`);
  newSpellNames.forEach(newSpellName => console.log(`+++ ${newSpellName}`));
}

const randomItem = (list) => {
  return list[randomIndex(list)];
}

const randomIndex = (list) => {
  return Math.floor(Math.random() * list.length);
}

const randomWordsFromPartOfSpeech = async (partOfSpeech) => {
  if (partOfSpeech === 'r') {
    return wordpos.randAdverb({count:5}).then(processRandWords);
  } if (partOfSpeech === 'n') {
    return wordpos.randNoun({count:5}).then(processRandWords);
  } if (partOfSpeech === 's') {
    return wordpos.randAdjective({count:5}).then(processRandWords);
  } if (partOfSpeech === 'v') {
    return wordpos.randVerb({count:5}).then(processRandWords);
  } if (partOfSpeech === 'a') {
    return wordpos.randAdjective({count:5}).then(processRandWords);
  }
  return wordpos.rand().then(processRandWords);
}

const processRandWords = (words) => {
  return words.map(word => capitalize(convertUnderscores(word)));
}

const capitalize = (phrase) => {
  const words = phrase.split(' ');
  const capitalizedWords = words.map(word => word[0].toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

const convertUnderscores = (word) => {
  return word.replaceAll('_', ' ');
}

export default generateSpell;