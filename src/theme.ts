import type { PrismTheme } from 'prism-react-renderer'

export const chartColors = {
  default: '#3d4b44',
  dim: '#27322d',
  sorted: '#2fbf71',
  compare: '#ffb224',
  write: '#ff5d5d',
  pivot: '#4dd2ff',
  key: '#f3f6f4',
  grid: 'rgba(143,171,158,0.07)',
  axis: 'rgba(143,171,158,0.22)',
  label: 'rgba(200,214,206,0.55)',
}

export const codeTheme: PrismTheme = {
  plain: { color: '#c9d4ce', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'cdata'], style: { color: '#5c6b64', fontStyle: 'italic' } },
    { types: ['keyword', 'selector', 'atrule'], style: { color: '#ffb224' } },
    { types: ['string', 'char', 'attr-value', 'inserted'], style: { color: '#7fd98a' } },
    { types: ['function', 'def'], style: { color: '#4dd2ff' } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: '#ff8f66' } },
    { types: ['class-name', 'builtin'], style: { color: '#c792ea' } },
    { types: ['operator', 'punctuation'], style: { color: '#93a19a' } },
    { types: ['tag', 'namespace', 'important'], style: { color: '#ffb224' } },
    { types: ['variable', 'parameter'], style: { color: '#e8efea' } },
    { types: ['property', 'attr-name'], style: { color: '#4dd2ff' } },
    { types: ['deleted'], style: { color: '#ff5d5d' } },
  ],
}
