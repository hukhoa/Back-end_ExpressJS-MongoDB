/**
 * Simple method to convert a string to a slug
 *
 * Steps:
 * - normalize         : split accented characters into their base characters and diacritical marks
 * - remove accents    : remove all the accents (characters in the \u0300-\u036f unicode range)
 * - trim              : remove leading and trailing whitespace
 * - lowercase         : convert all characters to lowercase
 * - clean characters  : remove non-alphanumeric characters (except space and hyphen)
 * - hyphenate spaces  : replace spaces with hyphens
 * - collapse hyphens  : merge multiple consecutive hyphens into one
 */
export const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Example:
const test = 'Huuw_Khoa 2004'
const slug = slugify(test)

console.log('Input:', test)
console.log('Output:', slug)
*/

/**
 * Results:

 * Input: 'Huuw_Khoa 2004'
 * Output: Huuw-Khoa-2004
 */
