export default function FormatPhone(value?: string | null): string {
  if (!value) {
    return "";
  }

  const digitsOnly = value.replace(/\D/g, "");
  const { length } = digitsOnly;

  if (length === 0) {
    return "";
  }

  if (length > 11) {
    const ddi = digitsOnly.slice(0, 2);
    const ddd = digitsOnly.slice(2, 4);

    const isMobile = (length - 4) === 9;

    const firstPart = isMobile ? digitsOnly.slice(4, 9) : digitsOnly.slice(4, 8);
    const secondPart = isMobile ? digitsOnly.slice(9) : digitsOnly.slice(8);

    return `+${ddi} (${ddd}) ${firstPart}-${secondPart}`;
  }

  if (length === 11) {
    const ddd = digitsOnly.slice(0, 2);
    const firstPart = digitsOnly.slice(2, 7);
    const secondPart = digitsOnly.slice(7);

    return `(${ddd}) ${firstPart}-${secondPart}`;
  }

  const ddd = digitsOnly.slice(0, 2);
  const firstPart = digitsOnly.slice(2, 6);
  const secondPart = digitsOnly.slice(6, 10);

  let formattedText = `(${ddd})`;

  if (length > 2) {
    formattedText += ` ${firstPart}`;
  }
  if (length > 6) {
    formattedText += `-${secondPart}`;
  }

  return formattedText;
}