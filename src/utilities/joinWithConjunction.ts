export default function joinWithConjunction(
  values: string[],
  conjunction: string,
): string {
  if (values.length === 0) {
    return '';
  }

  if (values.length === 1) {
    return values.at(0) ?? '';
  }

  const lastValue = values.pop();
  const oxfordComma = values.length > 1 ? ',' : '';

  return `${values.join(', ')}${oxfordComma} ${conjunction} ${lastValue}`;
}
