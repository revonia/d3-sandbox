export default async function (narrator) {
  let mod
  switch (narrator) {
    case 'digging-deeper-collection-dataset':
      mod = await import('../d3-basic/digging-deeper-collection-dataset/scene')
      break
    default:
      throw new Error('Narrator not found')
  }

  return mod.default
}
