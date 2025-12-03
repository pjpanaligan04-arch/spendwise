export function formatPeso(value) {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(num);
}

export default formatPeso;
