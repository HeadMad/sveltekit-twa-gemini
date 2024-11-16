export default function(arr, handler) {
  if (typeof handler !== 'function') throw new Error('handler must be a function');
  const before = [];
  for (let i = 0; i < arr.length; i++)
    if (handler(arr[i], i, before))
      before.push(arr[i]);

  return before;
}