export const convertToHtml = (arg: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(arg, 'text/html')
  const html = doc.documentElement.innerHTML
  return html
}
