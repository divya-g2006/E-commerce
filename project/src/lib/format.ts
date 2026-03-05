export const formatINR = (amount: number) => {
  const safe = Number.isFinite(amount) ? amount : 0;
  return `₹${safe.toLocaleString('en-IN')}`;
};
