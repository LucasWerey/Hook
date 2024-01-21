export const addChip = (arrayRef: Ref<string[]>, value: string) => {
  if (!arrayRef.value.includes(value)) arrayRef.value.push(value)
}

export const deleteChip = (arrayRef: Ref<string[]>, label: string) => {
  const index = arrayRef.value.indexOf(label)
  if (index !== -1) {
    arrayRef.value.splice(index, 1)
  }
}
