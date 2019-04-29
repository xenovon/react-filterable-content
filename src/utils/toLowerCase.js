export const toLowerCase = (text, config) => {
  if(!config){
    return text;
  }
  if(typeof text === 'string' && !config.caseSensitive){
    return text.toLowerCase();
  }
  return text;
}