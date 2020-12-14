export default function useDOMCreate(nodeId: string) {
  if (document.querySelector(`#${nodeId}`)) return
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)
}
